<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA /MASTER POWER SUPPLY</font>
    <div align="left" style="margin-bottom:30px;margin-top:10px;width:280px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER POWER SUPPLY</font>
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
    <q-card>
      <q-card-section>
        <q-expansion-item
          label="SEARCH"
          header-class="bg-indigo-2 text-indigo-10"
          style="margin-bottom:10px"
          icon="search">
          <div class="row bg-orange-1" style="padding: 10px; width:100%" align="left">
            <fieldset class="fieldset_search" style="width: 100%; margin:10px">

              <div class="row" style="margin-buttom:20px">
                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-select
                    v-model="searchVal.hubCode"
                    stack-label
                    label="HUB NAME"
                    color="indigo-10"
                    :options="hubCodeList"
                    @input="getValueSelect()"
                  />
                </div>

                <div class="col-15" style="margin-right: 10px; width: 22%">
                  <q-input
                  v-model="searchVal.psCode"
                  stack-label
                  label="PS Name"
                  oninput="this.value = this.value.toUpperCase()"
                  class="text-uppercase"
                  color="indigo-10"/>
                </div>

                <div class="col" style="width: 5%">
                  <q-btn round color="indigo-10" @click="doSearchByFilter()">
                    <q-icon name="search"/>
                    <q-tooltip>Search</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </fieldset>
          </div>
        </q-expansion-item>
        <q-table
          :data="dataList"
          :columns="tableColumns"
          :pagination.sync="pagination"
          table-header-class="bg-indigo-2 text-indigo-10"
          :rows-per-page-options="[10, 20, 50, 100]"
          @request="doMainEquipmentChangePage"
          row-key="id"
          dense>
          <q-td slot="body-cell-action" align="center" slot-scope="cell">
            <q-btn-dropdown rounded size="sm" color="indigo-10">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn color="indigo-6" round size="sm" @click="doOpenForm(cell)">
                      <q-icon name="fas fa-edit" />
                      <q-tooltip>Detail</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-table>
      </q-card-section>
    </q-card>

    <q-page-sticky position="top-right" :offset="[15, 30]">
     <q-btn round color="orange-6" text-color="white" @click.native="downloadExcel"><q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip></q-btn>
    </q-page-sticky>

    <!-- <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm(false)">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky> -->

    <q-dialog v-model="showForm" persistent>

      <q-card class="bg-white">
        <q-bar class="bg-blue-7 text-white">
          <strong>Power Supply Detail</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div class="row">
            <div class="col">
               <q-input v-model="formData.equipmentName"
                readonly stack-label label="PS Name"/>
              <q-input v-model="formData.itCode"
                readonly stack-label label="IT Code"/>
              <q-input v-model="formData.description"
                readonly stack-label label="Description"
                type="textarea" style="max-height: 112px"/>
              <q-input v-model="formData.hubCode"
                readonly stack-label label="Hub Code"/>
              <q-input v-model="formData.homepassed"
                readonly stack-label label="Homepassed"/>
              <q-input v-model="formData.buildingName"
                readonly stack-label label="Building Name"/>
              <q-input v-model="formData.tower"
                readonly stack-label label="Tower"/>
              <q-input v-model="formData.floor"
                readonly stack-label label="Floor"/>
            </div>
            <div class="col" style="margin-left:20px">
              <q-input v-model="formData.complexName"
                readonly stack-label label="Complex Name"/>
              <q-input v-model="formData.streetName"
                readonly stack-label label="Street Name"
                type="textarea" style="max-height: 112px"/>
              <q-input v-model="formData.streetNumber"
                readonly stack-label label="Street Number"/>
              <q-input v-model="formData.kelurahan"
                readonly stack-label label="District"/>
              <q-input v-model="formData.postalCode"
                readonly stack-label label="Postal Code"/>
              <q-input v-model="formData.direction"
                readonly stack-label label="Direction"/>
              <q-input v-model="formData.remarks"
                readonly stack-label label="Remarks"/>
            </div>
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
.fieldset_search {
  border-color:  #1d0f50;
  border-style: solid;
}
</style>

<script src="./js/psCode.js"></script>
