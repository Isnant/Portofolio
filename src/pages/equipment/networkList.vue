<template>
  <q-page padding>
     <div align="left" style="margin-bottom:30px; width:260px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">NETWORK EQUIPMENT</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Network Equipment</h4> -->
    <!-- <GChart
        :settings="{ packages: ['orgchart'] }"
        type="OrgChart"
        :data="chartDataX"
        :options="chartOptionsX"
    /> -->
    <fieldset class="fieldset_search" style="width: 100%; margin-bottom:20px">
      <legend class="legedn_search">Search</legend>

      <div class="row" style="width: 100%">

        <div class="col-20" style="margin-right: 10px; width: 25%">
          <q-select
          v-model="searchVal.productType"
          label="Product Type"
          color="purple-6"
          :options="productTypeList"/>
        </div>

        <div class="col-20" style="margin-right: 10px; width: 15%">
          <q-input
            v-model="searchVal.productSeries"
            label="Product Series"
            color="purple-6"
            stack-label
          />
        </div>

        <div class="col-20" style="margin-right: 10px;width: 20%">
          <q-select
            v-model="searchVal.hubCode"
            label="Hub Code"
            color="purple-6"
            :options="hubCodeList"
          />
        </div>

        <div class="col-20" style="margin-right: 10px;width: 20%">
          <q-select
            v-model="searchVal.bdfCode"
            label="BDF Code"
            color="purple-6"
            :options="bdfCodeList"
          />
        </div>

        <div class="col-20" style="margin-right: 10px; width: 10%">
          <q-input
            v-model="searchVal.nodeCode"
            label="Node Code"
            color="purple-6"
            stack-label
          />
        </div>

        <div class="col" style="width: 5%">
          <q-btn round color="purple-10" @click="doMainEquipmentRefreshList()">
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
      @request="doMainEquipmentChangePage"
      row-key="id"
      dense>

      <q-td slot="body-cell-action" slot-scope="cell">
        <q-btn color="indigo-6" round size="sm" @click="doEdit(cell)">
          <q-icon name="fas fa-edit" />
          <q-tooltip>Edit</q-tooltip>
        </q-btn>
      </q-td>

    </q-table>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <!-- <q-btn round color="primary" @click.native="modalUpload=true">
        <q-icon name="backup" />
        <q-tooltip>Upload</q-tooltip>
      </q-btn> -->
      <q-fab color="orange-4" glossy icon="keyboard_arrow_down" direction="down">
        <q-fab-action color="orange-3" text-color="white" @click.native="modalAddNewAsset=true" icon="add"><q-tooltip>Add</q-tooltip></q-fab-action>
        <q-fab-action color="orange-3" text-color="white" @click.native="modalUpload=true" icon="backup"><q-tooltip>Upload</q-tooltip></q-fab-action>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="modalAddNewAsset" maximized persistent @before-hide="doRefresh()">
      <q-card class="bg-white">
        <q-bar class="bg-blue-7 text-white">
        <strong>Network Equipment Form</strong>
        <q-space/>
        <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>
        <div style="margin:20px">
          <div class="row">
            <div class="col" style="margin-right:10px">
              <q-input v-model="input.equipmentCategory"
                :stack-label="true"
                label="Equipment Category"
                disable
                tabindex="1"/>
              <q-input v-model="input.equipmentName" ref="nEquipmentName"
                :rules="[val => !! val || 'Equipment Name is required']"
                :stack-label="true"
                label="Equipment Name*"
                tabindex="2"
                style="margin-top:20px"/>
              <q-input v-model="input.description" ref="nDescription"
                :rules="[val => !! val || 'Description Type is required']"
                :stack-label="true"
                label="Description*"
                tabindex="3"/>
              <q-select v-model="input.productType" ref="nProductType"
                :rules="[val => !! val || 'Product Type is required']"
                :options="productTypeList"
                @input="getSubType"
                :stack-label="true"
                label="Product Type*"
                tabindex="4"/>
              <q-select v-model="input.productSubType" ref="nProductSubType"
                :rules="[val => !! val || 'Product Sub Type is required']"
                :stack-label="true"
                :options="subTypeList"
                label="Product Sub Type*"
                tabindex="5"/>
              <q-input v-model="input.productSeries" ref="nProductSeries"
                :rules="[val => !! val || 'Product Series is required']"
                :stack-label="true"
                label="Product Series*"
                tabindex="6"/>
              <q-select v-model="input.manufacturer" ref="nManufacturer"
                :rules="[val => !! val || 'Manufacturer is required']"
                :stack-label="true"
                label="Manufacturer*"
                :options="manufacturerList"
                @input="getBrand()"
                tabindex="7"/>
              <q-select v-model="input.brand" ref="nBrand"
                :rules="[val => !! val || 'Brand is required']"
                :stack-label="true"
                :options="brandList"
                label="Brand*"
                tabindex="8"/>
              <q-input v-model="input.serialNumberDevice"
                :stack-label="true"
                label="Serial Number Device"
                tabindex="9"/>
              <q-input v-model="input.serialNumberInternal"
                :stack-label="true"
                label="Serial Number Internal"
                tabindex="10"
                style="margin-top:20px"/>
              <q-input v-model="input.quantity" ref="nQuantity"
                :rules="[val => !! val || 'Quantity is required']"
                :stack-label="true"
                label="Quantity*"
                type="number"
                tabindex="11"
                style="margin-top:20px"/>
              <q-input v-model="input.rack"
                :stack-label="true"
                label="Rack"
                tabindex="12"/>
              <q-input v-model="input.chassis"
                :stack-label="true"
                label="Chassis"
                tabindex="13"
                style="margin-top:20px"/>
              <q-input v-model="input.slot"
                :stack-label="true"
                label="Slot"
                tabindex="14"
                style="margin-top:20px"/>
              <q-input v-model="input.hubCode"
                :stack-label="true"
                label="Hub Code"
                @input="hubChange"
                tabindex="15"
                style="margin-top:20px"/>
              <div v-show="hubTrue">
                <q-input v-model="input.hubAddress" ref="nHubAddress"
                  :rules="[val => !! val || 'Hub Address is required']"
                  :stack-label="true"
                  label="Hub Address*"
                  tabindex="16"
                  style="margin-top:20px"/>
                <q-input v-model="input.bdfCode"
                  disable
                  :stack-label="true"
                  label="BDF Code"
                  tabindex="17"/>
                <q-input v-model="input.service"
                  :stack-label="true"
                  label="Service"
                  tabindex="21"
                  style="margin-top:20px"/>
              </div>
              <div v-show="hubFalse">
                <q-input v-model="input.hubAddress"
                  :stack-label="true"
                  disable
                  label="Hub Address"
                  tabindex="16"
                  style="margin-top:20px"/>
                <q-input v-model="input.bdfCode" ref="nBdfCode"
                  :rules="[val => !! val || 'BDF Code is required']"
                  :stack-label="true"
                  label="BDF Code*"
                  tabindex="17"
                  style="margin-top:20px"/>
                <q-input v-model="input.service"
                  :stack-label="true"
                  label="Service"
                  tabindex="21"/>
              </div>
              <!-- <q-input v-model="input.nodeCode"
                :stack-label="true"
                label="Node Code"
                tabindex="18"/>
              <q-input v-model="input.psCode"
                :stack-label="true"
                label="Power Supply Code"
                tabindex="19"
                style="margin-top:20px"/>
              <q-input v-model="input.amplifierCode"
                :stack-label="true"
                label="Amplifier Code"
                tabindex="20"
                style="margin-top:20px"/> -->

              <q-input v-model="input.technology"
                :stack-label="true"
                label="Technology"
                tabindex="22"
                style="margin-top:20px"/>
              <q-input v-model="input.ipAddress"
                :stack-label="true"
                label="IP Address"
                tabindex="23"
                style="margin-top:20px"/>
              <q-input v-model="input.macAddress"
                :stack-label="true"
                label="MAC Address"
                tabindex="24"
                style="margin-top:20px"/>
              <q-input v-model="input.capacity"
                :stack-label="true"
                label="Capacity"
                tabindex="25"
                style="margin-top:20px"/>
              <q-input v-model="input.capacityUnits"
                :stack-label="true"
                label="Capacity Units"
                tabindex="26"
                style="margin-top:20px"/>
              <q-input v-model="input.usedCapacity"
                :stack-label="true"
                label="Used Capacity"
                tabindex="27"
                style="margin-top:20px"/>
              <q-input v-model="input.capacity1"
                :stack-label="true"
                label="Capacity 1"
                tabindex="28"
                style="margin-top:20px"/>
              <q-input v-model="input.capacity2"
                :stack-label="true"
                label="Capacity 2"
                tabindex="29"
                style="margin-top:20px"/>
              <q-input v-model="input.capacity3"
                :stack-label="true"
                label="Capacity 3"
                tabindex="30"
                style="margin-top:20px"/>
            </div>
            <div class="col">
              <q-input v-model="input.noOfPortFront"
                :stack-label="true"
                label="No Of Port Front"
                tabindex="31"/>
              <q-input v-model="input.noOfPortRear"
                :stack-label="true"
                label="No Of Port Rear"
                tabindex="32"
                style="margin-top:20px"/>
              <q-input v-model="input.productionYear"
                :stack-label="true"
                label="Production Year"
                tabindex="33"
                style="margin-top:20px"/>
              <q-input v-model="input.assetLifetime"
                :stack-label="true"
                label="Asset Lifetime"
                tabindex="34"
                style="margin-top:20px"/>
              <q-input v-model="input.purchasedDate"
                :stack-label="true"
                label="Purchased Date"
                tabindex="35"
                style="margin-top:20px">
                <template v-slot:after>
                  <q-icon name="event">
                    <q-popup-proxy ref="qPurchasedDate" transition-show="scale" transition-hide="scale">
                      <q-date v-model="input.purchasedDate" mask="DD/MM/YYYY" @input="() => $refs.qPurchasedDate.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input v-model="input.installationDate"
                :stack-label="true"
                label="Installation Date"
                tabindex="36"
                style="margin-top:20px">
                <template v-slot:after>
                  <q-icon name="event">
                    <q-popup-proxy ref="qInstallationDate" transition-show="scale" transition-hide="scale">
                      <q-date v-model="input.installationDate" mask="DD/MM/YYYY" @input="() => $refs.qInstallationDate.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input v-model="input.installedBy"
                :stack-label="true"
                label="Installed By"
                tabindex="37"
                style="margin-top:20px"/>
              <q-input v-model="input.pic"
                :stack-label="true"
                label="PIC"
                tabindex="38"
                style="margin-top:20px"/>
              <q-input v-model="input.division" ref="nDivision"
                :rules="[val => !! val || 'Division is required']"
                :stack-label="true"
                label="Division*"
                tabindex="39"
                style="margin-top:20px"/>
              <q-input v-model="input.department" ref="nDepartment"
                :rules="[val => !! val || 'Department is required']"
                :stack-label="true"
                label="Department*"
                tabindex="40"/>
              <q-input v-model="input.propertyOf" ref="nPropertyOf"
                :rules="[val => !! val || 'Property Of is required']"
                :stack-label="true"
                label="Property Of*"
                tabindex="41"/>
              <q-input v-model="input.equipmentStatus" ref="nEquipmentStatus"
                :rules="[val => !! val || 'Status Reason is required']"
                :stack-label="true"
                label="Status Reason*"
                tabindex="42"/>
              <q-input v-model="input.predecessor"
                :stack-label="true"
                label="Predecessor"
                tabindex="43"/>
              <q-input v-model="input.itCode" ref="nItCode"
                :rules="[val => !! val || 'IT Code is required']"
                :stack-label="true"
                label="IT Code*"
                tabindex="44"
                style="margin-top:20px"/>
              <q-input v-model="input.buildingName"
                :stack-label="true"
                label="Building Name"
                tabindex="45"/>
              <q-input v-model="input.tower"
                :stack-label="true"
                label="Tower"
                tabindex="46"
                style="margin-top:20px"/>
              <q-input v-model="input.floor"
                :stack-label="true"
                label="Floor"
                tabindex="47"
                style="margin-top:20px"/>
              <q-input v-model="input.complexName"
                :stack-label="true"
                label="Complex Name"
                tabindex="48"
                style="margin-top:20px"/>
              <q-input v-model="input.streetName"
                :stack-label="true"
                label="Street Name"
                tabindex="49"
                style="margin-top:20px"/>
              <q-input v-model="input.streetNumber"
                :stack-label="true"
                label="Street Number"
                tabindex="50"
                style="margin-top:20px"/>
              <q-input v-model="input.kelurahan"
                :stack-label="true"
                label="District"
                tabindex="51"
                style="margin-top:20px"/>
              <q-input v-model="input.postalCode"
                :stack-label="true"
                label="Postal Code"
                tabindex="52"
                style="margin-top:20px"/>
              <q-input v-model="input.direction"
                :stack-label="true"
                label="Direction"
                tabindex="53"
                style="margin-top:20px"/>
              <q-input v-model="input.normalDistance"
                :stack-label="true"
                label="Normal Distance"
                tabindex="54"
                style="margin-top:20px"/>
              <q-input v-model="input.updateDistanceDate"
                :stack-label="true"
                label="Update Distance Date"
                tabindex="55"
                style="margin-top:20px">
                <template v-slot:after>
                  <q-icon name="event">
                    <q-popup-proxy ref="qUpdateDistanceDate" transition-show="scale" transition-hide="scale">
                      <q-date v-model="input.updateDistanceDate" mask="DD/MM/YYYY" @input="() => $refs.qUpdateDistanceDate.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input v-model="input.remarks"
                :stack-label="true"
                label="Remarks"
                tabindex="56"
                style="margin-top:20px"/>
            </div>
          </div>
          <div align="right">
            <q-btn @click.native="saveEquipment" color="warning" icon="save"/>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalUpload" persistent>
      <q-card class="bg-white">
        <q-bar class="bg-primary text-white">
          <strong>Upload Equipment File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <a href="/statics/template/FieldTemplate.xlsx">Download Template</a>
        </q-card-section>
        <q-card-section>
          <q-field style="padding-bottom: 20px;">
            <input
              id="excelFile"
              type="file"
              ref="fieldExcelFile"
            />
            <q-btn round color="primary" @click="doUploadFile()">
              <q-icon name="fas fa-file-upload"/>
            </q-btn>
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
              style="max-width: 90%" animated @before-transition="doMigrationCheckStep()">
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
                    @input="doMigrationChangeHub()"
                    label="Destination Hub"
                    :options="hubCodeList"
                    v-show="equipmentToMigrate.selectedMoveNodeOption !== 'C'"
                  />
                  <div class="row">
                    <q-select
                      style="margin-right: 20px"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="500"
                      v-model="equipmentToMigrate.selectedNewNode"
                      @filter="doMigrationFilterNode"
                      label="Destination Node"
                      :options="destinationNodeOptions"
                      v-show="equipmentToMigrate.selectedMoveNodeOption === 'X' &&
                        !equipmentToMigrate.isNewNode"
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
                      @input="doMigrationValidateNewNode()"
                      @keydown.enter="$refs.stepper.next()"
                      v-model="equipmentToMigrate.newNodeNumber" float-label="New Node"
                      v-show="equipmentToMigrate.isNewNode && equipmentToMigrate.selectedMoveNodeOption !== 'C'"
                    />
                    <q-input mask="AAA###"
                      fill-mask="#" suffix="00"
                      debounce="500"
                      style="margin-right: 20px"
                      @input="doMigrationValidateNewNode()"
                      @keydown.enter="$refs.stepper.next()"
                      v-model="equipmentToMigrate.newServiceNodeNumber" float-label="New Node"
                      v-show="equipmentToMigrate.selectedMoveNodeOption === 'C'"
                    />
                    <q-checkbox @input="doMigrationChangeNewNode()"
                      v-show="equipmentToMigrate.selectedMoveNodeOption !== 'C'"
                      v-model="equipmentToMigrate.isNewNode"
                      label="New Node" />
                  </div>
                </div>
              </div>
              <div class="row">
                <q-option-group
                    style="margin: 10px 0px 0px 0px"
                    v-model="equipmentToMigrate.selectedMoveNodeOption"
                    @input="doMigrationChangeMoveNodeOption()"
                    :options="moveNodeOptions"
                    inline />
              </div>
            </q-step>

            <q-step :name="2" title="Setup New Hierarchy" :disable="isHierarchyDisabled">
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
                    <strong>Target Node:
                      <font style="color: green">
                        {{ equipmentToMigrate.newNodeCode }}
                      </font>
                    </strong>
                    <q-space />
                    <q-btn round color="primary" @click="doMigrationAddPowerSupply()" size="sm"
                      v-show="isMigrationAddPowerSupplyVisible()"
                      style="margin-right: 10px">
                      <q-icon name="fas fa-car-battery"/>
                      <q-tooltip>Add Power Supply</q-tooltip>
                    </q-btn>
                    <q-btn round color="primary" @click="doMigrationAddAmplifier()" size="sm"
                      v-show="isMigrationAddAmplifierVisible()"
                      style="margin-right: 10px">
                      <q-icon name="fab fa-creative-commons-sampling"/>
                      <q-tooltip>Add Amplifier</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <br/>
                  <q-table
                    :data="equipmentToMigrate.migrationListNew"
                    :columns="migrationNewColumns"
                    :pagination.sync="migrationNewPagination"
                    dense
                    row-key="id">

                    <q-td slot="body-cell-newName" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.newName }}
                      <q-popup-edit v-model="cell.row.newName" :disable="cell.row.productType === 'FIBERNODE'">
                        <q-input v-model="cell.row.newNumber" dense :prefix="getMigrationEquipmentPrefix(cell.row)"
                          :mask="((cell.row.equipmentName !== undefined && cell.row.productType === 'PS') ? 'A' : 'XXXX')"
                          fill-mask="#" unmasked-value
                          @change="doMigrationChangeEquipmentName(cell.row)"/>
                      </q-popup-edit>
                    </q-td>
                    <q-td slot="body-cell-productType" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.productType }}
                    </q-td>
                    <q-td slot="body-cell-predecessor" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.predecessor }}
                      <q-popup-edit v-model="cell.row.predecessor" :disable="cell.row.productType !== 'PS'">
                        <q-input v-model="cell.row.newPredecessorNumber" dense :prefix="getMigrationEquipmentPrefix(cell.row)"
                          mask="XXXX"
                          fill-mask="#"
                          @change="doMigrationChangePredecessor(cell.row)"/>
                      </q-popup-edit>
                    </q-td>
                    <q-td slot="body-cell-psCode" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                      {{ cell.row.psCode }}
                      <q-popup-edit v-model="cell.row.psCode" :disable="cell.row.productType === 'PS'">
                        <q-input v-model="cell.row.psCode" dense
                          mask="AAA###A"/>
                      </q-popup-edit>
                    </q-td>

                    <q-td slot="body-cell-action" slot-scope="cell">
                      <q-btn round color="primary" @click="doMigrationStayOrMove(cell.row)" size="sm" v-show="isMigrationStayOrMoveVisible(cell.row)"
                        style="margin-right: 10px">
                        <q-icon :name="cell.row.migrate ? 'fas fa-angle-double-down' : 'fas fa-angle-double-right'"/>
                        <q-tooltip>{{ cell.row.migrate ? 'Stay' : 'Move' }}</q-tooltip>
                      </q-btn>
                      <q-btn round color="primary" @click="doMigrationPromoteToFibernode(cell.row)" size="sm" v-show="isMigrationPromoteVisible(cell.row)">
                        <q-icon name="fas fa-medal"/>
                        <q-tooltip>Promote To Fibernode</q-tooltip>
                      </q-btn>
                    </q-td>

                  </q-table>
                </q-tab-panel>
              </q-tab-panels>

            </q-step>

            <q-step :name="3" title="Validation">
              <div v-show="validationResults.length > 0">
                <q-chip
                  color="red"
                  text-color="white"
                  v-for="validationResult in validationResults"
                  :key="validationResult.id">
                  {{ validationResult.message }}
                </q-chip>
              </div>
              <div v-show="validationResults.length === 0" class="q-pa-md row items-start q-gutter-md">
                <q-card class="preview-tree-card" v-show="equipmentToMigrate.selectedMoveNodeOption !== 'N'">
                  <q-card-section>
                    <q-tree
                      :nodes="sourcePreview"
                      node-key="label"
                      ref="sourcePreview"
                      default-expand-all
                    >
                      <template v-slot:default-header="prop">
                        <span class="row items-center">
                          <span class="text-weight-bold text-red">{{ prop.node.label }}</span>
                          <span
                            class="text-weight-bold text-black"
                            v-if="prop.node.label !== prop.node.original && prop.node.original !== undefined">
                              &nbsp;&nbsp;[{{ prop.node.original }}]
                          </span>
                        </span>
                      </template>
                    </q-tree>
                  </q-card-section>
                </q-card>
                <q-card class="preview-tree-card" v-show="equipmentToMigrate.selectedMoveNodeOption !== 'C'">
                  <q-card-section>
                    <q-tree
                      :nodes="targetPreview"
                      node-key="label"
                      ref="targetPreview"
                      default-expand-all
                    >
                      <template v-slot:default-header="prop">
                        <span class="row items-center">
                          <span class="text-weight-bold text-green">{{ prop.node.label }}</span>
                          <span
                            class="text-weight-bold text-black"
                            v-if="prop.node.label !== prop.node.original && prop.node.original !== undefined">
                              &nbsp;&nbsp;[{{ prop.node.original }}]
                          </span>
                        </span>
                      </template>
                    </q-tree>
                  </q-card-section>
                </q-card>
              </div>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  @click="$refs.stepper.next()"
                  color="primary"
                  label="Continue"
                  v-show="migrationStep !== 3"
                 />
                <q-btn
                  @click="doMigrationExecute()"
                  color="primary"
                  label="Finalize"
                  v-show="migrationStep === 3"
                  :disable="validationResults.length > 0"
                 />
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

.preview-tree-card {
  width: 100%;
  max-width: 500px;
}

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

<script src="./js/networkList.js"></script>
