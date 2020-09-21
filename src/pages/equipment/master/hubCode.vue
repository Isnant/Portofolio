<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA / MASTER HUB CODE</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:220px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER HUB CODE</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Master :: Building</h4> -->
    <div style="max-width: 1200px">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-white bg-indigo-8"
        @request="getBuildingList"
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
          <strong>Hub Code Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input v-model="formData.hubCode"
                stack-label
                :disable="vDisable"
                label="Hub Code"/>
              <q-input v-model="formData.hubName"
                stack-label label="Hub Name"/>
              <q-input v-model="formData.hubCodeIt"
                stack-label label="Hub Code It"/>
              <q-select v-model="formData.areaName"
                stack-label
                label="Area Name"
                :options="areaList"
                @input="getRegion()"/>
              <q-select v-model="formData.regionName"
                stack-label
                label="Region"
                @input="doRegion()"
                :options="filteredRegionList"/>
              <q-input v-model="formData.city"
                stack-label label="City"/>
            </div>
            <div class="col" style="margin-left:20px">
              <q-input style="max-height: 112px"
                v-model="formData.address"
                type="textarea"
                :max-height="10"
                stack-label label="Address"
              />
              <q-input v-model="formData.postalCode"
                stack-label label="Postal Code"/>
              <q-input v-model="formData.phone"
                stack-label label="Phone"/>
              <q-input v-model="formData.remarks"
                style="max-height: 112px"
                type="textarea"
                stack-label label="Remarks"/>
            </div>
          </div>
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

<script src="./js/hubCode.js"></script>
