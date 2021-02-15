<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">EQUIPMENT > FIELD EQUIPMENT</font>
    <div align="left" style="margin-bottom:30px; width:210px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">FIELD EQUIPMENT</font>
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
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Field Equipment</h4> -->
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
            <!-- <legend class="legedn_search">Search</legend> -->

              <div class="row" style="width: 100%">
                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-select
                    v-model="searchVal.equipmentStatus"
                    stack-label
                    label="Equipment Status"
                    color="purple-6"
                    :options="equipmentStatusListSearch"
                    @input="getDropdownValue('equipmentStatusSearch')"
                  />
                </div>

                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-input
                  v-model="searchVal.equipmentName"
                  stack-label
                  label="Equipment Name"
                  oninput="this.value = this.value.toUpperCase()"
                  class="text-uppercase"
                  color="purple-6"/>
                </div>

                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-select
                  v-model="searchVal.productType"
                  label="Product Type"
                  color="purple-6"
                  :options="productTypeListSearch"
                  @input="getDropdownValue('productTypeSearch')"
                  />
                </div>

                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-select v-model="searchVal.productSeries"
                    :stack-label="true"
                    color="purple-6"
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
              <div class="row" style="margin-top:20px">
                <div class="col-20" style="margin-right: 10px; width: 22%">
                  <q-select
                    v-model="searchVal.assetStatus"
                    stack-label
                    label="Asset Status"
                    color="purple-6"
                    :options="assetStatusListSearch"
                    @input="getDropdownValue('assetStatusSearch')"
                  />
                </div>
                <div class="col-20" style="margin-right: 10px;width: 22%">
                  <q-select v-model="searchVal.hubCode"
                    :stack-label="true"
                    color="purple-6"
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

                <div class="col-20" style="margin-right: 10px;width: 22%">
                  <q-select
                    v-model="searchVal.bdfCode"
                    label="BDF Code"
                    color="purple-6"
                    :options="filteredBdfCode"
                    @input="getDropdownValue('bdfCodeSearch')"
                    @filter="doBdfFilter"
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

                <div class="col-20" style="margin-right: 10px; width: 22%">
                  <q-input
                    v-model="searchVal.nodeCode"
                    label="Node Code"
                    color="purple-6"
                    oninput="this.value = this.value.toUpperCase()"
                    class="text-uppercase"
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
          :rows-per-page-options="[10, 20, 50, 100]"
          table-header-class="bg-indigo-2 text-indigo-10"
          @request="doMainEquipmentChangePage"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
          row-key="id"
          dense>

          <q-td slot="body-cell-action" slot-scope="cell">
            <q-btn-dropdown rounded size="sm" color="indigo-10">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn color="indigo-6" round size="sm" @click="doEdit(cell)">
                      <q-icon name="fas fa-edit" />
                      <q-tooltip>Edit</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-item clickable v-show="cell.row.productType == 'FIBERNODE' && parseInt(cell.row.equipmentName.substring(3), 10) > 10" v-close-popup>
                  <q-item-section>
                    <q-btn color="indigo-6" round size="sm" @click="doMainOpenMigrationForm(cell)">
                      <q-icon name="fas fa-exchange-alt" />
                      <q-tooltip>Migrate</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <!-- <div v-if="props.row.reqType === 'Update Address'">
                  <q-item clickable v-close-popup @click.native="getDetail(props.row.reqNo, false)">
                    <q-item-section avatar>
                      <div align="left">
                        <q-icon name="line_weight" color="primary"/><font class="text-blue"> Detail</font>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
                <div v-else>
                  <q-item clickable v-close-popup @click.native="getDetail(props.row.reqNo, true)">
                    <q-item-section avatar>
                      <div align="left">
                        <q-icon name="line_weight" color="primary"/><font class="text-blue"> Detail</font>
                      </div>
                    </q-item-section>
                  </q-item>
                </div> -->
              </q-list>
            </q-btn-dropdown>
          </q-td>

        </q-table>

        <q-page-sticky position="top-right" :offset="[15, 30]">
          <!-- <q-btn round color="primary" @click.native="modalUpload=true">
            <q-icon name="backup" />
            <q-tooltip>Upload</q-tooltip>
          </q-btn> -->
          <q-fab color="orange-7" glossy icon="keyboard_arrow_down" direction="down">
            <q-btn round color="orange-6" text-color="white" @click.native="getSelectOptionForDetail" icon="add">
              <q-tooltip>Add</q-tooltip>
            </q-btn>
            <q-btn round color="orange-6" text-color="white" @click.native="modalUpload=true" icon="backup">
              <q-tooltip>Upload</q-tooltip>
            </q-btn>
            <q-btn round color="orange-6" text-color="white" @click.native="downloadExcel">
              <q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip>
            </q-btn>
            <q-btn round color="orange-5" text-color="white"
              v-show="changeAssetStatusVisible()"
              @click.native="modalChangeAssetStatus=true" icon="rule">
              <q-tooltip>Change Status</q-tooltip>
            </q-btn>
          </q-fab>
        </q-page-sticky>

        <q-dialog v-model="modalAddNewAsset" maximized persistent @before-hide="doRefresh()">
          <q-card class="bg-white" >
            <q-bar class="bg-indigo-10 text-white">
            <strong>Field Equipment Form</strong>
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
                  stack-label
                  label="Asset Status"
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
                    @filter="doDropdownFilter"
                    label="Product Series"
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
                    v-model="input.equipmentStatus"
                    stack-label
                    label="Status"
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
                    @input="getDropdownValue('statusReasonForm')"
                    style="margin-top:20px"/>
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
                  <q-input v-model="input.rack"
                    :stack-label="true"
                    label="Rack"
                    tabindex="12"
                    style="margin-top:20px"/>
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
                  <q-select v-model="input.hubCode" ref="fHubCode"
                    :rules="[val => !! val || 'Hub Code is required']"
                    :stack-label="true"
                    label="Hub Code*"
                    tabindex="15"
                    :options="hubCodeList"
                    @input="getDropdownValue('hubCodeForm')"
                    style="margin-top:20px"/>
                  <q-select v-model="input.hubCodeRoom"
                    :stack-label="true"
                    label="Hub Code Room"
                    tabindex="16"
                    :options="hubCodeRoomList"
                    @input="getDropdownValue('hubCodeRoomForm')"/>
                  <q-input v-model="input.bdfCode"
                    :stack-label="true"
                    label="BDF Code"
                    tabindex="17"
                    style="margin-top:20px"/>
                  <q-input v-model="input.wdmCode"
                    :stack-label="true"
                    label="WDM Code"
                    tabindex="17"
                    style="margin-top:20px"/>
                </div>
                <div class="col" style="margin-right:10px">
                  <div v-if="input.productType === 'FIBERNODE'">
                    <q-input v-show="blueNodeCode" v-model="input.nodeCode" ref="fNodeCodeBlue"
                      :rules="[val => !! val || 'Node Code is required']"
                      :stack-label="true"
                      label="Node Code / FDT Code*"
                      tabindex="18"
                      @input="changeColorNodeCode"
                      style="margin-top:20px">
                    </q-input>
                    <q-input v-show="orangeNodeCode" v-model="input.nodeCode" ref="fNodeCodeOrange"
                      color="orange"
                      :stack-label="true"
                      label="Node Code / FDT Code*"
                      :rules="[val => !! val || 'Node Code is required']"
                      tabindex="18"
                      @input="changeColorNodeCode"
                      style="margin-top:20px">
                      <template v-slot:hint>
                        <font class="text-orange">Input Node Code in 8 characters.</font>
                      </template>
                    </q-input>
                  </div>
                  <div v-else>
                    <q-input v-model="input.nodeCode" ref="fNodeCodeElse"
                      :rules="[val => !! val || 'Node Code is required']"
                      :stack-label="true"
                      label="Node Code / FDT Code*"
                      @input="nodeInput"
                      tabindex="18"
                      style="margin-top:20px">
                    </q-input>
                  </div>

                  <div v-if="input.technology === 'FTTH' || input.productType === 'WDM' ">
                    <q-input v-model="input.psCode"
                      :stack-label="true"
                      label="Power Supply Code"
                      style="margin-bottom:20px"
                      tabindex="19"/>
                  </div>
                  <div v-else>
                    <div v-if="input.productType === 'POWER SUPPLY' || input.productType === 'POWER SUPPLY INDOOR'">
                      <q-input v-show="bluePsCode" v-model="input.psCode" ref="fPowerSupplyCodeBlue"
                        :rules="[val => !! val || 'Power Supply Code is required']"
                        :stack-label="true"
                        label="Power Supply Code*"
                        @input="changeColorPsCode"
                        tabindex="19"/>
                      <q-input v-show="orangePsCode" v-model="input.psCode" ref="fPowerSupplyCodeOrange"
                        :rules="[val => !! val || 'Power Supply Code is required']"
                        :stack-label="true"
                        label="Power Supply Code*"
                        color="orange"
                        @input="changeColorPsCode"
                        tabindex="19">
                        <template v-slot:hint>
                          <font class="text-orange">{{psCodeWarningText}}</font>
                        </template>
                      </q-input>
                    </div>
                    <div v-else>
                      <q-input v-model="input.psCode" ref="fPowerSupplyCodeElse"
                        :rules="[val => !! val || 'Power Supply Code is required']"
                        :stack-label="true"
                        label="Power Supply Code*"
                        tabindex="19"/>
                    </div>
                  </div>

                  <div v-if="input.productType === 'AMPLIFIER' || input.productType === 'AMPLIFIER INDOOR'">
                    <q-input v-show="blueAmplifierCode" v-model="input.amplifierCode" ref="fAmplifierCodeBlue"
                      :rules="[val => !! val || 'Amplifier Code is required']"
                      :stack-label="true"
                      label="Amplifier Code / Splitter FTTH Code*"
                      @input="changeColorAmplifierCode"
                      tabindex="20"/>
                    <q-input v-show="orangeAmplifierCode" v-model="input.amplifierCode" ref="fAmplifierCodeOrange"
                      :rules="[val => !! val || 'Amplifier Code is required']"
                      :stack-label="true"
                      label="Amplifier Code / Splitter FTTH Code*"
                      @input="changeColorAmplifierCode"
                      color="orange"
                      tabindex="20">
                      <template v-slot:hint>
                        <font class="text-orange">{{amplifierCodeWarningText}}</font>
                      </template>
                    </q-input>
                    <!-- <q-input v-model="input.service" ref="fService"
                      :rules="[val => !! val || 'Service is required']"
                      :stack-label="true"
                      label="Service*"
                      tabindex="21"/> -->
                  </div>
                  <div v-else>
                    <q-input v-model="input.amplifierCode"
                      :stack-label="true"
                      label="Amplifier Code / Splitter FTTH Code"
                      tabindex="20"/>
                  </div>

                  <q-input v-model="input.fatCode"
                    :stack-label="true"
                    label="FAT Code"
                    tabindex="14"
                    style="margin-top:20px"/>

                  <div v-if="input.technology === 'FTTH' || input.productType === 'FIBERNODE' || input.productType === 'WDM'">
                    <q-input v-model="input.predecessor"
                      :stack-label="true"
                      label="Predecessor"
                      tabindex="43"
                      style="margin-top:20px;margin-bottom:20px"/>
                  </div>
                  <div v-else>
                    <q-input v-model="input.predecessor" ref="fPredecessor"
                    :rules="[val => !! val || 'Predecessor is required']"
                    :stack-label="true"
                    label="Predecessor*"
                    tabindex="43"
                    style="margin-top:20px"/>
                  </div>

                  <q-input v-model="input.itCode" ref="fItCode"
                    :rules="[val => !! val || 'IT Code is required']"
                    :stack-label="true"
                    label="IT Code*"
                    tabindex="44"/>
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
                  <q-select v-model="input.service" ref="fService"
                    :rules="[val => !! val || 'Service is required']"
                    :stack-label="true"
                    label="Service*"
                    tabindex="21"
                    :options="serviceList"
                    @input="getDropdownValue('serviceForm')"
                    style="margin-top:20px"/>
                  <q-select v-model="input.technology" ref="fTechnology"
                    :rules="[val => !! val || 'Technology is required']"
                    :stack-label="true"
                    label="Technology*"
                    tabindex="22"
                    :options="technologyList"
                    @input="getDropdownValue('technologyForm')"/>
                  <q-input v-model="input.ipAddress"
                    :stack-label="true"
                    label="IP Address"
                    tabindex="23"/>
                  <q-input v-model="input.macAddress"
                    :stack-label="true"
                    label="MAC Address"
                    tabindex="24"
                    style="margin-top:20px"/>
                  <q-input v-model="input.customerType"
                    :stack-label="true"
                    label="Customer Type"
                    tabindex="24"
                    style="margin-top:20px"/>
                </div>
                <div class="col">
                  <div v-if="input.technology === 'FTTH' || input.productType === 'FIBERNODE' || input.productType === 'WDM'">
                    <q-input v-model="input.capacity"
                      :stack-label="true"
                      label="Capacity"
                      tabindex="25"
                      style="margin-top:20px; margin-bottom:20px"/>
                  </div>
                  <div v-else>
                    <q-input v-model="input.capacity" ref="fCapacity"
                      :rules="[val => !! val || 'Capacity is required']"
                      :stack-label="true"
                      label="Capacity*"
                      tabindex="25"
                      style="margin-top:20px"/>
                  </div>

                  <div v-if="input.technology === 'FTTH' || input.productType === 'FIBERNODE' || input.productType === 'WDM'">
                    <q-select v-model="input.capacityUnits"
                      :stack-label="true"
                      label="Capacity Units"
                      tabindex="26"
                      :options="capacityUnitsList"
                      @input="getDropdownValue('capacityUnitsForm')"
                      style="margin-bottom:20px"/>
                  </div>
                  <div v-else>
                    <q-select v-model="input.capacityUnits" ref="fCapacityUnits"
                      :rules="[val => !! val || 'Capacity Units is required']"
                      :stack-label="true"
                      label="Capacity Units*"
                      tabindex="26"
                      :options="capacityUnitsList"
                      @input="getDropdownValue('capacityUnitsForm')"/>
                  </div>

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
                  <q-input v-model="input.homepassed"
                    :stack-label="true"
                    label="Homepassed"
                    tabindex="32"
                    style="margin-top:20px"/>
                  <q-input v-model="input.internetAccount"
                    :stack-label="true"
                    label="Internet Account"
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
            <q-expansion-item
              label="Detail Location"
              header-class="bg-indigo-5 text-white"
              style="margin-bottom:10px"
              icon="dashboard">
              <div class="row" style="margin:20px">
                <div class="col" style="margin-right:10px">
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
                    <q-input v-model="input.normalDistance"
                      :stack-label="true"
                      label="Normal Distance"
                      tabindex="54"
                      style="margin-top:20px"/>
                  </div>
                  <div class="col" style="margin-right:10px">
                    <q-input v-model="input.streetName"
                      :stack-label="true"
                      label="Street Name"
                      tabindex="49"/>
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
                  </div>
                </div>
            </q-expansion-item>
            <q-expansion-item
              label="Migration History"
              header-class="bg-indigo-5 text-white"
              style="margin-bottom:10px"
              icon="grading">
              <div class="row" style="margin:20px">
                <q-table
                  :data="migrationHistoryList"
                  :columns="migrationColumns"
                  :pagination.sync="pagination"
                  table-header-class="text-white bg-indigo-8"
                  row-key="id"
                  dense>
                  <q-td slot="body-cell-historyDate" slot-scope="props">
                    {{ props.row.historyDate | formatDate}}
                  </q-td>
                </q-table>
              </div>
            </q-expansion-item>
            <q-separator></q-separator>
            <div align="right" style="margin:20px;width:50%">
              <q-input v-model="input.remarks"
                :stack-label="true"
                label="Remarks"
                tabindex="56"
                type="textarea"
                style="margin-top:20px"/>
            </div>
              <div align="right" style="margin:20px">
                <q-btn rounded @click.native="saveEquipment" color="warning" icon="save">
                <q-tooltip>Submit</q-tooltip>
                </q-btn>
              </div>
          </q-card>
        </q-dialog>

        <q-dialog v-model="modalUpload" persistent @before-hide="doHideButton()">
          <q-card class="bg-white">
            <q-bar class="bg-primary text-white">
              <strong>Upload Equipment File</strong>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup />
            </q-bar>
            <q-card-section>
              <a href="/statics/template/FieldTemplateExcel.xlsx">Download Template</a>
            </q-card-section>
            <q-card-section>
              <!-- <q-field style="padding-bottom: 20px;"> -->
                <q-input
                  type="file"
                  @input="val => { doAttachFile(val[0]) }"
                />
                <q-btn v-show="uploadButton" round color="primary" @click="doUploadFile()">
                  <q-icon name="fas fa-file-upload"/>
                  <q-tooltip>Upload</q-tooltip>
                </q-btn>
              <!-- </q-field> -->
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

        <q-dialog v-model="modalChangeAssetStatus" persistent>
          <q-card class="bg-white">
            <q-bar class="bg-primary text-white">
              <strong>Change Status</strong>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup />
            </q-bar>
            <q-card-section>
            <q-input v-model="selected.length"
                :stack-label="true"
                label="Selected Equipment"
                readonly
                style="margin-top:20px"/>
              <q-select
                v-model="groupSelect.assetStatus"
                stack-label
                label="Asset Status"
                :options="assetStatusList"
                @input="getDropdownValue('assetStatusSelectForm')"/>
            <div align="right" style="margin-top:20px">
              <q-btn v-show="btnChangeStatus" round @click.native="changeSelectedStatus" color="orange-5" icon="save">
                <q-tooltip>Submit</q-tooltip>
              </q-btn>
            </div>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="showMigrationForm" :maximized="true" persistent>

          <q-card class="bg-white">
            <q-bar class="bg-indigo-8 text-white">
              <strong>Migration</strong>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup/>
            </q-bar>

            <q-card-section>
              <q-stepper ref="stepper"
                v-model="migrationStep"
                color="primary"
                style="max-width: 100%"
                animated
                inactive-color="warning"
                done-color="positive"
                @before-transition="doMigrationCheckStep()">

                <q-step
                  :name="1"
                  :done="migrationStep > 1"
                  title="Setup Destination">
                  <div class="row" style="margin-bottom:10px">
                    <q-option-group
                        style="margin: 10px 0px 0px 0px"
                        v-model="equipmentToMigrate.selectedMoveNodeOption"
                        @input="doMigrationChangeMoveNodeOption()"
                        :options="moveNodeOptions"
                        inline />
                  </div>
                  <br/>
                  <div class="row" style="width:60%; margin-bottom:10px">
                    <div class="col" style="margin-right:20px;">
                      <q-input readonly v-model="equipmentToMigrate.hubCode"
                        label="Source Hub"/>
                    </div>
                    <div class="col" style="margin-right:20px;">
                      <q-select
                        v-model="hubCodeName"
                        @input="doMigrationChangeHub()"
                        label="Destination Hub"
                        :options="hubCodeList"
                      />
                    </div>
                    <div class="col" style="margin-right:20px;">
                      <q-input v-model="equipmentToMigrate.date"
                        :stack-label="true"
                        label="Migration Date"
                        tabindex="35">
                        <template v-slot:after>
                          <q-icon name="event">
                            <q-popup-proxy ref="qPurchasedDate" transition-show="scale" transition-hide="scale">
                              <q-date v-model="equipmentToMigrate.date" mask="DD/MM/YYYY" @input="() => $refs.qPurchasedDate.hide()" />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="row" style="width:60%">
                    <div class="col" style="margin-right:20px;">
                      <q-input readonly v-model="equipmentToMigrate.nodeCode"
                        label="Source Node"/>
                    </div>
                    <div class="col" style="margin-right:20px">
                      <q-select
                        v-model="hubCodeService"
                        @input="doMigrationChangeHubCode()"
                        stack-label
                        label="Hub Code"
                        :options="hubCodeServiceSelected"
                      />
                    </div>
                    <div class="col" style="margin-right:20px">
                      <q-input v-model="equipmentToMigrate.newNodeNumber"
                        :stack-label="true"
                        :prefix="nodePrefixByHub"
                        ref="destinationNode"
                        label="Destination Node"
                        oninput="this.value = this.value.toUpperCase()"
                        class="text-uppercase"
                        @input="doMergeSelectedNewNode"
                        :rules="[val => !!val || 'Destination Node is required']"/>
                    </div>
                  </div>
                      <!-- <div class="row">
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
                      </div> -->
                </q-step>

                <q-step :name="2"
                title="Setup New Hierarchy"
                :done="migrationStep > 2">
                  <q-tabs v-model="migrationTab"
                      dense
                      active-color="indigo-10"
                      indicator-color="primary"
                      align="justify"
                      class="bg-indigo-1 text-indigo-4 shadow-1"
                      narrow-indicator>
                    <q-tab name="original" label="Original" />
                    <q-tab name="newConfig" label="New Configuration" default />
                  </q-tabs>

                  <q-tab-panels v-model="migrationTab" animated>
                    <q-tab-panel name="original">
                      <q-table
                        :data="migrationListOriginal"
                        :columns="migrationOriginalColumns"
                        table-header-class="text-indigo-6 bg-indigo-1"
                        :pagination.sync="migrationOriginalPagination"
                        dense
                        row-key="id">
                      </q-table>
                    </q-tab-panel>

                    <q-tab-panel name="newConfig">
                      <q-bar class="bg-white">
                        <div class="row" style="width:40%">
                          <div class="col"><strong>Source Node:
                            <font style="color: green">
                              {{ equipmentToMigrate.nodeCode }}
                            </font>
                            </strong>
                            <q-space />
                          </div>
                          <div class="col"><strong>Target Node:
                            <font style="color: green">
                              {{ equipmentToMigrate.newNodeCode }}
                            </font>
                            </strong>
                            <q-space />
                          </div>
                          </div>
                      </q-bar>
                      <q-bar class="bg-white">
                        <div class="row" style="width:40%">
                          <div class="col"><strong>Migration Type:
                            <font style="color: green">
                              {{ migrationType }}
                            </font>
                          </strong>
                          </div>
                          <div class="col"><strong>Migration Date:
                            <font style="color: green">
                              {{ equipmentToMigrate.date }}
                            </font>
                          </strong>
                          </div>
                        </div>
                        <q-space />
                        <q-btn round color="primary" @click="doMigrationAddPowerSupply()" size="sm"
                          v-show="isMigrationAddPowerSupplyVisible()"
                          style="margin-right: 10px">
                          <q-icon name="fas fa-car-battery"/>
                          <q-tooltip>Add New Equipment</q-tooltip>
                        </q-btn>
                        <!-- <q-btn round color="primary" @click="doMigrationAddAmplifier()" size="sm"
                          v-show="isMigrationAddAmplifierVisible()"
                          style="margin-right: 10px">
                          <q-icon name="fab fa-creative-commons-sampling"/>
                          <q-tooltip>Add Amplifier</q-tooltip>
                        </q-btn> -->
                      </q-bar>
                      <br/>
                      <q-table
                        :data="equipmentToMigrate.migrationListNew"
                        :columns="migrationNewColumns"
                        table-header-class="text-indigo-6 bg-indigo-1"
                        :pagination.sync="migrationNewPagination"
                        dense
                        row-key="id">

                        <q-td align="center" slot="body-cell-newName" slot-scope="cell">
                          <div v-if="cell.row.migrate === false || cell.row.assetStatus === 'Inactive'" class="text-red">
                            {{ cell.row.newName }}
                          </div>
                          <div v-else-if="cell.row.assetStatus === 'Replace'" class="text-blue">
                            {{ cell.row.newName }}
                          </div>
                          <div v-else class="text-green">
                            {{ cell.row.newName }}
                          </div>
                          <q-popup-edit v-model="cell.row.newName">
                            <q-input v-model="cell.row.newNumber" dense :prefix="getMigrationEquipmentPrefix(cell.row)"
                              :mask="((cell.row.equipmentName !== undefined && cell.row.productType === 'POWER SUPPLY') ? 'A' : 'XXXX')"
                              unmasked-value
                              @input="doMigrationChangeEquipmentName(cell.row)"/>
                          </q-popup-edit>
                        </q-td>
                        <q-td align="center" slot="body-cell-productType" slot-scope="cell" :style="cell.row.migrate ? 'color:#3a6' : 'color:#c63'">
                          <q-select
                            v-model="cell.row.productType"
                            :options="newProductTypeList"
                            @input="doMigrationChangeProductType(cell.row)"/>
                        </q-td>
                        <q-td align="center" slot="body-cell-newPredecessor" slot-scope="cell">
                          <div v-if="cell.row.migrate === false || cell.row.assetStatus === 'Inactive'" class="text-red">
                            {{ cell.row.newPredecessor }}
                          </div>
                          <div v-else-if="cell.row.assetStatus === 'Replace'" class="text-blue">
                            {{ cell.row.newPredecessor }}
                          </div>
                          <div v-else class="text-green">
                            {{ cell.row.newPredecessor }}
                          </div>
                          <q-popup-edit v-model="cell.row.newPredecessor" :disable="cell.row.productType === 'FIBERNODE' || cell.row.productType === 'POWER SUPPLY'" >
                            <q-input v-model="cell.row.newPredecessorNumber" dense :prefix="getMigrationEquipmentPrefix(cell.row)"
                              mask="XXXX"
                              @input="doMigrationChangePredecessor(cell.row)"/>
                          </q-popup-edit>
                        </q-td>
                        <q-td align="center" slot="body-cell-newPsCode" slot-scope="cell">
                          <div v-if="cell.row.migrate === false || cell.row.assetStatus === 'Inactive'" class="text-red">
                            {{ cell.row.newPsCode }}
                          </div>
                          <div v-else-if="cell.row.assetStatus === 'Replace'" class="text-blue">
                            {{ cell.row.newPsCode }}
                          </div>
                          <div v-else class="text-green">
                            {{ cell.row.newPsCode }}
                          </div>
                          <q-popup-edit v-model="cell.row.newPsCode" :disable="cell.row.productType === 'PS'">
                            <q-input v-model="cell.row.newPsCode" dense
                              mask="AAA###A"/>
                          </q-popup-edit>
                        </q-td>

                        <q-td slot="body-cell-action" slot-scope="cell" align="center">
                          <q-btn-dropdown rounded size="sm" color="blue-10">
                            <q-list>
                              <q-item clickable v-close-popup>
                                <q-item-section>
                                  <q-btn round color="primary" @click="doMigrationStayOrMove(cell.row)" size="sm" v-show="isMigrationStayOrMoveVisible(cell.row) "
                                    style="margin: 5px">
                                    <q-icon :name="cell.row.migrate ? 'fas fa-angle-double-down' : 'fas fa-angle-double-right'"/>
                                    <q-tooltip>{{ cell.row.migrate ? 'Stay' : 'Move' }}</q-tooltip>
                                  </q-btn>
                                  <q-btn round icon="delete_outline" color="primary" @click="doRemove(cell)" size="sm" v-show="isMigrationRemoveVisible(cell.row)" style="margin: 5px">
                                    <q-tooltip>Romove</q-tooltip>
                                  </q-btn>
                                  <q-btn round color="primary" @click="doInactive(cell.row)" size="sm" v-show="isMigrationInactiveVisible(cell.row)" style="margin: 5px">
                                    <q-icon :name="cell.row.assetStatus === 'Inactive' ? 'done' : 'clear'"/>
                                    <q-tooltip>{{ cell.row.assetStatus === 'Inactive' ? 'Active' : 'Inactive' }}</q-tooltip>
                                  </q-btn>
                                  <q-btn round icon="compare_arrows" color="primary" @click="doReplace(cell.row)" size="sm" v-show="isMigrationReplaceVisible(cell.row)" style="margin: 5px">
                                    <q-tooltip>Replace</q-tooltip>
                                  </q-btn>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-btn-dropdown>
                          <!-- <q-btn round color="primary" @click="doMigrationPromoteToFibernode(cell.row)" size="sm" v-show="isMigrationPromoteVisible(cell.row)">
                            <q-icon name="fas fa-medal"/>
                            <q-tooltip>Promote To Fibernode</q-tooltip>
                          </q-btn> -->
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
                    <q-card class="preview-tree-card">
                      <q-card-section>
                        <q-tree
                          :nodes="targetPreview"
                          node-key="label"
                          ref="targetPreview"
                          default-expand-all
                        >
                          <template v-slot:default-header="prop">
                            <span class="row items-center">
                              <span v-if="prop.node.status === 'Inactive'" class="text-weight-bold text-red">{{ prop.node.label }}</span>
                              <span v-else-if="prop.node.status === 'New'" class="text-weight-bold text-orange">{{ prop.node.label }}</span>
                              <span v-else-if="prop.node.status === 'Replace'" class="text-weight-bold text-blue">{{ prop.node.label }}</span>
                              <span v-else class="text-weight-bold text-green">{{ prop.node.label }}</span>
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
                      color="indigo-9"
                      label="Continue"
                      v-show="migrationStep !== 3"
                    />
                    <q-btn
                      @click="doMigrationExecute()"
                      color="indigo-9"
                      label="Finalize"
                      v-show="migrationStep === 3"
                      :disable="validationResults.length > 0"
                    />
                    <q-btn v-if="migrationStep > 1" flat color="indigo-9" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                  </q-stepper-navigation>
                </template>

              </q-stepper>
            </q-card-section>
          </q-card>

        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>

  .red{
    color:red;
  }

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

<script src="./js/fieldList.js"></script>
<style>
.fieldset_search {
  border-color:  #1d0f50;
  border-style: solid;
}
.legedn_search {
  border-color:  #8f1869;
  border-style: solid;
}
</style>
