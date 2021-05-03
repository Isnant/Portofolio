<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">EQUIPMENT <q-icon name="double_arrow"></q-icon> UPLOAD LOG BATCH</font>
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
            <div class="col" style="margin-right:10px">
              <q-input
                rounded outlined
                v-model="searchVal.id"
                class="searchform"
                color="orange-8"
                label="Batch"
                stack-label>
              </q-input>
            </div>
            <div class="col" style="margin-right:10px">
              <q-input
                rounded outlined
                v-model="searchVal.fileName"
                class="searchform"
                color="orange-8"
                label="File Name"
                stack-label>
              </q-input>
            </div>
            <div class="col" style="margin-right:10px">
              <q-select
                rounded outlined
                v-model="searchVal.equipmentCategory"
                class="searchform"
                color="orange-8"
                label="Equipment Category"
                :options="equipmentCategoryList"
                stack-label>
              </q-select>
            </div>
            <div class="col">
              <q-input
                rounded outlined
                v-model="searchVal.startDate"
                class="searchform"
                readonly
                stack-label
                label="Upload Date">
                <template v-slot:prepend>
                  <q-icon name="event" style="margin-top:12px">
                    <q-popup-proxy ref="qStartDate" transition-show="scale" transition-hide="scale">
                      <q-date v-model="searchVal.startDate" mask="YYYY/MM/DD" @input="doStartDate()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-25; text-bold" style="margin-right: 10px; margin-top:25px;margin-left: 10px">
              s/d
            </div>
            <div class="col" style="margin-right: 10px">
              <q-input
                rounded outlined
                v-model="searchVal.endDate"
                class="searchform"
                readonly stack-label
                label="">
                <template v-slot:prepend>
                  <q-icon name="event" style="margin-top:12px">
                    <q-popup-proxy ref="qEndDate" transition-show="scale" transition-hide="scale">
                      <q-date v-model="searchVal.endDate"
                      mask="YYYY/MM/DD"
                      @input="() => $refs.qEndDate.hide()"
                      :options="optionsEndDate" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col">
              <q-btn round color="indigo-10" @click="doSearchByFilter()">
                <q-icon name="search"/>
                <q-tooltip>Search</q-tooltip>
              </q-btn>
            </div>
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
    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-6" text-color="white" @click.native="downloadExcelButtom"><q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip></q-btn>
    </q-page-sticky>
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

<script src="./js/logBatch.js"></script>
