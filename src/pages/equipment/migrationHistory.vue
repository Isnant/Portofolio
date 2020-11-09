<template>
  <q-page>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:260px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MIGRATION HISTORY</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <div class="row" style="width:700px;margin:10px">
      <div class="col" style="margin-right:20px">
        <q-input
          v-model="searchVal.reqStartDate"
          clearable
          stack-label
          @input="doClearSearchVal('start')"
          label="Start Date">
          <template v-slot:prepend>
            <q-icon name="event">
              <q-popup-proxy ref="qreqDateStart" transition-show="scale" transition-hide="scale">
                <q-date v-model="searchVal.reqStartDate"
                mask="DD/MM/YYYY"
                @input="() => $refs.qreqDateStart.hide()"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-input
          v-model="searchVal.reqEndDate"
          stack-label
          clearable
          @input="doClearSearchVal('end')"
          label="End Date">
          <template v-slot:prepend>
            <q-icon name="event">
              <q-popup-proxy ref="qreqDateEnd" transition-show="scale" transition-hide="scale">
                <q-date v-model="searchVal.reqEndDate"
                mask="DD/MM/YYYY"
                @input="() => $refs.qreqDateEnd.hide()"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-btn round color="purple-10" @click="doSearchByFilter()">
          <q-icon name="search"/>
          <q-tooltip>Search</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div style="max-width: 1200px">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-white bg-indigo-8"
        @request="doMainEquipmentChangePage"
        row-key="id"
        dense>
        <q-td slot="body-cell-historyDate" slot-scope="props">
          {{ props.row.historyDate | formatDate}}
        </q-td>
      </q-table>
    </div>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm(false)">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky>

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

<script src="./js/migrationHistory.js"></script>
