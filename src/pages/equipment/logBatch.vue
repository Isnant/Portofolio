<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">EQUIPMENT/ UPLOAD LOG BATCH</font>
    <div align="left" style="margin-bottom:30px;width:230px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">UPLOAD LOG BATCH</font>
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
              <div class="row" style="width:700px;margin:10px">
                <div class="col" style="margin-right:20px">
                  <q-input
                    v-model="searchVal.id"
                    color="indigo-9"
                    label="Batch"
                    stack-label>
                  </q-input>
                </div>
                <div class="col" style="margin-right:20px">
                  <q-input
                    v-model="searchVal.fileName"
                    color="indigo-9"
                    label="File Name"
                    stack-label>
                  </q-input>
                </div>
                <div class="col" style="margin-right:20px">
                  <q-select
                    v-model="searchVal.equipmentCategory"
                    color="indigo-9"
                    label="Equipment Category"
                    :options="equipmentCategoryList"
                    stack-label>
                  </q-select>
                </div>

                <div class="col">
                  <q-btn round color="indigo-10" @click="doSearchByFilter()">
                    <q-icon name="search"/>
                    <q-tooltip>Search</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </fieldset>
          </div>
        </q-expansion-item>

        <div style="max-width: 1200px">
          <q-table
            :data="dataList"
            :columns="tableColumns"
            :pagination.sync="pagination"
            table-header-class="text-indigo-10 bg-indigo-2"
            @request="doMainEquipmentChangePage"
            row-key="id"
            dense>

            <q-td slot="body-cell-createdDate" slot-scope="props">
              {{ props.row.createdDate | formatDateTime}}
            </q-td>
            <q-td slot="body-cell-fileName" slot-scope="props">
              <a @click="downloadExcel(props)" href="#">{{props.row.fileName}}</a>
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

<script src="./js/logBatch.js"></script>
