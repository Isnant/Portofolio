<template>
  <q-page>
    <font size="1" class="text-bold" color="grey">MASTER DATA / MASTER MANUFACTURER - BRAND</font>
    <div align="left" style="margin-bottom:30px;width:400px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">MASTER MANUFACTURER - BRAND</font>
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
    <!-- <h4 style="margin-top: 0px; margin-bottom: 20px">Master :: Manufacturer - Brand</h4> -->
    <div style="max-width: 400px">
      <q-table
        :data="dataList"
        :columns="tableColumns"
        :pagination.sync="pagination"
        table-header-class="text-indigo-10 bg-indigo-2"
        @request="getManufacturerBrandList"
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
        <q-td slot="body-cell-action" slot-scope="props"  align="center" >
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
    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-fab color="orange-7" glossy icon="keyboard_arrow_down" direction="down">
        <q-fab-action color="orange-6" text-color="white" @click.native="doOpenForm(false)" icon="add"><q-tooltip>Add</q-tooltip></q-fab-action>
        <q-fab-action color="orange-6" text-color="white" @click.native="modalUploadExcel=true" icon="backup"><q-tooltip>Upload Excel</q-tooltip></q-fab-action>
        <q-btn round color="orange-6" text-color="white" @click.native="modalDownloadExcel=true">
          <q-icon name="fas fa-file-excel"/><q-tooltip>Download Excel</q-tooltip>
        </q-btn>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showForm" persistent @before-hide="clear()">

      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Manufacturer Brand</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section>
          <div>
            <q-input
              readonly
              v-model="formData.pid"
              class="text-italic"
              label="Manufacturer Code"/>
            <q-input v-model="formData.description"
              stack-label
              label="Description"/>
          </div>
          <br/>
          <fieldset>
            <legend>Brand List</legend>

            <q-table
              :data="listOfBrand"
              :columns="brandColumns"
              :pagination.sync="subTypePagination"
              row-key="id"
              :hide-bottom="true"
              dense>

              <q-td slot="body-cell-id" slot-scope="cell">
                {{ cell.row.id }}
                <q-popup-edit v-model="cell.row.id">
                  <q-input v-model="cell.row.id" dense />
                </q-popup-edit>
              </q-td>
              <q-td slot="body-cell-brand" slot-scope="cell">
                {{ cell.row.brand }}
                <q-popup-edit v-model="cell.row.brand">
                  <q-input v-model="cell.row.brand" dense />
                </q-popup-edit>
              </q-td>
              <q-td slot="body-cell-recordStatus" slot-scope="props">
                <div v-if="props.row.recordStatus === 'A'">
                    <q-icon name="done" color="primary"  style="font-size: 20px;"/>
                </div>
                <div v-else>
                    <q-icon name="clear" color="negative"  style="font-size: 20px;"/>
                </div>
              </q-td>
              <q-td slot="body-cell-action" slot-scope="cell" align="center">
                <q-btn color="primary" round size="sm" @click="doToggleSubTypeStatus(cell)">
                  <q-icon :name="cell.row.recordStatus === 'A' ?  'fas fa-stop-circle' : 'fas fa-play-circle'" />
                  <q-tooltip>{{ cell.row.recordStatus === 'A' ? 'Deactivate' : 'Activate' }}</q-tooltip>
                </q-btn>
              </q-td>

            </q-table>

            <div style="text-align: right; margin-top: 10px">
              <q-btn flat round color="primary" @click.native="doAddNewRegion()" size="xs">
                <q-icon name="fas fa-plus"/>
                <q-tooltip>Add New Subtype</q-tooltip>
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

    <q-dialog v-model="modalUploadExcel" persistent @before-hide="doHideButton()">
      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Upload Excel File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          Download Template:
          <br>
          <a href="/statics/template/Manufacturer - Form Upload.xlsx">Manufacturer</a>
          <a style="margin-left:10px" href="/statics/template/Brand - Form Upload.xlsx">Brand</a>
        </q-card-section>
        <q-card-section>
          <!-- <q-field style="padding-bottom: 20px;"> -->
            <q-radio v-model="fileAttach.equipmentCategory" val="manufacturer" @input="getInitPage" label="Manufacturer" color="indigo-7" style="margin-right:10px"/>
            <q-radio v-model="fileAttach.equipmentCategory" val="brand" @input="getInitPage" label="Brand" color="indigo-7" style="margin-right:10px"/>
            <q-input
              type="file"
              @input="val => { doAttachFile(val[0]) }"
            />
             <div align="right" style="margin-top:20px">
              <q-btn round color="orange-6" @click="uploadManufacturerBrand()">
                <q-icon name="fas fa-file-upload"/>
                <q-tooltip>Upload</q-tooltip>
              </q-btn>
             </div>
          <!-- </q-field> -->
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalDownloadExcel" persistent @before-hide="doHideButton()">
      <q-card class="bg-white">
        <q-bar class="bg-indigo-10 text-white">
          <strong>Download Excel File</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <!-- <q-field style="padding-bottom: 20px;"> -->
            <q-radio v-model="downloadType" val="manufacturer" label="Manufacturer" color="indigo-7" style="margin-right:10px"/>
            <q-radio v-model="downloadType" val="brand" label="Brand" color="indigo-7" style="margin-right:10px"/>
            <div align="right">
              <q-btn round color="orange-9" text-color="white" @click.native="downloadExcel">
                <q-icon name="get_app"/><q-tooltip>Download</q-tooltip>
              </q-btn>
          </div>
          <!-- </q-field> -->
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

<script src="./js/manufacturer-brand.js"></script>
