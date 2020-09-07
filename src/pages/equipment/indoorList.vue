<template>
  <q-page padding>
    <div align="left" style="margin-bottom:30px; width:230px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">INDOOR EQUIPMENT</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Indoor Equipment</h4> -->
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
        <strong>Indoor Equipment Form</strong>
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
              <q-input v-model="input.equipmentName" ref="hEquipmentName"
                :rules="[val => !! val || 'Equipment Name is required']"
                :stack-label="true"
                label="Equipment Name*"
                tabindex="2"
                style="margin-top:20px"/>
              <q-input v-model="input.description"
                :stack-label="true"
                label="Description"
                tabindex="3"/>
              <q-select v-model="input.productType" ref="hProductType"
                :rules="[val => !! val || 'Product Type is required']"
                :stack-label="true"
                @input="getSubType()"
                label="Product Type*"
                tabindex="4"
                :options="productTypeList"
                style="margin-top:20px"/>
              <q-select v-model="input.productSubType" ref="hProductSubType"
                :rules="[val => !! val || 'Product Sub Type is required']"
                :stack-label="true"
                :options="subTypeList"
                label="Product Sub Type*"
                tabindex="5"/>
              <q-input v-model="input.productSeries" ref="hProductSeries"
                :rules="[val => !! val || 'Product Series is required']"
                :stack-label="true"
                label="Product Series*"
                tabindex="6"/>
              <q-select v-model="input.manufacturer" ref="hManufacturer"
                :rules="[val => !! val || 'Manufacturer is required']"
                :stack-label="true"
                :options="manufacturerList"
                @input="getBrand()"
                label="Manufacturer*"
                tabindex="7"/>
              <q-select v-model="input.brand" ref="hBrand"
                :rules="[val => !! val || 'Brand is required']"
                :stack-label="true"
                label="Brand*"
                :options="brandList"
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
              <q-input v-model="input.quantity" ref="hQuantity"
                :rules="[val => !! val || 'Quantity is required']"
                type="number"
                :stack-label="true"
                label="Quantity*"
                tabindex="11"
                style="margin-top:20px"/>
              <q-input v-model="input.rack" ref="hRack"
                :rules="[val => !! val || 'Rack is required']"
                :stack-label="true"
                label="Rack*"
                tabindex="12"/>
              <q-input v-model="input.chassis" ref="hChassis"
                :rules="[val => !! val || 'Chassis is required']"
                :stack-label="true"
                label="Chassis*"
                tabindex="13"/>
              <q-input v-model="input.slot" ref="hSlot"
                :rules="[val => !! val || 'Slot is required']"
                :stack-label="true"
                label="Slot*"
                tabindex="14"/>
              <q-input v-model="input.hubCode" ref="hHubCode"
                :rules="[val => !! val || 'Hub Code is required']"
                :stack-label="true"
                label="Hub Code*"
                tabindex="15"/>
              <q-input v-model="input.hubAddress" ref="hHubAddress"
                :rules="[val => !! val || 'Hub Address is required']"
                :stack-label="true"
                label="Hub Address*"
                tabindex="16"/>
              <!-- <q-input v-model="input.bdfCode"
                :stack-label="true"
                label="BDF Code"
                tabindex="17"/>
              <q-input v-model="input.nodeCode"
                :stack-label="true"
                label="Node Code"
                tabindex="18"
                style="margin-top:20px"/>
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
              <q-input v-model="input.service"
                :stack-label="true"
                label="Service"
                tabindex="21"/>
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
            </div>
            <div class="col">
              <q-input v-model="input.capacity"
                :stack-label="true"
                label="Capacity"
                tabindex="25"/>
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
                    <q-popup-proxy ref="qPurchasedDateHub" transition-show="scale" transition-hide="scale">
                      <q-date v-model="input.purchasedDate" mask="DD/MM/YYYY" @input="() => $refs.qPurchasedDateHub.hide()" />
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
                    <q-popup-proxy ref="qInstallationDateHub" transition-show="scale" transition-hide="scale">
                      <q-date v-model="input.installationDate" mask="DD/MM/YYYY" @input="() => $refs.qInstallationDateHub.hide()" />
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
              <q-input v-model="input.division" ref="hDivision"
                :rules="[val => !! val || 'Division is required']"
                :stack-label="true"
                label="Division*"
                tabindex="39"
                style="margin-top:20px"/>
              <q-input v-model="input.department" ref="hDepartment"
                :rules="[val => !! val || 'Department is required']"
                :stack-label="true"
                label="Department*"
                tabindex="40"/>
              <q-input v-model="input.propertyOf" ref="hPropertyOf"
                :rules="[val => !! val || 'Property Of is required']"
                :stack-label="true"
                label="Property Of*"
                tabindex="41"/>
              <q-input v-model="input.equipmentStatus" ref="hEquipmentStatus"
                :rules="[val => !! val || 'Status Reason is required']"
                :stack-label="true"
                label="Status Reason*"
                tabindex="42"/>
              <q-input v-model="input.remarks"
                :stack-label="true"
                label="Remarks"
                tabindex="43"/>
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
          <a href="/statics/template/IndoorTemplate.xlsx">Download Template</a>
        </q-card-section>
        <q-card-section>
          <q-field style="padding-bottom: 20px;">
            <input
              id="excelFile"
              type="file"
              ref="excelFile"
            />
            <q-btn round color="primary" @click="doUploadFile()">
              <q-icon name="fas fa-file-upload"/>
            </q-btn>
          </q-field>
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
.fieldset_search {
  border-color:  #8f1869;
  border-style: solid;
}
.legedn_search {
  border-color:  #8f1869;
  border-style: solid;
}
</style>

<script src="./js/indoorList.js"></script>
