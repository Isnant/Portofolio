<template>
  <q-page padding>
    <fieldset style="width: 100%">
      <legend>Search</legend>

      <div class="row">

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.assetCategory"
          stack-label="Asset Category"
          :options="assetCategoryList"
          @input="getProductType(searchVal.assetCategory)"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.productType"
          stack-label="Product Type"
          :options="productTypeList"
          @input="getSubType(searchVal.productType)"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-select
          v-model="searchVal.subType"
          stack-label="Product Sub Type"
          :options="subTypeList"
          />
        </div>

        <div class="col-2" style="margin-right: 10px">
          <q-input
          v-model="searchVal.productSeries"
          stack-label="Product Series"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.hubCode"
          stack-label="Hub Code"
          :options="hubCodeList"
          />
        </div>

        <div class="col-1" style="margin-right: 10px">
          <q-select
          v-model="searchVal.bdfCode"
          stack-label="BDF Code"
          :options="bdfCodeList"
          />
        </div>

        <div class="col-1">
          <q-btn round color="primary" @click="getContentByFilter(searchVal)">
            <q-icon name="search"/>
          </q-btn>
        </div>

      </div>
    </fieldset>

    <q-table
      :data="dataList"
      :columns="columns"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      :filter="filter"
      row-key="id"
      dense>

      <template slot="top-left">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          class="col-6"
        />
      </template>

    </q-table>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="secondary" @click.native="modalUpload=true">
        <q-icon name="backup" />
      </q-btn>
    </q-page-sticky>

    <q-modal v-model="modalUpload">
      <div style="padding: 20px">
        <strong>Upload Equipment File</strong>
        <div class="column" style="padding-top: 30px">
          <q-field style="padding: 0px 0px 20px 0px">
            <q-option-group
                type="radio"
                v-model="uploadCategory"
                :options="[
                  { label: 'Field Equipment', value: 'field' },
                  { label: 'Hub Equipment', value: 'hub' },
                ]"
            />
          </q-field>
          <q-field style="padding-bottom: 20px">
            <q-uploader ref="uploader" url="" :upload-factory="uploadFile" />
          </q-field>
        </div>
      </div>
    </q-modal>

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

<script src="./js/list.js"></script>
