<template>
  <q-page>
    <font size="1" class="text-bold" color="grey" >EQUIPMENT/ NETWORK EQUIPMENT</font>
    <div align="left" style="margin-bottom:30px; width:260px; margin-top:10px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">NETWORK EQUIPMENT</font>
      <div class="row">
        <div class="col-20" style="width: 32%">
          <q-separator color="orange-10" />
          <q-separator color="orange-10" />
        </div>
        <div class="col">
          <q-separator color="purple-10" />
          <q-separator color="purple-10" />
        </div>
      </div>
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Network Equipment</h4> -->
    <!-- <GChart
        :settings="{ packages: ['orgchart'] }"
        type="OrgChart"
        :data="chartDataX"
        :options="chartOptionsX"
    /> -->
    <q-card>
      <q-card-section>
        <q-expansion-item
          label="SEARCH"
          header-class="bg-indigo-2 text-indigo-10"
          style="margin-bottom:10px"
          icon="search">
          <div class="row bg-orange-1" style="padding: 10px; width:100%" align="right">
            <fieldset class="fieldset_search" style="width: 100%; margin:10px">
              <div class="row" style="width: 100%">

                <div class="col-20" style="margin-right: 10px; width: 25%">
                  <q-select
                  v-model="searchVal.productType"
                  label="Product Type"
                  color="indigo-6"
                  :options="productTypeList"/>
                </div>

                <div class="col-20" style="margin-right: 10px; width: 15%">
                  <q-input
                    v-model="searchVal.productSeries"
                    label="Product Series"
                    color="indigo-6"
                    stack-label
                  />
                </div>

                <div class="col-20" style="margin-right: 10px;width: 20%">
                  <q-select
                    v-model="searchVal.hubCode"
                    label="Hub Code"
                    color="indigo-6"
                    :options="hubCodeList"
                  />
                </div>

                <div class="col-20" style="margin-right: 10px;width: 20%">
                  <q-select
                    v-model="searchVal.bdfCode"
                    label="BDF Code"
                    color="indigo-6"
                    :options="bdfCodeList"
                  />
                </div>

                <div class="col-20" style="margin-right: 10px; width: 10%">
                  <q-input
                    v-model="searchVal.nodeCode"
                    label="Node Code"
                    color="indigo-6"
                    stack-label
                  />
                </div>

                <div class="col" style="width: 5%">
                  <q-btn round color="indigo-10" @click="doMainEquipmentRefreshList()">
                    <q-icon name="search"/>
                    <q-tooltip>Search</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </fieldset>
          </div>
        </q-expansion-item>

        <q-table
          :data="listOfEquipment"
          :columns="equipmentListColumns"
          :pagination.sync="equipmentPagination"
          :rows-per-page-options="[10, 20, 50]"
          table-header-class="bg-indigo-2 text-indigo-10"
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
      </q-card-section>
    </q-card>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <!-- <q-btn round color="primary" @click.native="modalUpload=true">
        <q-icon name="backup" />
        <q-tooltip>Upload</q-tooltip>
      </q-btn> -->
      <q-fab color="orange-7" glossy icon="keyboard_arrow_down" direction="down">
        <q-fab-action color="orange-6" text-color="white" @click.native="modalAddNewAsset=true" icon="add"><q-tooltip>Add</q-tooltip></q-fab-action>
        <q-fab-action color="orange-6" text-color="white" @click.native="modalUploadExcel=true" icon="backup"><q-tooltip>Upload Excel</q-tooltip></q-fab-action>
        <q-fab-action color="orange-6" text-color="white" @click.native="modalUploadTxt=true" icon="table_view"><q-tooltip>Import Txt</q-tooltip></q-fab-action>
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

    <q-dialog v-model="modalUploadExcel" persistent @before-hide="doHideButton()">
      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Upload Excel File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <a href="/statics/template/FieldTemplateExcel.xlsx">Download Excel Template</a>
        </q-card-section>
        <q-card-section>
          <!-- <q-field style="padding-bottom: 20px;"> -->
            <q-input
              type="file"
              @input="val => { doAttachFile(val[0]) }"
            />
             <div align="right" style="margin-top:20px">
              <q-btn round color="orange-6" @click="doUploadFile()">
                <q-icon name="fas fa-file-upload"/>
                <q-tooltip>Upload</q-tooltip>
              </q-btn>
             </div>
          <!-- </q-field> -->
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalUploadTxt" persistent @before-hide="doHideButton()">
      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Import Txt File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <!-- <q-field style="padding-bottom: 20px;"> -->
            <q-input
              type="file"
              @input="val => { doAttachFile(val[0]) }"
            />
            <div align="right">
              <q-btn style="margin-top:20px" round color="orange-6" @click="uploadTxtEquipment()">
                <q-icon name="fas fa-file-upload"/>
                <q-tooltip>Upload</q-tooltip>
              </q-btn>
            </div>
          <!-- </q-field> -->
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalUploadPreviewTxt" maximized @before-hide="doHideButton()">
      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Preview Txt Import</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
           <q-table
            :data="dataNotesList"
            :columns="listColumnNotes"
            :pagination.sync="paginationNotes"
            :filter="filter"
            :separator="separator"
            row-key="id"
            dense>
          </q-table>
        </q-card-section>
        <q-card-section>
          <div align="right">
            <q-btn round color="orange-9" text-color="white" @click.native="convertTxtToExcel">
              <q-icon name="get_app"/><q-tooltip>Download to Excel File</q-tooltip>
            </q-btn>
          </div>
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

.fieldset_search {
  border-color:  #1d0f50;
  border-style: solid;
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
