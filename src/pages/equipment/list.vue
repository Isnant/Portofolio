<template>
  <q-page padding>
    <h4>Field Equipment</h4>
    <fieldset style="width: 100%">
      <legend>Search</legend>

      <div class="row">

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.equipmentCategory"
          label="Equipment Category"
          :options="equipmentCategoryList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.productType"
          label="Product Type"
          :options="productTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.subType"
          label="Product Sub Type"
          :options="subTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-input
          v-model="searchVal.productSeries"
          label="Product Series"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.hubCode"
          label="Hub Code"
          :options="hubCodeList"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.bdfCode"
          label="BDF Code"
          :options="bdfCodeList"
          />
        </div>

        <div class="col-1">
          <q-btn round color="primary" @click="getContentByFilter(searchVal)">
            <q-icon name="search"/>
            <q-tooltip>Search</q-tooltip>
          </q-btn>
        </div>

      </div>
    </fieldset>

    <q-table
      :data="listOfEquipment"
      :columns="equipmentListColumns"
      :pagination.sync="equipmentPagination"
      :rows-per-page-options="[10, 20, 50]"
      @request="doListOfEquipmentRefresh"
      row-key="id"
      dense>

      <q-td slot="body-cell-action" slot-scope="cell">
        <q-btn color="primary" round size="sm" @click="openMigrationForm(cell)"
            v-show="cell.row.productTypeSubType == 'FIBERNODE' && parseInt(cell.row.equipmentName.substring(3), 10) > 10">
          <q-icon name="fas fa-exchange-alt" />
          <q-tooltip>Migrate</q-tooltip>
        </q-btn>
      </q-td>

    </q-table>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="primary" @click.native="modalUpload=true">
        <q-icon name="backup" />
        <q-tooltip>Upload</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="modalUpload" persistent>
      <q-card class="bg-white">
        <q-bar class="bg-primary text-white">
          <strong>Upload Equipment File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <q-field style="padding: 0px 0px 20px 0px">
            <q-option-group
                type="radio"
                v-model="uploadCategory"
                :options="[
                  { label: 'Field Equipment', value: 'field' },
                  { label: 'Hub Equipment', value: 'hub' },
                ]"
            />
          </q-field>
          <q-field style="padding-bottom: 20px;">
            <q-uploader ref="uploader" :factory="doUploadFile" />
          </q-field>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showMigrationForm" :maximized="true" persistent>

      <q-card class="bg-white">
        <q-bar class="bg-primary text-white">
          <strong>Migration</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <q-stepper ref="stepper" v-model="migrationStep" color="primary"
              style="max-width: 90%" animated @before-transition="doCheckStep()">
            <q-step :name="1"
                title="Setup Destination"
                :error="fullNodeListByHub.length < 1">
              <div class="row">

                <div style="margin-right: 20px">
                  <q-input readonly v-model="equipmentToMigrate.hubCode"
                    label="Source Hub"/>
                  <q-input readonly v-model="equipmentToMigrate.nodeCode"
                    label="Source Node"/>
                </div>

                <div>
                  <q-select
                    v-model="equipmentToMigrate.newHubCode"
                    @input="doChageMigrationHub()"
                    label="Destination Hub"
                    :options="hubCodeList"
                    v-show="moveNode !== 'C'"
                  />
                  <div class="row">
                    <q-select
                      style="margin-right: 20px"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="500"
                      v-model="selectedNewNode"
                      @input="doChangeTargetNode"
                      @filter="doFilterMigrationNode"
                      label="Destination Node"
                      :options="destinationNodeOptions"
                      v-show="moveNode !== 'N' && moveNode !== 'C'"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <q-input :prefix="nodePrefixByHub" mask="###"
                      fill-mask="#" suffix="00"
                      debounce="500"
                      style="margin-right: 20px"
                      @input="doValidateNewNode()"
                      @keydown.enter="$refs.stepper.next()"
                      v-model="equipmentToMigrate.newNodeNumber" float-label="New Node"
                      v-show="selectedNewNode === 'New Node'"
                    />
                    <q-option-group
                        style="margin: 10px 0px 0px 0px"
                        v-model="moveNode"
                        :options="moveNodeOptions"
                        inline />
                  </div>
                </div>

              </div>
            </q-step>

            <q-step :name="2" title="Setup New Hierarchy">
              <q-tabs class="shadow-1" v-model="migrationTab"
                  dense
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator>
                <q-tab name="original" label="Original" />
                <q-tab name="newConfig" label="New Configuration" default />
              </q-tabs>

              <q-tab-panels v-model="migrationTab" animated>
                <q-tab-panel name="original">
                  <q-table
                    :data="migrationListOriginal"
                    :columns="migrationOriginalColumns"
                    :pagination.sync="migrationOriginalPagination"
                    dense
                    row-key="id">
                  </q-table>
                </q-tab-panel>

                <q-tab-panel name="newConfig">
                  <q-bar class="bg-white">
                    <strong v-show="this.moveNode === 'X'">Target Node:
                      <font style="color: green">{{ equipmentToMigrate.newNodeCode }}</font>
                    </strong>
                    <strong v-show="this.moveNode === 'N'">Target Hub:
                      <font style="color: red">
                        {{ equipmentToMigrate.newHubCode }}
                      </font>
                    </strong>
                    <q-space />
                    <q-btn round color="primary" @click="doAddPowerSupply()" size="sm"
                      v-show="checkAddPowerSupplyVisibility()"
                      style="margin-right: 10px">
                      <q-icon name="fas fa-car-battery"/>
                      <q-tooltip>Add Power Supply</q-tooltip>
                    </q-btn>
                    <q-btn round color="primary" @click="doAddAmplifier()" size="sm"
                      v-show="checkAddAmplifierVisibility()"
                      style="margin-right: 10px">
                      <q-icon name="fab fa-creative-commons-sampling"/>
                      <q-tooltip>Add Amplifier</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <br/>
                  <q-table
                    :data="migrationListNew"
                    :columns="migrationNewColumns"
                    :pagination.sync="migrationNewPagination"
                    dense
                    row-key="id">

                    <q-td slot="body-cell-newName" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.newName }}
                      <q-popup-edit v-model="cell.row.newName" :disable="cell.row.productTypeSubType === 'FIBERNODE'">
                        <q-input v-model="cell.row.newNumber" dense :prefix="getEquipmentPrefix(cell.row)"
                          :mask="((cell.row.equipmentName !== undefined && cell.row.productTypeSubType === 'PS') ? 'A' : 'XXXX')"
                          fill-mask="#" unmasked-value
                          @change="doChangeName(cell.row)"/>
                      </q-popup-edit>
                    </q-td>
                    <q-td slot="body-cell-productTypeSubType" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.productTypeSubType }}
                    </q-td>
                    <q-td slot="body-cell-predecessor" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.predecessor }}
                      <q-popup-edit v-model="cell.row.predecessor" :disable="cell.row.productTypeSubType !== 'PS'">
                        <q-input v-model="cell.row.newPredecessorNumber" dense :prefix="getEquipmentPrefix(cell.row)"
                          mask="XXXX"
                          fill-mask="#"
                          @change="doChangePredecessor(cell.row)"/>
                      </q-popup-edit>
                    </q-td>
                    <q-td slot="body-cell-psCode" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.psCode }}
                    </q-td>

                    <q-td slot="body-cell-action" slot-scope="cell">
                      <q-btn round color="primary" @click="doStayOrMoveElement(cell.row)" size="sm" v-show="checkStayOrMoveVisibility(cell.row)"
                        style="margin-right: 10px">
                        <q-icon :name="cell.row.migrate ? 'fas fa-angle-double-down' : 'fas fa-angle-double-right'"/>
                        <q-tooltip>{{ cell.row.migrate ? 'Stay' : 'Move' }}</q-tooltip>
                      </q-btn>
                      <q-btn round color="primary" @click="doPromoteToFibernode(cell.row)" size="sm" v-show="checkPromoteVisibility(cell.row)">
                        <q-icon name="fas fa-medal"/>
                        <q-tooltip>Promote To Fibernode</q-tooltip>
                      </q-btn>
                    </q-td>

                  </q-table>
                </q-tab-panel>
              </q-tab-panels>

            </q-step>

            <q-step :name="3" title="Validation">
              <p>An ad group contains one or more ads which target a shared set of keywords.</p>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn @click="$refs.stepper.next()" color="primary" :label="migrationStep === 3 ? 'Finalize' : 'Continue'" />
                <q-btn v-if="migrationStep > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </template>

          </q-stepper>
        </q-card-section>
      </q-card>

    </q-dialog>

  </q-page>
</template>

<style>

fieldset {
  max-width: 98%;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  margin: 0px 0px 10px 0px;
  border: 1px solid #CCCCCC;
  padding: 20px;
  display: inline-block;
}

fieldset legend{
  border-top: 1px solid #CCCCCC;
  border-left: 1px solid #CCCCCC;
  border-right: 1px solid #CCCCCC;
  border-radius: 5px 5px 0px 0px;
  -webkit-border-radius: 5px 5px 0px 0px;
  -moz-border-radius: 5px 5px 0px 0px;
  padding: 0px 8px 3px 8px;
  box-shadow: -0px -1px 2px #F1F1F1;
  -moz-box-shadow:-0px -1px 2px #F1F1F1;
  -webkit-box-shadow:-0px -1px 2px #F1F1F1;
  font-weight: bold;
  font-size: 14px;
}
</style>

<script src="./js/list.js"></script>
