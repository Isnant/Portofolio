<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA / MASTER NODE</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:180px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER NODE</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Master :: Building</h4> -->
    <div class="row" style="margin-buttom:20px">
      <div class="col-15" style="margin-right: 10px; width: 22%">
        <q-select
          v-model="searchVal.hubCode"
          stack-label
          label="HUB NAME"
          color="purple-6"
          :options="hubCodeList"
          @input="getValueSelect()"
        />
      </div>

      <div class="col-15" style="margin-right: 10px; width: 22%">
        <q-input
        v-model="searchVal.nodeCode"
        stack-label
        label="Node Name"
        oninput="this.value = this.value.toUpperCase()"
        class="text-uppercase"
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

    <div style="margin-top:20px; width: 80%">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        :rows-per-page-options="[10, 20, 50, 100]"
         @request="doMainEquipmentChangePage"
        table-header-class="text-white bg-indigo-8"
        row-key="id"
        dense>

        <!-- <q-td slot="body-cell-action" slot-scope="props">
          <q-btn color="primary" round size="sm" @click="doOpenForm(props.row.pid)" style="margin-right: 10px">
            <q-icon name="fas fa-edit" />
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn color="primary" round size="sm" @click="doToggleStatus(props)">
            <q-icon :name="props.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
            <q-tooltip>{{ props.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
          </q-btn>
        </q-td> -->
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
        <q-td slot="body-cell-recordStatus" slot-scope="props">
          <div v-if="props.row.recordStatus === 'A'">
            <q-icon name="done" color="primary"  style="font-size: 20px;"/>
          </div>
          <div v-else>
            <q-icon name="clear" color="negative"  style="font-size: 20px;"/>
          </div>
        </q-td>

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
          <strong>Node Detail</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div class="row">
            <div class="col">
               <q-input v-model="formData.equipmentName"
                readonly stack-label label="Node Name"/>
              <q-input v-model="formData.itCode"
                readonly stack-label label="IT Code"/>
              <q-input v-model="formData.description"
                readonly stack-label label="Description"
                type="textarea" style="max-height: 112px"/>
              <q-input v-model="formData.psCode"
                readonly stack-label label="PS Code"/>
              <q-input v-model="formData.hubCode"
                readonly stack-label label="Hub Code"/>
              <q-input v-model="formData.homepassed"
                readonly stack-label label="Homepassed"/>
              <q-input v-model="formData.technology"
                readonly stack-label label="Technology"/>
              <q-input v-model="formData.customerType"
                readonly stack-label label="Customer Type"/>
              <q-input v-model="formData.buildingName"
                readonly stack-label label="Building Name"/>
              <q-input v-model="formData.tower"
                readonly stack-label label="Tower"/>
              <q-input v-model="formData.floor"
                readonly stack-label label="Floor"/>
              <q-input v-model="formData.complexName"
                readonly stack-label label="Complex Name"/>
            </div>
            <div class="col" style="margin-left:20px">
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
              <q-input v-model="formData.cascades"
                readonly stack-label label="Cascades"/>
              <q-input v-model="formData.customerType"
                readonly stack-label label="Customer Type"/>
              <q-input v-model="formData.normalDistance"
                readonly stack-label label="Normal Distance"/>
              <q-input v-model="formData.updateDistanceDate"
                readonly stack-label label="Update Distance Date"/>
              <q-input v-model="formData.internetAccount"
                readonly stack-label label="Internet Account"/>
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
</style>

<script src="./js/nodeCode.js"></script>
