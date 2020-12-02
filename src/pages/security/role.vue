<template>
  <div id="main" style="margin-left:10px;margin-right:10px;margin-bottom:10px;margin-top:2px">
    <font size="1" class="text-bold" color="grey">SECURITY / ROLE LIST</font>
    <div align="left" style="margin-bottom:30px; margin-top:10px;width:120px">
        <font size="5" class="text-bold" style="margin-bottom: 10px">ROLE LIST</font>
        <q-separator color="purple-10" />
        <q-separator color="purple-10" />
    </div>

    <q-table
      :data="dataList"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      @request="getContent"
      table-header-class="text-white bg-indigo-8"
      style="width: 700px;margin-bottom:100px"
      dense>
      <q-td slot="body-cell-lastModified" slot-scope="props" style="text-align: center">
        {{ props.row.lastModified | formatDateTime }}
      </q-td>
      <q-td slot="body-cell-action" align="center" slot-scope="props">
            <div>
              <q-btn round size="sm" icon="edit" class="bg-blue-10 text-white" @click.native="showForm(props.row.id)"/>
            </div>
        </q-td>
    </q-table>

    <q-page-sticky position="top-right" :offset="[30, 30]">
      <q-btn icon="add" round color="orange-5" @click="showForm()">
        <q-tooltip>Add New</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="isFormVisible" persistent @before-hide="doBeforeFormClose()">
      <q-card class="bg-white ">
        <q-bar class="bg-primary text-white">
          <strong>Role Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <q-input
            v-model="instance.name" label="Role Name" :readonly="instance.createdBy !== undefined"
          />
          <br/>
          <q-option-group
            :options="rights"
            label="Rights"
            type="checkbox"
            v-model="instance.rights"
            dense
          />
          <div align="right">
            <q-btn round icon="save" size="md" color="orange-5" @click="doSave()">
            <q-tooltip>Submit</q-tooltip>
            </q-btn>
          </div>
          </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script src="./js/role.js"></script>
