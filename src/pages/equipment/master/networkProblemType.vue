<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">EQUIPMENT/ PROBLEM TYPE</font>
    <div align="left" style="margin-bottom:30px;width:180px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">PROBLEM TYPE</font>
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
    <div style="max-width: 400px">
      <q-card>
        <q-card-section>
          <q-table
            :data="dataList"
            :columns="tableColumns"
            :pagination.sync="paginationNotes"
            table-header-class="text-indigo-10 bg-indigo-2"
            row-key="id"
            dense>
            <q-td slot="body-cell-historyDate" slot-scope="props">
              {{ props.row.historyDate | formatDate}}
            </q-td>
            <q-td slot="body-cell-createdDate" slot-scope="props">
              {{ props.row.createdDate | formatDateTime}}
            </q-td>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
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

<script src="./js/networkProblemType.js"></script>
