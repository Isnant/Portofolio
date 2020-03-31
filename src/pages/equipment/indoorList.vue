<template>
  <q-page padding>
    <h4 style="margin-top: 0px; margin-bottom: 20px">Indoor Equipment</h4>
    <!-- <GChart
        :settings="{ packages: ['orgchart'] }"
        type="OrgChart"
        :data="chartDataX"
        :options="chartOptionsX"
    /> -->
    <fieldset style="width: 100%">
      <legend>Search</legend>

      <div class="row">

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.productType"
          label="Product Type"
          :options="productTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.subType"
          label="Product Sub Type"
          :options="subTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-input
          v-model="searchVal.productSeries"
          label="Product Series"
          stack-label
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.hubCode"
          label="Hub Code"
          :options="hubCodeList"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.bdfCode"
          label="BDF Code"
          :options="bdfCodeList"
          />
        </div>

        <div class="col-1">
          <q-btn round color="primary" @click="doMainEquipmentRefreshList()">
            <q-icon name="search"/>
            <q-tooltip>Search</q-tooltip>
          </q-btn>
        </div>

      </div>
    </fieldset>

    <q-table
      :data="listOfEquipment"
      :columns="equipmentListColumns"
      :pagination.sync="equipmentPagination"
      :rows-per-page-options="[10, 20, 50]"
      @request="doMainEquipmentChangePage"
      row-key="id"
      dense>

      <q-td slot="body-cell-action" slot-scope="cell">
        <q-btn color="primary" round size="sm" @click="doMainOpenEquipmentForm(cell)">
          <q-icon name="fas fa-edit" />
          <q-tooltip>Edit</q-tooltip>
        </q-btn>
      </q-td>

    </q-table>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="primary" @click.native="modalUpload=true">
        <q-icon name="backup" />
        <q-tooltip>Upload</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="modalUpload" persistent>
      <q-card class="bg-white">
        <q-bar class="bg-primary text-white">
          <strong>Upload Equipment File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <a href="/statics/template/IndoorTemplate.xlsx">Download Template</a>
        </q-card-section>
        <q-card-section>
          <q-field style="padding-bottom: 20px;">
            <input
              id="excelFile"
              type="file"
              ref="excelFile"
            />
            <q-btn round color="primary" @click="doUploadFile()">
              <q-icon name="fas fa-file-upload"/>
            </q-btn>
          </q-field>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<style>

.preview-tree-card {
  width: 100%;
  max-width: 500px;
}

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

<script src="./js/indoorList.js"></script>
