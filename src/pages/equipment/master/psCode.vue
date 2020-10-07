<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA / POWER SUPPLY CODE</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:250px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">POWER SUPPLY CODE</font>
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
        <q-td slot="body-cell-action" slot-scope="props">
          <q-btn-dropdown rounded size="sm" color="indigo-10">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn color="indigo-6" round size="sm" @click="doOpenForm(props.row.pid)">
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
