<template>
  <q-page >
     <font size="1" class="text-bold" color="grey">MASTER DATA / MASTER AREA</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:170px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER AREA</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Master :: Area</h4> -->
    <div style="max-width: 400px">
      <q-table
        :data="list"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-white bg-indigo-8"
        @request="doRefresh"
        row-key="id"
        dense>

        <q-td slot="body-cell-recordStatus" align="center" slot-scope="props">
          <div v-if="props.row.recordStatus === 'A'">
            <q-icon name="done" color="primary"  style="font-size: 20px;"/>
          </div>
          <div v-else>
            <q-icon name="clear" color="negative"  style="font-size: 20px;"/>
          </div>
        </q-td>
        <q-td slot="body-cell-action" slot-scope="cell">
          <q-btn-dropdown rounded size="sm" color="indigo-10">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn color="indigo-6" round size="sm" @click="doOpenForm(cell)">
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

      </q-table>
    </div>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm()">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="showForm" persistent>

      <q-card class="bg-white">
        <q-bar class="bg-blue-7 text-white">
          <strong>Area Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div>
            <q-input :readonly="formData.createdBy !== undefined" v-model="formData.id"
              label="Area Code"/>
            <q-input v-model="formData.area"
              label="Area Name"/>
          </div>
          <br/>
          <fieldset>
            <legend>Region List</legend>

            <q-table
              :data="listOfRegion"
              :columns="regionColumns"
              :pagination.sync="regionPagination"
              @request="doRefreshRegion"
              row-key="id"
              :hide-bottom="true"
              dense>

              <q-td slot="body-cell-id" slot-scope="cell">
                {{ cell.row.id }}
                <q-popup-edit v-model="cell.row.id" :disable="cell.row.createdDate !== undefined">
                  <q-input v-model="cell.row.id" dense />
                </q-popup-edit>
              </q-td>
              <q-td slot="body-cell-region" slot-scope="cell">
                {{ cell.row.region }}
                <q-popup-edit v-model="cell.row.region">
                  <q-input v-model="cell.row.region" dense />
                </q-popup-edit>
              </q-td>
              <q-td slot="body-cell-action" slot-scope="cell">
                <q-btn color="primary" round size="sm" @click="doToggleRegionStatus(cell)">
                  <q-icon :name="cell.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
                  <q-tooltip>{{ cell.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
                </q-btn>
              </q-td>

            </q-table>

            <div style="text-align: right; margin-top: 10px">
              <q-btn flat round color="primary" @click.native="doAddNewRegion()" size="xs">
                <q-icon name="fas fa-plus"/>
                <q-tooltip>Add New Region</q-tooltip>
              </q-btn>
            </div>
          </fieldset>
          <br/><br/>
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

<script src="./js/area-region.js"></script>
