<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA / MASTER PRODUCT SERIES</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:300px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER PRODUCT SERIES</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>

    <div class="row" style="width:700px;margin:10px">
      <div class="col" style="margin-right:20px">
        <q-input
          v-model="searchVal.series"
          label="Product Series"
          stack-label>
        </q-input>
      </div>

      <div class="col">
        <q-btn round color="purple-10" @click="doSearchByFilter()">
          <q-icon name="search"/>
          <q-tooltip>Search</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div style="max-width: 1000px">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-white bg-indigo-8"
        @request="doMainEquipmentChangePage"
        row-key="id"
        dense>

        <!-- <q-td slot="body-cell-action" slot-scope="cell">
          <q-btn color="primary" round size="sm" @click="doOpenForm(cell.row.pid)" style="margin-right: 10px">
            <q-icon name="fas fa-edit" />
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn color="primary" round size="sm" @click="doToggleStatus(cell)">
            <q-icon :name="cell.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
            <q-tooltip>{{ cell.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
          </q-btn>
        </q-td> -->
        <q-td slot="body-cell-action" slot-scope="cell">
          <q-btn-dropdown rounded size="sm" color="indigo-10">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn color="indigo-6" round size="sm" @click="doOpenForm(cell.row.pid)">
                    <q-icon name="fas fa-edit" />
                    <q-tooltip>Edit</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn color="indigo-6" round size="sm" @click="doToggleStatus(cell)">
                    <q-icon :name="cell.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
                    <q-tooltip>{{ cell.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
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
      <q-btn round color="orange-4" @click.native="doOpenForm(false)">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="showForm" persistent @before-hide="clear()">

      <q-card class="bg-white" style="width: 300px">
        <q-bar class="bg-primary text-white">
          <strong>Product Series</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div>
            <q-input readonly v-show="formData.createdBy !== undefined" v-model="formData.pid"
              stack-label label="Series Code"/>
             <q-input v-model="formData.series"
              stack-label label="Series"/>
            <q-input v-model="formData.description"
              stack-label label="Description"/>
            <q-select v-model="formData.manufacturer"
                stack-label
                label="Manufacturer Code"
                :options="manufacturerCodeList"
                @input="getBrand()"/>
            <q-select v-model="formData.brand"
                stack-label
                label="Brand"
                :options="filteredBrandList"
                 @input="getBrandValue()"/>
            <q-select v-model="formData.productTypeSubType"
                stack-label
                label="Product Type"
                :options="productTypeList"
                 @input="getProductTypeValue()"/>
          </div>
          <br/>
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

<script src="./js/series.js"></script>
