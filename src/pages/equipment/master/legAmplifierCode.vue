<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA <q-icon name="double_arrow"></q-icon> MASTER LEG AMPLIFIER</font>
    <div align="left" style="margin-bottom:30px;margin-top:10px;width:280px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER LEG AMPLIFIER</font>
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
            <div class="col-15" style="margin-right: 10px; width: 22%">
              <q-select
                rounded outlined
                v-model="searchVal.hubCode"
                stack-label
                label="Hub Name"
                class="searchform"
                color="orange-8"
                :options="hubCodeList"
                @input="getValueSelect()"
              />
            </div>

            <div class="col-15" style="margin-right: 10px; width: 22%">
              <q-input
                rounded outlined
                v-model="searchVal.amplifier"
                stack-label
                label="Amplifier Code"
                oninput="this.value = this.value.toUpperCase()"
                class="text-uppercase; searchform"
                color="orange-8"/>
            </div>

            <div class="col-15" style="margin-right: 10px; width: 22%">
              <q-select
                rounded outlined
                v-model="searchVal.technology"
                stack-label
                label="Technology"
                :options="technologyList"
                class="searchform"
                color="orange-8"/>
            </div>

            <div class="col" style="width: 5%">
              <q-btn round color="indigo-10" @click="doSearchByFilter()">
                <q-icon name="search"/>
                <q-tooltip>Search</q-tooltip>
              </q-btn>
            </div>
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
          <q-td slot="body-cell-action" slot-scope="cell">
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
        <q-bar class="bg-indigo-10 text-white">
          <strong>Amplifier Detail</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div class="row">
            <div class="col">
               <q-input v-model="formData.equipmentName"
                readonly stack-label label="Amplifier Name"/>
              <q-input v-model="formData.predecessor"
                readonly stack-label label="Predecessor"/>
              <q-input v-model="formData.nodeCode"
                readonly stack-label label="Node Code"
                type="textarea" style="max-height: 112px"/>
              <q-input v-model="formData.psCode"
                readonly stack-label label="PS Code"/>
              <q-input v-model="formData.hubCode"
                readonly stack-label label="Hub Code"/>
              <q-input v-model="formData.itCode"
                readonly stack-label label="It Code"/>
              <q-input v-model="formData.technology"
                readonly stack-label label="Technology"/>
             <q-input v-model="formData.homepassed"
                readonly stack-label label="Homepassed"/>
              <q-input v-model="formData.buildingName"
                readonly stack-label label="Building Name"/>
            </div>
            <div class="col" style="margin-left:20px">
              <q-input v-model="formData.tower"
                readonly stack-label label="Tower"/>
              <q-input v-model="formData.floor"
                readonly stack-label label="Floor"/>
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

.searchform {
  border-color:  #eebf93;
  border-style: solid;
  -webkit-border-radius: 35px;
}
</style>

<script src="./js/legAmplifierCode.js"></script>
