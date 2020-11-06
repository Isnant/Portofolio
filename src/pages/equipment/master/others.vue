<template>
  <q-page >
     <font size="1" class="text-bold" color="grey">MASTER DATA / OTHERS</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:210px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">OTHERS MASTER</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
    <div class="row" style="margin-bottom:20px; width:60%">
      <div class="col" style="margin-right: 10px;width:10%;" align="right">
        <q-input v-model="formSearch.jobstatusName"
        :label=columnName
        clearable
        @input="clearSearch"
        @keydown.enter.prevent="getContent()"
        :stack-label="true"/>
      </div>
      <div class="col" style="margin-right: 10px">
        <q-btn size="sm" round color="primary" @click="getContent(t)" style="margin-top:20px">
          <q-icon name="search"><q-tooltip>Search</q-tooltip></q-icon>
        </q-btn>
      </div>
    </div>
    <div >
      <fieldset class="fieldset_search" style="width: 100%; margin-bottom:20px">
        <legend class="legedn_search">Master Name</legend>
        <q-radio v-model="input.attributename" val="division" @input="getInitPage" label="Division" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="department" @input="getInitPage" label="Department" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="assetCategory" @input="getInitPage" label="Asset Category" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="propertyOf" @input="getInitPage" label="Property Of" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="statusReason" @input="getInitPage" label="Status Reason" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="technology" @input="getInitPage" label="Technology" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="service" @input="getInitPage" label="Service" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="capacityUnits" @input="getInitPage" label="Capacity Units" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="equipmentStatus" @input="getInitPage" label="Equipment Status" style="margin-right:10px"/>
        <q-radio v-model="input.attributename" val="assetStatus" @input="getInitPage" label="Asset Status"/>
      </fieldset>
    </div>

    <q-table
      :data="dataList"
      :columns="columns"
      :pagination.sync="pagination"
      table-header-class="text-white bg-indigo-8"
      row-key="id"
      @request="getContent"
      style="margin-bottom:100px"
      dense>
      <q-td slot="body-cell-createdDate" slot-scope="props" style="text-align: center">
        {{ props.row.createdDate | formatDateTime }}
      </q-td>
      <q-td slot="body-cell-recordStatus" align="center" slot-scope="props">
        <div v-if="props.row.recordStatus === 'A'">
          <q-icon name="done" color="primary"  style="font-size: 20px;"/>
        </div>
        <div v-else>
          <q-icon name="clear" color="negative"  style="font-size: 20px;"/>
        </div>
      </q-td>
      <q-td  align="center" slot="body-cell-action" slot-scope="props">
        <q-btn-dropdown rounded size="sm" color="indigo-10">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn color="indigo-6" round size="sm" @click="doOpenForm(props.row.attributeid)">
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
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn color="indigo-6" round size="sm" @click="doShowHistory(props)">
                  <q-icon name="fas fa-history" />
                  <q-tooltip>History</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </q-table>

     <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="orange-4" @click.native="doOpenForm(false)">
        <q-icon name="fas fa-plus" />
        <q-tooltip>Add New Data</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="masterForm" persistent @before-hide="clear()">
      <q-card class="bg-white" style="width: 400px; max-width: 100vw;">
        <q-bar class="bg-primary text-white">
          <strong>{{masterFormLabel}}</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section style="max-height: 50vh">
          <fieldset class="fieldset_search" style="width: 100%; margin-bottom:20px">
            <legend class="legedn_search">Master Name</legend>
            <div class="row">
              <div class="col">
                <q-radio v-model="input.attributename" val="division" @input="getInitPage" label="Division" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="department" @input="getInitPage" label="Department" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="assetCategory" @input="getInitPage" label="Asset Category" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="propertyOf" @input="getInitPage" label="Property Of" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="statusReason" @input="getInitPage" label="Status Reason" style="margin-right:10px"/>
              </div>
              <div class="col">
                <q-radio v-model="input.attributename" val="technology" @input="getInitPage" label="Technology" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="service" @input="getInitPage" label="Service" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="capacityUnits" @input="getInitPage" label="Capacity Units" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="equipmentStatus" @input="getInitPage" label="Equipment Status" style="margin-right:10px"/>
                <q-radio v-model="input.attributename" val="assetStatus" @input="getInitPage" label="Asset Status"/>
              </div>
            </div>
          </fieldset>
           <q-input
            v-model="input.attributedesc"
            stack-label
            :label=columnName
            ref="masterName"
            :rules="[val => !!val || 'this input is required']">
          </q-input>
          <div align="right">
            <q-btn round icon="save" size="md"  style="margin-bottom:20px" color="warning" @click="doSubmit(true)">
              <q-tooltip>Submit</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="historyForm" persistent @before-hide="clear()">
      <q-card class="bg-white" style="width: 300px; max-width: 80vw;">
        <q-bar class="bg-accent text-white">
          <strong>{{masterName}} History</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
          <q-card-section style="max-height: 50vh">
            <div align="center">
              <strong>[{{input.attributedesc}}]</strong>
              <br>
               <br>
              <font size="2" class="text-bold">Created:</font><br>
              <font size="2">[ {{input.createdBy || '-'}} ]</font><br>
              <font size="2">{{input.createdDate}}</font><br><br>
              <font size="2" class="text-bold">Modified:</font><br>
              <font size="2">[ {{input.modifiedBy || '-'}} ]</font><br>
               <font size="2">{{input.lastModified}}</font>
            </div>
          </q-card-section>
      </q-card>
    </q-dialog>
  </q-page >
</template>

<script src="./js/others.js"></script>
<style>
.legedn_search {
  border-color:  #8f1869;
  border-style: solid;
}
.fieldset_search {
  border-color:  #8f1869;
  border-style: solid;
}

  .red{
    color:red;
  }

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
