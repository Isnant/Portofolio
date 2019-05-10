<template>
  <div id="main" class="layout-padding" style="text-align:center;">
    <div id="byte_content" hidden="true"></div>
    <q-table
      :data="dataList"
      :columns="column"
      :filter="filters"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      row-key="id"
      color="primary"
      dense>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox color="primary" v-model="props.selected"/>
          </q-td>
          <q-td key="assetId" :props="props">{{props.row.assetId}}</q-td>
          <q-td key="assetCategory" :props="props">{{props.row.assetCategory}}</q-td>
          <q-td key="assetName" :props="props">{{props.row.assetName}}</q-td>
          <q-td key="description" :props="props">{{props.row.description}}</q-td>
          <q-td key="productType" :props="props">{{props.row.productType}}</q-td>
          <q-td key="subType" :props="props">{{props.row.subType}}</q-td>
          <q-td key="productSeries" :props="props">{{props.row.productSeries}}</q-td>
          <q-td key="brand" :props="props">{{props.row.brand}}</q-td>
          <q-td key="hubCode" :props="props">{{props.row.hubCode}}</q-td>
          <q-td key="bdfCode" :props="props">{{props.row.bdfCode}}</q-td>
          <q-td key="assetStatus" :props="props">{{props.row.assetStatus}}</q-td>
        </q-tr>
      </template>
      <template slot="top-left">
        <q-search
          color="primary"
          v-model="filters"
          class="col-6"
        />
      </template>
    </q-table>
    <q-page-sticky position="top-right" :offset="[15, 30]">
      <q-btn round color="green-9" :hidden="buttonHide" @click="Detail()"
        style="margin: 10px 0 0 0">
        <q-icon name="subject" />
      </q-btn>
      <br>
      <q-btn round color="primary" :hidden="buttonHides"
        @click="ActionInfo('active')" style="margin: 10px 0 0 0">
        <q-icon name="done" />
      </q-btn>
      <br>
      <q-btn round color="red-10" :hidden="buttonHides"
        @click="ActionInfo('delete')" style="margin: 10px 0 0 0">
        <q-icon name="delete" />
      </q-btn>
    </q-page-sticky>
    <q-modal v-model="ModalDetail" minimized ref="modalRef"
      :content-css="{padding: '50px', minWidth: '50vw'}">
      <div style="width: 100%; margin: 0 0 30px 0">
        <q-chip square color="blue">
          <font size=4>Detail Asset</font>
        </q-chip>
        <q-card-separator/>
      </div>
      <q-input
        v-model="add.assetId" stack-label="Asset Id" type="textarea" readonly></q-input>
      <q-input
        v-model="add.assetName" stack-label="Asset Name" type="textarea" readonly></q-input>
      <q-input
        v-model="add.assetCategory" stack-label="Asset Category" type="textarea" readonly></q-input>
      <q-input
        v-model="add.description" stack-label="Description" type="textarea" readonly></q-input>
      <q-input
        v-model="add.productType" stack-label="Product Type" type="textarea" readonly></q-input>
      <q-input
        v-model="add.subType" stack-label="Sub Type" type="textarea" readonly></q-input>
      <q-input
        v-model="add.productSeries" stack-label="Product Series" type="textarea" readonly></q-input>
      <q-input
        v-model="add.manufacturer" stack-label="Manufacturer" type="textarea" readonly></q-input>
      <q-input
        v-model="add.brand" stack-label="Brand" type="textarea" readonly></q-input>
      <q-input
        v-model="add.serialNumberDevice" stack-label="Serial Number Device"
        type="textarea" readonly></q-input>
      <q-input
        v-model="add.serialNumberInternal" stack-label="Serial Number Internal"
        type="textarea" readonly></q-input>
      <q-input
        v-model="add.quantity" stack-label="Quantity" type="textarea" readonly></q-input>
      <q-input
        v-model="add.rack" stack-label="Rack" type="textarea" readonly></q-input>
      <q-input
        v-model="add.chassis" stack-label="Chassis" type="textarea" readonly></q-input>
      <q-input
        v-model="add.slot" stack-label="Slot" type="textarea" readonly></q-input>
      <q-input
        v-model="add.hubCode" stack-label="Hub Code" type="textarea" readonly></q-input>
      <q-input
        v-model="add.hubAddress" stack-label="Hub Address" type="textarea" readonly></q-input>
      <q-input
        v-model="add.bdfCode" stack-label="BDF Code" type="textarea" readonly></q-input>
      <q-input
        v-model="add.service" stack-label="Service" type="textarea" readonly></q-input>
      <q-input
        v-model="add.capacity" stack-label="Capacity" type="textarea" readonly></q-input>
      <q-input
        v-model="add.capacityUnits" stack-label="Capacity Units" type="textarea" readonly></q-input>
      <q-datetime v-model="add.installationDate"
        stack-label="Installation Date" type="date" readonly/>
      <q-input
        v-model="add.division" stack-label="Division" type="textarea" readonly></q-input>
      <q-input
        v-model="add.departement" stack-label="Departement" type="textarea" readonly></q-input>
      <q-input
        v-model="add.propertyOf" stack-label="Property Of" type="textarea" readonly></q-input>
      <q-input
        v-model="add.assetStatus" stack-label="Asset Status" type="textarea" readonly></q-input>
      <q-input
        v-model="add.remarks" stack-label="Remarks" type="textarea" readonly></q-input>
      <q-input
        v-model="add.prodecesor" stack-label="Prodecesor" type="textarea" readonly></q-input>
      <q-input
        v-model="add.buildingName" stack-label="Building Name" type="textarea" readonly></q-input>
      <q-input
        v-model="add.tower" stack-label="Tower" type="textarea" readonly></q-input>
      <q-input
        v-model="add.floor" stack-label="Floor" type="textarea" readonly></q-input>
      <q-input
        v-model="add.complexName" stack-label="Complex Name" type="textarea" readonly></q-input>
      <q-input
        v-model="add.streetName" stack-label="Street Name" type="textarea" readonly></q-input>
      <q-input
        v-model="add.streetNumber" stack-label="Street Number" type="textarea" readonly></q-input>
      <q-input
        v-model="add.kelurahan" stack-label="Kelurahan" type="textarea" readonly></q-input>
      <q-input
        v-model="add.postalCode" stack-label="Postal Code" type="textarea" readonly></q-input>
      <q-input
        v-model="add.direction" stack-label="Direction" type="textarea" readonly></q-input>
      <q-input
        v-model="add.cascades" stack-label="Cascades" type="textarea" readonly></q-input>
      <q-input
        v-model="add.amplifierNotes" stack-label="Amplifier Notes" type="textarea"
        readonly></q-input>
      <q-datetime v-model="add.memoActiveDate"
        stack-label="Memo Active Date" type="date" readonly />
      <q-datetime v-model="add.modifiedDate"
        stack-label="Modified Date" type="date" readonly />
      <q-input
        v-model="add.electricalStatus" stack-label="Electrical Status" type="textarea"></q-input>
      <q-btn color="negative" icon="close" @click="cancel()"
        label="cancel" style="margin: 15px 0 0 0"/>
    </q-modal>
    <q-modal v-model="ModalDelete" minimized ref="modalRef"
      :content-css="{padding: '50px', minWidth: '50vw'}">
      <div style="width: 100%; margin: 0 0 30px 0">
        <q-chip square color="blue">
          <font size=4>Remove Asset</font>
        </q-chip>
        <q-card-separator/>
      </div>
      <font size =5>{{question}}</font>
      <q-table style="margin: 10px 0 10px 0"
        :data="selected"
        :columns="deletecolumn"
        row-key="name"
        dense>
        <q-tr slot="body" slot-scope="props">
          <q-td key="assetId" :props="props">{{ props.row.assetId}}</q-td>
          <q-td key="assetCategory" :props="props">{{ props.row.assetCategory}}</q-td>
          <q-td key="assetName" :props="props">{{ props.row.assetName }}</q-td>
          <q-td key="description" :props="props">{{ props.row.description }}</q-td>
          <q-td key="productType" :props="props">{{props.row.productType}}</q-td>
        </q-tr>
      </q-table>
      <div style="width: 100%;">
        <q-btn color="lime-10" label="remove" :hidden="btnDelete" icon="delete"
          @click="Delete()" style="margin: 15px 0 10px 0"/>
        <q-btn color="primary" label="active" :hidden="btnActive" icon="done"
          @click="Active()" style="margin: 15px 0 10px 10px"/>
        <q-btn color="negative" label="cancel" icon="clear" @click="Cancel()"
          style="margin: 15px 0 10px 10px"/>
      </div>
    </q-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      add: '',
      filters: '',
      selected: [],
      ModalDelete: false,
      ModalDetail: false,
      btnDelete: true,
      btnActive: true,
      buttonHide: true,
      buttonHides: true,
      question: '',
      dataList: [],
      mode: '',
      pagination: {
        rowsPerPage: 25,
      },
      deletecolumn: [
        {
          name: 'assetId',
          label: 'Asset Id',
          field: 'assetId',
          align: 'left',
        },
        {
          name: 'assetCategory',
          label: 'Asset Category',
          field: 'assetCategory',
          align: 'left',
        },
        {
          name: 'assetName',
          label: 'Asset Name',
          field: 'assetName',
          align: 'left',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          sortable: true,
        },
      ],
      column: [
        {
          name: 'assetId',
          label: 'Asset Id',
          field: 'assetId',
          align: 'left',
          sortable: true,
        },
        {
          name: 'assetCategory',
          label: 'Asset Category',
          field: 'assetCategory',
          align: 'left',
          sortable: true,
        },
        {
          name: 'assetName',
          label: 'Asset Name',
          field: 'assetName',
          align: 'left',
          sortable: true,
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true,
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          sortable: true,
        },
        {
          name: 'subType',
          label: 'Product Sub Type',
          field: 'subType',
          align: 'left',
          sortable: true,
        },
        {
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          sortable: true,
        },
        {
          name: 'brand',
          label: 'Brand',
          field: 'brand',
          align: 'left',
          sortable: true,
        },
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          sortable: true,
        },
        {
          name: 'bdfCode',
          label: 'BDF Code',
          field: 'bdfCode',
          align: 'left',
          sortable: true,
        },
        {
          name: 'assetStatus',
          label: 'Asset Status',
          field: 'assetStatus',
          align: 'left',
          sortable: true,
        },
      ],
    };
  },
  watch: {
    selected: () => {
      if (this.selected.length === 0) {
        this.buttonHide = true;
        this.buttonHides = true;
      } else if (this.selected.length === 1) {
        this.buttonHide = false;
        this.buttonHides = false;
      } else {
        this.buttonHide = true;
        this.buttonHides = false;
      }
    },
    ModalDetail: (ModalDetail) => {
      if (ModalDetail === false) {
        this.Reset();
      }
    },
    ModalDelete: (ModalDelete) => {
      if (ModalDelete === false) {
        this.Reset();
      }
    },
  },
  beforeMount() {
    this.getContent();
  },

  methods: {
    getContent() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}getListInactiveAsset/`, {
      })
        .then((response) => {
          this.dataList = response.data;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    Reset() {
      this.btnActive = true;
      this.btnDelete = true;
      this.ModalDelete = false;
      this.ModalDetail = false;
      this.modalUpload = false;
      this.ModalAdd = true;
      this.buttonHide = true;
      this.buttonAdd = true;
      this.selected = [];
    },
    ActionInfo(mode) {
      if (this.selected.length === 0) {
        if (mode === 'active') {
          this.$q.notify({
            icon: 'error',
            position: 'bottom-right',
            message: 'select data before activation',
            color: 'negative',
          });
        } else {
          this.$q.notify({
            icon: 'error',
            position: 'bottom-right',
            message: 'select data before delete',
            color: 'negative',
          });
        }
      } else {
        if (mode === 'active') {
          this.btnActive = false;
          this.question = 'do yo want to activate this data ?';
        } else {
          this.btnDelete = false;
          this.question = 'do yo want to permanent delete this data ?';
        }
        this.ModalDelete = true;
      }
    },
    Cancel() {
      this.Reset();
      this.getContent();
    },
    Delete() {
      this.$axios.post(`${process.env.urlPrefix}Delete`, this.selected)
        .then((response) => {
          this.$q.loading.hide();
          if (response.data.status === 'succes') {
            this.ModalDelete = false;
            this.selected = [];
            this.Reset();
            this.getContent();
            this.$q.notify({
              icon: 'done',
              position: 'bottom-right',
              message: response.data.message,
              color: 'positive',
            });
          } else {
            this.ModalDelete = false;
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative',
            });
          }
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    Detail() {
      this.ModalDetail = true;
      this.add = this.selected['0'];
    },
    Active() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}Active`, this.selected)
        .then((response) => {
          this.$q.loading.hide();
          if (response.data.status === 'succes') {
            this.ModalDelete = false;
            this.Reset();
            this.getContent();
            this.$q.notify({
              icon: 'done',
              position: 'bottom-right',
              message: response.data.message,
              color: 'positive',
            });
          } else {
            this.ModalDelete = false;
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative',
            });
          }
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
  },
};
</script>
