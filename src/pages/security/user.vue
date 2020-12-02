<template>
  <div id="main" style="margin-left:10px;margin-right:10px;margin-bottom:10px;margin-top:2px">
    <font size="1" class="text-bold" color="grey">SECURITY / USER LIST</font>
     <div align="left" style="margin-bottom:30px; margin-top:20px;width:120px">
      <font size="5" class="text-bold" style="margin-bottom: 10px">USER LIST</font>
      <q-separator color="purple-10" />
      <q-separator color="purple-10" />
    </div>
     <div class="row" style="width:70%;margin-bottom:20px">
      <div class="col" style="margin-right: 10px" align="right">
        <q-input v-model="formSearch.username"
          color="indigo-8"
          label="Username"
          :stack-label="true"/>
      </div>
      <!-- <div class="col" style="margin-right: 10px">
          <q-select v-model="formSearch.branch"
            label="Branch"
            :stack-label="true"
            :options="branchList"
            @input="doBranchValue"/>
        </div>
        <div class="col" style="margin-right: 10px">
          <q-select v-model="formSearch.roles"
            label="Role"
            :stack-label="true"
            :options="rolesList"
            @input="doRolesValue"/>
        </div> -->
       <div class="col" style="margin-right: 10px">
        <q-btn size="sm" round color="indigo-8" @click="getContent(t)" style="margin-top:20px">
          <q-icon name="search"><q-tooltip>Search</q-tooltip></q-icon>
        </q-btn>
      </div>
    </div>
    <q-table
      :data="dataList"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      table-header-class="text-white bg-indigo-8"
      @request="getContent"
      style="margin-bottom:100px"
      dense>
      <q-td slot="body-cell-createdDate" slot-scope="props">
        {{ props.row.createdDate | formatDateTime }}
      </q-td>
      <q-td slot="body-cell-department" slot-scope="props">
        {{ props.row.department || '---' }}
      </q-td>
       <q-td slot="body-cell-recordStatus" align="center" slot-scope="props">
        <div v-if="props.row.recordStatus === 'A'">
          <q-icon name="done" color="primary"  style="font-size: 20px;"/>
        </div>
        <div v-else>
          <q-icon name="clear" color="negative"  style="font-size: 20px;"/>
        </div>
      </q-td>
      <q-td slot="body-cell-action" align="center" slot-scope="props">
            <div>
              <q-btn round size="sm" icon="edit" class="bg-blue-10 text-white" @click.native="showForm(props.row.username)"/>
            </div>
        </q-td>
    </q-table>

    <q-page-sticky position="top-right" :offset="[30, 30]">
      <q-btn icon="add" round color="orange-5" @click="showForm()">
        <q-tooltip>Add New</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="isFormVisible" persistent @before-hide="doBeforeFormClose()">
      <q-card class="bg-white" style="width: 400px">
        <q-bar class="bg-primary text-white">
          <strong>User Form</strong>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <q-input v-model="instance.username" stack-label label="User Name" :readonly="instance.createdBy !== undefined" class="q-pr-sm" />
          <q-input v-model="instance.department" stack-label label="Department" class="q-pr-sm"/>
          <q-input v-model="instance.fullName" stack-label label="Full Name" class="q-pr-sm"/>
          <q-input v-model="instance.email" stack-label label="Email" class="q-pr-sm"/>
          <br/>
          <q-option-group
            :options="roles"
            label="Roles"
            type="checkbox"
            v-model="instance.roles"
            @input="doRoles"
            dense
          />
          <div align="right">
            <q-btn round icon="save" size="md" color="orange-5" @click="doSave()">
              <q-tooltip>Sumbit</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

 </div>
</template>

<script src="./js/user.js"></script>
