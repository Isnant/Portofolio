<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">EQUIPMENT <q-icon name="double_arrow"></q-icon> INDOOR EQUIPMENT</font>
    <div align="left" style="margin-bottom:30px; width:230px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">INDOOR EQUIPMENT</font>
      <div class="row">
        <div class="col-20" style="width: 32%">
          <q-separator color="orange-10" />
          <q-separator color="orange-10" />
        </div>
        <div class="col">
          <q-separator color="indigo-10" />
          <q-separator color="indigo-10" />
        </div>
      </div>
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Indoor Equipment</h4> -->
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
            <!-- <fieldset class="fieldset_search" style="width: 100%; margin:10px"> -->
            <!-- <legend class="legedn_search">Search</legend> -->

              <div class="row" style="width: 100%">
                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-input
                      rounded outlined
                      v-model="searchVal.id"
                      stack-label
                      label="Equipment Id"
                      class="searchform"
                      color="orange-8"/>
                </div>

                <div class="col-15" style="margin-right: 10px; width: 23%">
                  <q-input
                    v-model="searchVal.equipmentName"
                    label="Equipment Name"
                    stack-label
                    oninput="this.value = this.value.toUpperCase()"
                    rounded outlined
                    class="searchform"
                    color="orange-8"/>
                </div>

                <div class="col-15" style="margin-right: 10px; width: 23%">
                  <q-select
                  v-model="searchVal.productType"
                  label="Product Type"
                  rounded outlined
                  class="searchform"
                  color="orange-8"
                  :options="productTypeListSearch"
                  @input="getDropdownValue('productTypeSearch')"
                  />
                </div>

                <div class="col-15" style="margin-right: 10px; width: 25%">
                  <q-select v-model="searchVal.productSeries"
                    :stack-label="true"
                    rounded outlined
                    class="searchform"
                    color="orange-8"
                    :options="filteredProductSeries"
                    @input="getDropdownValue('productSeriesSearch')"
                    @filter="doProductSeriesFilter"
                    label="Product Series"
                    use-input
                    fill-input
                    hide-selected
                    input-debounce="500">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <!-- <q-input
                    v-model="searchVal.productSeries"
                    label="Product Series"
                    color="purple-6"
                    stack-label
                    productSeriesList
                  /> -->
                </div>
              </div>

              <div class="row" style="margin-top:10px; width: 100%" >
                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-select
                    v-model="searchVal.assetStatus"
                    stack-label
                    label="Equiptment Status"
                    rounded outlined
                    class="searchform"
                    color="orange-8"
                    :options="assetStatusListSearch"
                    @input="getDropdownValue('assetStatusSearch')"
                  />
                </div>
                <div class="col-15" style="margin-right: 10px; width: 20%">
                  <q-select
                    rounded outlined
                    class="searchform"
                    color="orange-8"
                    v-model="searchVal.equipmentStatus"
                    label="Status"
                    :options="equipmentStatusListSearch"
                    @input="getDropdownValue('equipmentStatusSearch')"
                  />
                </div>
                <div class="col-15" style="margin-right: 10px; width: 20%">
                  <q-select v-model="searchVal.hubCode"
                    :stack-label="true"
                    rounded outlined
                    class="searchform"
                    color="orange-8"
                    :options="filteredHubCode"
                    @input="getDropdownValue('hubCodeSearch')"
                    @filter="doHubCodeFilter"
                    label="Hub Code"
                    use-input
                    fill-input
                    hide-selected
                    input-debounce="500">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-15" style="width: 25%; margin-right: 10px;">
                  <q-input
                    v-model="searchVal.logBatch"
                    label="Log Batch"
                    rounded outlined
                    class="searchform"
                    color="orange-8"
                    stack-label
                  />
                </div>

                <div class="col-12" style="width: 5%">
                  <q-btn round color="indigo-10" @click="doMainEquipmentRefreshList()">
                    <q-icon name="search"/>
                    <q-tooltip>Search</q-tooltip>
                  </q-btn>
                </div>
              </div>
            <!-- </fieldset> -->
          </div>
        </q-expansion-item>

        <q-table
          :data="listOfEquipment"
          :columns="equipmentListColumns"
          :pagination.sync="equipmentPagination"
          :rows-per-page-options="[10, 20, 50, 100, 200]"
          table-header-class="text-indigo-7 bg-indigo-2"
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

      <q-fab color="orange-6" glossy icon="keyboard_arrow_down" direction="down">
        <q-fab-action color="orange-5" text-color="white" @click.native="getSelectOptionForDetail" icon="add"><q-tooltip>Add</q-tooltip></q-fab-action>
        <q-fab-action color="orange-5" text-color="white" @click.native="modalUpload=true" icon="backup"><q-tooltip>Upload</q-tooltip></q-fab-action>
        <q-btn round color="orange-5" text-color="white" @click.native="downloadExcel"><q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip></q-btn>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="modalUpload" persistent @before-hide="doHideButton()">
      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Upload Equipment File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <a href="/statics/template/Form Upload - Indoor v2.xlsx">Download Template
            <q-tooltip>Form Upload - Indoor v2.xlsx</q-tooltip>
          </a>
        </q-card-section>
        <q-card-section>
          <!-- <q-field style="padding-bottom: 20px;"> -->
           <q-input
              type="file"
              @input="val => { doAttachFile(val[0]) }"
            />
            <div align="right" style="margin-top:10px">
              <q-btn v-show="uploadButton" round color="orange-5" @click="doUploadFile()">
                <q-icon name="fas fa-file-upload"/>
                <q-tooltip>Upload</q-tooltip>
              </q-btn>
            </div>
          <!-- </q-field> -->
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalSuccess" persistent>
      <q-card class="bg-white">
        <q-bar class="bg-white text-indigo-10">
          <strong></strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
        <div align="center" class="text-green"><q-icon size="50px" name="check"></q-icon></div>
        <div align="center" class="text-green">{{succesMessage}}</div>
        <div align="right" style="margin-top:20px">
          <q-btn round color="orange-4" @click="doUploadAfterWarning()">
            <q-icon name="fas fa-file-upload"/>
            <q-tooltip>Upload Data</q-tooltip>
          </q-btn>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

     <q-dialog v-model="modalError" persistent>
      <q-card class="bg-white">
        <q-bar class="bg-negative text-white">
          <strong>Error</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
         <q-table
          :data="listOfError"
          :columns="errorListColumn"
          dense>
          <q-td slot="body-cell-message" slot-scope="props">
            <div class="text-red bg-white">
              {{ props.row.message }}
            </div>
          </q-td>
         </q-table>
        </q-card-section>
        <q-card-section>
          <div align="right">
            <q-btn round color="orange-9" text-color="white" @click.native="IndoorErrorExcelDownload()">
              <q-icon name="get_app"/><q-tooltip>Download to Excel File</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalWarning" persistent>
      <q-card class="bg-white">
        <q-bar class="bg-orange text-white">
          <strong>Warning</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
         <q-table
          :data="listOfError"
          :columns="errorListColumn"
          dense>
          <q-td slot="body-cell-message" slot-scope="props">
            <div class="text-orange bg-white">
              {{ props.row.message }}
            </div>
          </q-td>
         </q-table>
         <div align="right" style="margin-top:20px">
           <q-btn round color="primary" @click="doUploadAfterWarning()">
            <q-icon name="fas fa-file-upload"/>
            <q-tooltip>Upload Data</q-tooltip>
          </q-btn>
         </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalAddNewAsset" maximized persistent @before-hide="doRefresh()">
      <q-card class="bg-white" >
        <q-bar class="bg-indigo-10 text-white">
        <strong>Indoor Equipment Form</strong>
        <q-space/>
        <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>
        <div class="row" style="margin-right:20px; margin-left:20px; margin-top:10px; margin-bottom:40px">
          <div class="col" style="width:30%; margin-right:15px">
            <q-input  v-model="input.id"
              :stack-label="true"
              label="Equipment Id"
              disable
              tabindex="1"/>
          </div>
          <div class="col" style="width:30%; margin-right:15px">
            <q-input  v-model="input.equipmentName"
              :stack-label="true"
              label="Equipment Name"
              disable
              tabindex="1"/>
          </div>
          <div class="col" style="width:30%">
            <q-select
              v-model="input.equipmentUploadStatus"
              ref="fAssetStatus"
              :rules="[val => !! val || 'Asset Status is required']"
              stack-label
              label="Equipment Status*"
              color="purple-6"
              :options="assetStatusList"
              @input="getDropdownValue('assetStatusForm')"/>
          </div>
        </div>
        <q-expansion-item
          label="Basic Information"
          header-class="bg-indigo-5 text-white"
          default-opened
          style="margin-bottom:10px"
          icon="article">
          <div class="row"  style="margin:20px">
            <div class="col" style="margin-right:10px">
              <q-input v-model="input.equipmentCategory"
                :stack-label="true"
                label="Equipment Category"
                disable
                tabindex="1"/>
              <q-input v-model="input.equipmentName" ref="fEquipmentName"
                :rules="[val => !! val || 'Equipment Name is required']"
                :stack-label="true"
                label="Equipment Name*"
                tabindex="2"
                style="margin-top:20px"/>
              <q-input v-model="input.description"
                :stack-label="true"
                label="Description"
                tabindex="3"/>
              <q-select v-model="input.productType" ref="fProductType"
                :rules="[val => !! val || 'Product Type is required']"
                :stack-label="true"
                label="Product Type*"
                :options="productTypeList"
                @input="getSubType()"
                tabindex="4"
                style="margin-top:20px"/>

              <!-- <div v-if="input.technology === 'FTTH'">
                <q-select v-model="input.productSubType"
                  :stack-label="true"
                  :options="subTypeList"
                  @input="getSubTypeValue()"
                  label="Product Sub Type"
                  style="margin-bottom:20px"
                  tabindex="5"/>
              </div> -->
              <!-- <div v-else> -->
              <q-select v-model="input.productSubType"
                :stack-label="true"
                :options="subTypeList"
                @input="getDropdownValue('productSubType')"
                label="Product Sub Type"
                tabindex="5"/>
              <!-- </div> -->
              <q-select v-model="input.productSeries" ref="fProductSeries"
                :rules="[val => !! val || 'Product Series is required']"
                :stack-label="true"
                :options="filteredProductSeries"
                @input="getDropdownValue('productSeriesForm')"
                @filter="doProductSeriesFilter"
                label="Product Series*"
                tabindex="6"
                style="margin-top:20px"
                use-input
                fill-input
                hide-selected
                input-debounce="500">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <!-- <q-input v-model="input.productSeries" ref="fProductSeries"
                :rules="[val => !! val || 'Product Series is required']"
                :stack-label="true"
                label="Product Series*"
                tabindex="6"
                style="margin-top:20px"/> -->
              <q-select v-model="input.manufacturer" ref="fManufacturer"
                :rules="[val => !! val || 'Manufacturer is required']"
                :stack-label="true"
                label="Manufacturer*"
                :options="manufacturerList"
                @input="getBrand()"
                tabindex="7"/>
              <q-select v-model="input.brand" ref="fBrand"
                :rules="[val => !! val || 'Brand is required']"
                :stack-label="true"
                label="Brand*"
                @input="getDropdownValue('brand')"
                :options="brandList"
                tabindex="8"/>
            </div>
            <div class="col" style="margin-right:10px">
              <q-select
                v-model="input.equipmentStatus" ref="fEquipmentStatus"
                :rules="[val => !! val || 'Status is required']"
                stack-label
                label="Status*"
                color="purple-6"
                :options="equipmentStatusList"
                tabindex="42"
                @input="getDropdownValue('equipmentStatusForm')"/>
              <q-select v-model="input.statusReason" ref="fStatusReason"
              :rules="[val => !! val || 'Status Reason is required']"
                :stack-label="true"
                label="Status Reason*"
                tabindex="42"
                :options="statusReasonList"
                @input="getDropdownValue('statusReasonForm')"/>
              <q-input v-model="input.serialNumberDevice"
                :stack-label="true"
                label="Serial Number Device"
                tabindex="9"/>
              <q-input v-model="input.serialNumberInternal"
                :stack-label="true"
                label="Serial Number Internal"
                tabindex="10"
                style="margin-top:20px"/>
              <q-input v-model="input.quantity" ref="fQuantity"
                :rules="[val => !! val || 'Quantity is required']"
                :stack-label="true"
                label="Quantity*"
                type="number"
                tabindex="11"
                style="margin-top:20px"/>
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item
          label="Location"
          header-class="bg-indigo-5 text-white"
          style="margin-bottom:10px"
          icon="location_on">
          <div class="row" style="margin:20px">
            <div class="col" style="margin-right:10px">
              <q-input v-model="input.rack" ref="fRack"
                :rules="[val => !! val || 'Rack is required']"
                :stack-label="true"
                label="Rack"
                tabindex="12"
                style="margin-top:20px"/>
              <q-input v-model="input.chassis" ref="fChasis"
                :rules="[val => !! val || 'Chasis is required']"
                :stack-label="true"
                label="Chassis"
                tabindex="13"/>
              <q-input v-model="input.slot"
                :stack-label="true"
                label="Slot"
                tabindex="14"/>
            </div>
            <div class="col">
              <q-select v-model="input.hubCode" ref="fHubCode"
                :rules="[val => !! val || 'Hub Code is required']"
                :stack-label="true"
                label="Hub Code*"
                tabindex="15"
                :options="hubCodeList"
                @input="getDropdownValue('hubCodeForm')"
                style="margin-top:20px"/>
              <q-select v-model="input.hubCodeRoom"  ref="fHubCodeRoom"
                :rules="[val => !! val || 'Hub Code Room is required']"
                :stack-label="true"
                label="Hub Code Room*"
                tabindex="16"
                :options="hubCodeRoomList"
                @input="getDropdownValue('hubCodeRoomForm')"/>
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item
          label="Detail Information"
          header-class="bg-indigo-5 text-white"
          style="margin-bottom:10px"
          icon="library_books">
          <div class="row" style="margin:20px">
            <div class="col" style="margin-right:10px">
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
              <q-input v-model="input.installationDate" ef="mInstallationDate"
                :rules="[val => !! val || 'Installation Date is required']"
                :stack-label="true"
                label="Installation Date*"
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
                tabindex="37"/>
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
            </div>
            <div class="col">
              <q-input v-model="input.capacity"
                :stack-label="true"
                label="Capacity"
                tabindex="25"
                style="margin-top:20px; margin-bottom:20px"/>
              <q-select v-model="input.capacityUnits"
                :stack-label="true"
                label="Capacity Units"
                tabindex="26"
                :options="capacityUnitsList"
                @input="getDropdownValue('capacityUnitsForm')"
                style="margin-bottom:20px"/>
              <q-input v-model="input.usedCapacity"
                :stack-label="true"
                label="Used Capacity"
                tabindex="27"/>
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
              <q-input v-model="input.noOfPortFront"
                :stack-label="true"
                label="No Of Port Front"
                tabindex="31"
                style="margin-top:20px"/>
              <q-input v-model="input.noOfPortRear"
                :stack-label="true"
                label="No Of Port Rear"
                tabindex="32"
                style="margin-top:20px"/>
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item
          label="Owners Information"
          header-class="bg-indigo-5 text-white"
          style="margin-bottom:10px"
          icon="account_circle">
          <div class="row" style="margin:20px">
            <div class="col" style="margin-right:10px">
              <q-input v-model="input.pic"
                :stack-label="true"
                label="PIC"
                tabindex="38"/>
              <q-select v-model="input.division" ref="fDivision"
                :rules="[val => !! val || 'Division is required']"
                :stack-label="true"
                label="Division*"
                tabindex="39"
                :options="divisionList"
                @input="getDropdownValue('divisionForm')"
                style="margin-top:20px"/>
            </div>
            <div class="col">
              <q-select v-model="input.department" ref="fDepartment"
                :rules="[val => !! val || 'Department is required']"
                :stack-label="true"
                label="Department*"
                tabindex="40"
                :options="departmentList"
                @input="getDropdownValue('departmentForm')"/>
              <q-select v-model="input.propertyOf" ref="fPropertyOf"
                :rules="[val => !! val || 'Property Of is required']"
                :stack-label="true"
                label="Property Of*"
                tabindex="41"
                :options="propertyOfList"
                @input="getDropdownValue('propertyOf')"/>
            </div>
          </div>
        </q-expansion-item>
        <q-separator></q-separator>
        <q-expansion-item
          label="Remarks"
          header-class="bg-indigo-5 text-white"
          style="margin-bottom:10px"
          icon="subject">
          <div align="right" style="margin:20px;width:50%">
            <q-input v-model="input.remarks"
              :stack-label="true"
              label="Remarks"
              tabindex="56"
              type="textarea"
              style="margin-top:20px"/>
          </div>
        </q-expansion-item>
          <div align="right" style="margin:20px">
            <q-btn round @click.native="saveEquipment" color="orange-5" icon="save">
            <q-tooltip>Submit</q-tooltip>
            </q-btn>
          </div>
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
.fieldset_search {
  border-color:  #8f1869;
  border-style: solid;
}
.legedn_search {
  border-color:  #8f1869;
  border-style: solid;
}
.searchform {
  border-color:  #eebf93;
  border-style: solid;
  -webkit-border-radius: 35px;
}
</style>

<script src="./js/indoorList.js"></script>
