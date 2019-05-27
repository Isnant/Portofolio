<template>
  <q-page padding>
    <fieldset style="width: 100%">
      <legend>Search</legend>

      <div class="row">

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.equipmentCategory"
          stack-label="Equipment Category"
          :options="equipmentCategoryList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.productType"
          stack-label="Product Type"
          :options="productTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.subType"
          stack-label="Product Sub Type"
          :options="subTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-input
          v-model="searchVal.productSeries"
          stack-label="Product Series"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.hubCode"
          stack-label="Hub Code"
          :options="hubCodeList"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.bdfCode"
          stack-label="BDF Code"
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
      :data="dataList"
      :columns="columns"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      :filter="filter"
      row-key="id"
      dense>

      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template slot="top-left" slot-scope="scope">
        <q-search
          hide-underline
          v-model="filter"
        />
      </template>

      <q-td slot="body-cell-action" slot-scope="cell">
        <q-btn color="primary" round size="sm" @click="openMigrationForm(cell)"
            v-show="cell.row.productTypeSubType == 'FIBERNODE'">
          <q-icon name="fas fa-exchange-alt" />
          <q-tooltip>Migrate</q-tooltip>
        </q-btn>
      </q-td>

    </q-table>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="secondary" @click.native="modalUpload=true">
        <q-icon name="backup" />
        <q-tooltip>Upload</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-modal v-model="modalUpload">
      <div style="padding: 20px">
        <strong>Upload Equipment File</strong>
        <div class="column" style="padding-top: 30px">
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
          <q-field style="padding-bottom: 20px">
            <q-uploader ref="uploader" url="" :upload-factory="uploadFile" />
          </q-field>
        </div>
      </div>
    </q-modal>

    <q-modal v-model="showMigrationForm" maximized no-esc-dismiss
      :content-css="{padding: '20px', minWidth: '50vw'}">

      <q-page>

        <q-stepper flat ref="stepper" v-model="migrationStep" color="primary"
            style="max-width: 90%" @step="doCheckStep()">
          <q-step default name="setupDestination" title="Setup Destination">
            <div class="row">

              <div style="margin-right: 20px">
                <q-input readonly v-model="equipmentToMigrate.hubCode"
                  float-label="Source Hub"/>
                <q-input readonly v-model="equipmentToMigrate.nodeCode"
                  float-label="Source Node"/>
              </div>

              <div>
                <q-select
                  v-model="equipmentToMigrate.newHubCode"
                  @input="doChageMigrationHub()"
                  float-label="Destination Hub"
                  :options="hubCodeList"
                />
                <div class="row">
                  <q-select
                    v-model="selectedNewNode"
                    @input="doChangeMigrationNode()"
                    float-label="Destination Node"
                    :options="filteredNodeList"
                  />
                  <q-input
                    style="margin-left: 20px"
                    @input="doValidateNewNode()"
                    v-model="equipmentToMigrate.newNode" float-label="New Node"
                    v-show="selectedNewNode == 'N'"
                  />
                  <q-toggle
                    style="margin-left: 20px"
                    v-model="moveNode"
                    @input="doChangeMoveNode()"
                    label="Move Node"
                  />
                </div>
              </div>

            </div>
          </q-step>

          <q-step name="setupNewHierarchy" title="Setup New Hierarchy">
            <q-tabs class="shadow-1" inverted align="justify">
              <q-tab slot="title" name="original" label="Original" />
              <q-tab slot="title" name="newConfig" label="New Configuration" default />

              <q-tab-pane name="original">
                <q-table
                  :data="migrationListOriginal"
                  :columns="migrationOriginalColumns"
                  :pagination.sync="migrationOriginalPagination"
                  row-key="id">
                </q-table>
              </q-tab-pane>

              <q-tab-pane name="newConfig">
                <q-table
                  :data="migrationListNew"
                  :columns="migrationNewColumns"
                  :pagination.sync="migrationNewPagination"
                  row-key="id">

                  <q-td slot="body-cell-equipmentName" slot-scope="cell"
                      :style="{ background: getMigrationRowColor(cell.row) }">
                    {{ cell.row.equipmentName }}
                  </q-td>
                  <q-td slot="body-cell-newEquipmentName" slot-scope="cell"
                      :style="{ background: getMigrationRowColor(cell.row) }">
                    <strong>{{ cell.row.newEquipmentName }}</strong>
                    <q-popup-edit v-model="cell.row.newEquipmentName"
                        title="Update New Code" :disable="isMigrationEditDisabled(cell.row)">
                      <q-input v-model="cell.row.newEquipmentName" />
                    </q-popup-edit>
                  </q-td>
                  <q-td slot="body-cell-productTypeSubType" slot-scope="cell"
                      :style="{ background: getMigrationRowColor(cell.row) }">
                    {{ cell.row.productTypeSubType }}
                  </q-td>
                  <q-td slot="body-cell-predecessor" slot-scope="cell"
                      :style="{ background: getMigrationRowColor(cell.row) }">
                    {{ cell.row.predecessor }}
                  </q-td>
                  <q-td slot="body-cell-psCode" slot-scope="cell"
                      :style="{ background: getMigrationRowColor(cell.row) }">
                    {{ cell.row.psCode }}
                  </q-td>
                  <q-td slot="body-cell-action" slot-scope="cell"
                      :style="{ background: getMigrationRowColor(cell.row) }">
                    {{ cell.row.productTypeSubType }}
                  </q-td>

                </q-table>
              </q-tab-pane>
            </q-tabs>
          </q-step>

          <q-step name="validation" title="Validation">
            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
          </q-step>

          <q-stepper-navigation>
            <q-btn
              v-if="migrationStep !== 'setupDestination'"
              color="primary"
              flat
              @click="$refs.stepper.previous()"
            >
              Back
            </q-btn>

            <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">
              {{ migrationStep === 'validation' ? 'Finalize' : 'Next' }}
            </q-btn>
          </q-stepper-navigation>

          <q-inner-loading />

        </q-stepper>
      </q-page>

      <q-page-sticky position="top-right" :offset="[50, 0]">
        <q-btn color="primary" round @click="showMigrationForm = false">
          <q-icon name="fas fa-times-circle"/>
          <q-tooltip>Cancel</q-tooltip>
        </q-btn>
      </q-page-sticky>

    </q-modal>


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
