<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA / HUB CODE SERVICE</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:220px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">HUB CODE SERVICE</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>

     <div class="row" style="margin-buttom:20px; width:500px">
      <div class="col-15" style="margin-right: 10px; width: 40%">
        <q-input
          v-model="searchVal.hubCode"
          stack-label
          label="Hub Code"
          color="purple-6"/>
      </div>

      <div class="col-15" style="margin-right: 10px; width: 40%">
        <q-input
        v-model="searchVal.hubCodeService"
        stack-label
        label="Hub Code Service"
        color="purple-6"/>
      </div>

      <div class="col" style="width: 5%">
        <q-btn round color="purple-10" @click="doSearchByFilter()">
          <q-icon name="search"/>
          <q-tooltip>Search</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div style="max-width: 500px; margin-top:20px">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-white bg-indigo-8"
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

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm()">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="showForm" persistent  @before-hide="clear()">
      <q-card class="bg-white" style="width: 500px">
        <q-bar class="bg-blue-7 text-white">
          <strong>Hub Code Service Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>
        <q-card-section>
          <q-input v-model="formData.id"
            readonly
            stack-label label="Id"/>
          <q-select v-model="formData.hubCode"
            stack-label
            label="Area Name"
            :options="hubCodeList"
            @input="getValue()"/>
          <q-input v-model="formData.hubCodeService"
            stack-label label="Hub Code Service"/>
          <div style="text-align: right; margin-top:20px">
            <q-btn round color="primary" @click.native="doSave()" size="small">
              <q-icon name="fas fa-save"/>
              <q-tooltip>Submit</q-tooltip>
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

<script src="./js/hubCodeService.js"></script>
