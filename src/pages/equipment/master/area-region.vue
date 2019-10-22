<template>
  <q-page padding>
    <h4 style="margin-top: 0px; margin-bottom: 20px">Master :: Area</h4>
    <div style="max-width: 400px">
      <q-table
        :data="list"
        :columns="tableColumns"
        :pagination.sync="pagination"
        @request="doRefresh"
        row-key="id"
        dense>

        <q-td slot="body-cell-action" slot-scope="cell">
          <q-btn color="primary" round size="sm" @click="doOpenForm(cell)" style="margin-right: 10px">
            <q-icon name="fas fa-edit" />
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn color="primary" round size="sm" @click="doToggleStatus(cell)">
            <q-icon :name="cell.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
            <q-tooltip>{{ cell.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
          </q-btn>
        </q-td>

      </q-table>
    </div>

    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="primary" @click.native="doOpenForm()">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Record</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="showForm" persistent>

      <q-card class="bg-white">
        <q-bar class="bg-primary text-white">
          <strong>Area Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div>
            <q-input :readonly="formData.createdBy !== undefined" v-model="formData.id"
              label="Area Id"/>
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
