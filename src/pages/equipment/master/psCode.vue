<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA /MASTER POWER SUPPLY</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:290px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER POWER SUPPLY</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>

    <div class="row" style="margin-buttom:20px">
      <div class="col-15" style="margin-right: 10px; width: 22%">
        <q-select
          v-model="searchVal.hubCode"
          stack-label
          label="Hub Code"
          color="purple-6"
          :options="hubCodeList"
          @input="getValueSelect()"
        />
      </div>

      <div class="col-15" style="margin-right: 10px; width: 22%">
        <q-input
        v-model="searchVal.psCode"
        stack-label
        label="Power Supply Code"
        color="purple-6"/>
      </div>

      <div class="col" style="width: 5%">
        <q-btn round color="purple-10" @click="doSearchByFilter()">
          <q-icon name="search"/>
          <q-tooltip>Search</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-page-sticky position="top-right" :offset="[15, 30]">
     <q-btn round color="green" text-color="white" @click.native="downloadExcel"><q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip></q-btn>
    </q-page-sticky>

    <div style="max-width: 1200px;margin-top:20px">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-white bg-indigo-8"
        :rows-per-page-options="[10, 20, 50, 100]"
        @request="doMainEquipmentChangePage"
        row-key="id"
        dense>
      </q-table>
    </div>

    <!-- <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm(false)">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky> -->

    <q-dialog v-model="showForm" persistent  @before-hide="clear()">

      <q-card class="bg-white">
        <q-bar class="bg-blue-7 text-white">
          <strong>Building Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input v-model="formData.pid"
                stack-label label="Building Code"/>
              <q-input v-model="formData.fidRegion"
                stack-label label="Region Id"/>
              <q-input v-model="formData.buildingType"
                stack-label label="Building buildingType"/>
              <q-input v-model="formData.buildingName"
                stack-label label="Building Name"/>
              <q-input v-model="formData.itCode"
                stack-label label="IT Code"/>
              <q-select v-model="formData.area"
                stack-label
                label="Area Name"
                :options="areaList"
                @input="getRegion()"/>
              <q-select v-model="formData.region"
                stack-label
                label="Region"
                :options="filteredRegionList"/>
              <q-input v-model="formData.city"
                stack-label label="City"/>
            </div>
            <div class="col" style="margin-left:20px">
              <q-input v-model="formData.locationName"
                stack-label label="Location Name"/>
              <q-input v-model="formData.complexName"
                stack-label label="ComplexName"/>
              <q-input v-model="formData.streetName"
                stack-label label="Steet Name"/>
              <q-input v-model="formData.streetNumber"
                stack-label label="Street Number"/>
              <q-input v-model="formData.postalCode"
                stack-label label="Postal Code"/>
              <q-input v-model="formData.phone"
                stack-label label="Phone"/>
              <q-input v-model="formData.fax"
                stack-label label="Fax"/>
            </div>
          </div>
          <div style="text-align: right">
            <q-btn round color="primary" @click.native="doSave()" size="small">
              <q-icon name="fas fa-save"/>
              <q-tooltip>Save Form</q-tooltip>
            </q-btn>
          </div>
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

<script src="./js/psCode.js"></script>
