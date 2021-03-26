<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">EQUIPMENT/ FIELD HIERARCHY</font>
     <div align="left" style="margin-bottom:30px; width:200px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">FIELD HIERARCHY</font>
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
          <div class="bg-orange-1" style="padding: 10px; width:100%">
            <div class="row" style="margin-bottom:20px">
              <div class="col" style="margin-right:10px">
                <q-input
                  v-model="searchVal.equipmentId"
                  stack-label
                  rounded outlined
                  color="orange-8"
                  label="Equipment Id">
                </q-input>
              </div>
              <div class="col" style="margin-right:10px">
                <q-input
                  v-model="searchVal.equipmentName"
                  stack-label
                  rounded outlined
                  color="orange-8"
                  label="Equipment Name">
                </q-input>
              </div>
              <div class="col" style="margin-right: 10px;">
                <q-input
                  v-model="searchVal.equipmentParent"
                  stack-label
                  rounded outlined
                  color="orange-8"
                  label="Equipment Parent">
                </q-input>
              </div>
              <div class="col" style="margin-right: 10px;">
                <q-select
                  v-model="searchVal.productType"
                  label="Product Type"
                  rounded outlined
                  stack-label
                  color="orange-8"
                  :options="productTypeListSearch"
                  @input="getDropdownValue('productTypeSearch')"
                />
            </div>
              <div class="col">
                <q-btn round color="indigo-10" @click="doSearchByFilter()">
                  <q-icon name="search"/>
                  <q-tooltip>Search</q-tooltip>
                </q-btn>
              </div>
              <div class="col-20" style="width: 8%" align="left">
                <q-select
                  v-model="searchVal.status"
                  stack-label
                  :options="statusList"
                  @input="doSearchByFilter()"
                  label="Status">
                </q-select>
              </div>
            </div>
          </div>
        </q-expansion-item>

        <div>
          <q-table
            :data="dataList"
            :columns="tableColumns"
            :pagination.sync="pagination"
            table-header-class="text-indigo-10 bg-indigo-2"
            @request="doMainEquipmentChangePage"
            row-key="id"
            dense>
            <q-td slot="body-cell-historyDate" slot-scope="props">
              {{ props.row.historyDate | formatDate}}
            </q-td>
            <q-td slot="body-cell-action" slot-scope="props">
              <div align="center">
                <q-btn-dropdown rounded size="sm" color="indigo-10">
                  <q-list>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-btn color="indigo-6" round size="sm" @click="doOpenForm(props.row)">
                          <q-icon name="fas fa-edit" />
                          <q-tooltip>Show Child</q-tooltip>
                        </q-btn>
                      </q-item-section>
                    </q-item>
                    <!-- <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-btn color="indigo-6" round size="sm" @click="doToggleStatus(props)">
                          <q-icon :name="props.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
                          <q-tooltip>{{ props.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
                        </q-btn>
                      </q-item-section>
                    </q-item> -->
                  </q-list>
                </q-btn-dropdown>
              </div>
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

    <q-dialog v-model="showForm" persistent>

      <q-card class="bg-white">
        <q-bar class="bg-blue-7 text-white">
          <strong>Detail Hierarchy</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card>
          <q-card-section>
            <q-tree
              :nodes="sourcePreview"
              node-key="label"
              ref="sourcePreview"
              default-expand-all
            >
            <template v-slot:default-header="prop">
              <span class="text-weight-bold text-green">{{ prop.node.label }}</span>
            </template>
            </q-tree>
          </q-card-section>
        </q-card>
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

<script src="./js/hierarchy.js"></script>
