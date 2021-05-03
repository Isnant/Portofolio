<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA <q-icon name="double_arrow"></q-icon> HUB COD SERVICEE</font>
    <div align="left" style="margin-bottom:30px;margin-top:10px;width:220px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">HUB CODE SERVICE</font>
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
    <q-card style="max-width: 800px">
      <q-card-section>
        <q-expansion-item
          label="SEARCH"
          header-class="bg-indigo-2 text-indigo-10"
          style="margin-bottom:10px"
          icon="search">
          <div class="row bg-orange-1" style="padding: 10px; width:100%" align="left">
            <div class="col-15" style="margin-right: 10px; width: 30%">
              <!-- <q-input
                rounded outlined
                v-model="searchVal.hubName"
                stack-label
                label="Hub Name"
                color="orange-8"/> -->
                <q-select
                stack-label
                rounded outlined
                v-model="searchVal.hubName"
                label="Hub Name"
                class="searchform"
                :options="hubCodeListFiltered"
                @filter="doHubNameFilter"
                @input="getSelectValue('hubNameSearch')"
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

            <div class="col-15" style="margin-right: 10px; width: 30%">
              <q-input
                rounded outlined
                v-model="searchVal.hubCode"
                stack-label
                label="Hub Code"
                class="searchform"
                color="orange-8"/>
            </div>

            <div class="col-15" style="margin-right: 10px; width: 30%">
              <q-select
                rounded outlined
                stack-label
                color="orange-8"
                v-model="searchVal.service"
                class="searchform"
                label="Service"
                :options="serviceSearchList"
              />
            </div>

            <div class="col" style="width: 5%">
              <q-btn round color="indigo-10" @click="doSearchByFilter()">
                <q-icon name="search"/>
                <q-tooltip>Search</q-tooltip>
              </q-btn>
            </div>

          </div>
        </q-expansion-item>

        <div style="margin-top:20px">
          <q-table
            :data="dataList"
            :columns="tableColumns"
            :pagination.sync="pagination"
            table-header-class="text-indigo-10 bg-indigo-2"
            @request="doMainEquipmentChangePage"
            row-key="id"
            dense>

            <q-td :style="{width: '400px', whiteSpace: 'normal'}" slot="body-cell-address" slot-scope="props">
              {{ props.row.address }}
            </q-td>
            <q-td slot="body-cell-action" slot-scope="props">
              <q-btn-dropdown rounded size="sm" color="indigo-10">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-btn color="indigo-6" round size="sm" @click="doOpenForm(props)">
                        <q-icon name="fas fa-edit" />
                        <q-tooltip>Edit</q-tooltip>
                      </q-btn>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-btn color="indigo-6" round size="sm" @click="doToggleStatus(props)">
                        <q-icon :name="props.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
                        <q-tooltip>{{ props.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
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
      </q-card-section>
    </q-card>
<!--
    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm()">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky> -->
    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-fab color="orange-7" glossy icon="keyboard_arrow_down" direction="down">
        <q-fab-action color="orange-6" text-color="white" @click.native="doOpenForm()" icon="add"><q-tooltip>Add</q-tooltip></q-fab-action>
        <q-fab-action color="orange-6" text-color="white" @click.native="modalUploadExcel=true" icon="backup"><q-tooltip>Upload Excel</q-tooltip></q-fab-action>
        <q-btn round color="orange-6" text-color="white" @click.native="downloadExcel">
          <q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip>
        </q-btn>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showForm" persistent  @before-hide="clear()">
      <q-card class="bg-white" style="width: 500px">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Hub Code Service Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>
        <q-card-section>
          <q-input
            v-model="formData.id"
            class="text-italic"
            readonly
            stack-label label="Id"/>
          <q-input v-model="formData.hubCode"
            stack-label
            label="Hub Code"/>
          <q-select
            stack-label
            v-model="formData.hubName"
            label="Hub Name"
            :options="hubCodeList"
            @input="getSelectValue('hubName')"
          />
          <q-input v-model="formData.ftax"
            stack-label label="Ftax"/>
          <q-select v-model="formData.service"
            :options="serviceList"
            stack-label label="Service"
            @input="getSelectValue('service')"/>
          <div style="text-align: right; margin-top:20px">
            <q-btn round color="primary" @click.native="doSave()" size="small">
              <q-icon name="fas fa-save"/>
              <q-tooltip>Submit</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
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
          <a href="/statics/template/Hub Code Service - Form Upload.xlsx">Download Template
            <q-tooltip>Hub Code Service - Form Upload.xlsx</q-tooltip>
          </a>
        </q-card-section>
        <q-card-section>
          <!-- <q-field style="padding-bottom: 20px;"> -->
            <q-input
              type="file"
              @input="val => { doAttachFile(val[0]) }"
            />
             <div align="right" style="margin-top:20px">
              <q-btn round color="orange-6" @click="uploadField()">
                <q-icon name="fas fa-file-upload"/>
                <q-tooltip>Upload</q-tooltip>
              </q-btn>
             </div>
          <!-- </q-field> -->
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

<script src="./js/hubCodeService.js"></script>
