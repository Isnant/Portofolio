<template>
  <div id="main" class="layout-padding" style="text-align:center;">
    <q-table
      :data="dataList"
      :columns="column"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      row-key="id"
      dense>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox color="primary" v-model="props.selected" @input="activeButton()"/>
          </q-td>
          <q-td key="assetName" :props="props"><router-link to="/Node">
            <span v-on:click="DetailNode(props.row)">
                {{ props.row.assetName}}
            </span></router-link></q-td>
          <q-td key="hubCode" :props="props">{{props.row.hubCode}}</q-td>
          <q-td key="description" :props="props">{{props.row.description}}</q-td>
          <q-td key="assetId" :props="props">{{props.row.assetId}}</q-td>
          <q-td key="assetCategory" :props="props">{{props.row.assetCategory}}</q-td>
          <q-td key="productType" :props="props">{{props.row.productType}}</q-td>
          <q-td key="productSeries" :props="props">{{props.row.productSeries}}</q-td>
          <q-td key="assetStatus" :props="props">{{props.row.assetStatus}}</q-td>
        </q-tr>
      </template>
    </q-table>
    <q-modal v-model="modalMigration" minimized ref="modalRef"
      :content-css="{padding: '50px', minWidth: '50vw'}">
      <div style="width: 100%; margin: 0 0 30px 0">
        <q-chip square color="blue">
          <font size=4>Migration</font>
        </q-chip>
        <q-card-separator/>
      </div>
      <q-select
        v-model="nodeDetail.migrationType"
        stack-label="Migration Type"
        :options="migrationList"/>
      <q-input v-model="nodeDetail.activityDate"
        stack-label="Activity Date (MM/DD/YYYY)" type="date"/>
      <q-input
        v-model="nodeDetail.sourceHub"
        readonly="true"
        stack-label="Source Hub Code"
        type="textarea"/>
      <q-input
        v-model="nodeDetail.sourceNode"
        readonly="true"
        stack-label="Source Node Code"
        type="textarea"/>
      <q-select
        v-model="nodeDetail.destinationHub"
        stack-label="Hub Code"
        :options="hubCodeList"
        />
      <q-input
        v-model="nodeDetail.destinationNode"
        stack-label="New Node Code"
        type="textarea"/>
      <q-btn color="primary" icon="save" label="Next"
        @click="getDetailNode()" style="margin: 15px 10px 0 0"/>
      <q-btn color="negative" icon="close" label="cancel"
        @click="cancel()" style="margin: 15px 0 0 0"/>
    </q-modal>
    <q-modal v-model="modalDetailNode" minimized ref="modalRef"
      :content-css="{padding: '50px', minWidth: '50vw'}">
      <div style="text-align:center; width: 100%; margin: 0 0 30px 0">
        <table>
          <tr>
              <td align="left" width="25%"><font size=1><strong>Activity Type</strong></font></td>
              <td align="left" width="75%"><font size=1>{{nodeDetail.migrationType}}</font></td>
          </tr>
          <tr>
              <td align="left" width="25%">
                <font size=1><strong>Activity Date (yyyy-mm-dd)</strong></font>
              </td>
              <td align="left" width="75%"><font size=1>{{nodeDetail.activityDate}}</font></td>
          </tr>
          <tr>
              <td align="left" width="25%"><font size=1><strong>Source Hub</strong></font></td>
              <td align="left" width="75%"><font size=1>{{nodeDetail.sourceHub}}</font></td>
          </tr>
          <tr>
              <td align="left" width="25%"><font size=1><strong>Destination Hub</strong></font></td>
              <td align="left" width="75%"><font size=1>{{nodeDetail.destinationHub}}</font></td>
          </tr>
        </table>
      </div>
       <div style="text-align:center; width: 100%; margin: 0 0 30px 0">
        <table>
            <tr>
                <th colspan="6"><font size=1>Source</font></th>
            </tr>
            <tr>
                <th><font size=1>Type</font></th>
                <th><font size=1>Code</font></th>
                <th><font size=1>Prodecesor</font></th>
                <th><font size=1>Power Supply</font></th>
                <th><font size=1>Node</font></th>
            </tr>
            <tr v-for="(data, ind) in dataSourceListNode" :key="ind">
                <td><font size=1>{{data.type}}</font></td>
                <td><font size=1>{{data.childName}}</font></td>
                <td><font size=1>{{data.prodecesor}}</font></td>
                <td><font size=1>{{data.powerSupply}}</font></td>
                <td><font size=1>{{data.node}}</font></td>
            </tr>
        </table>
        </div>
        <table>
           <tr>
                <th colspan="7"><font size=1>New</font></th>
            </tr>
            <tr>
                <th><font size=1>Type</font></th>
                <th><font size=1>Code</font></th>
                <th><font size=1>Prodecesor</font></th>
                <th><font size=1>Power Supply</font></th>
                <th><font size=1>Node</font></th>
                <th><font size=1>Source</font></th>
                <th><font size=1>Action</font></th>
            </tr>
            <tr v-for="(data, index) in dataListNode" :key="index">
                <td>
                  <font size=1>
                    <select v-model="data.type">
                      <option value="FIBERNODE">FIBERNODE</option>
                      <option value="PS">PS</option>
                      <option value="AMPLI 1">AMPLI 1</option>
                      <option value="AMPLI 2">AMPLI 2</option>
                      <option value="AMPLI 3">AMPLI 3</option>
                    </select>
                  </font>
                </td>
                <td><font size=1><input type="text" v-model="data.newChildName"></font></td>
                <td><font size=1><input type="text" v-model="data.newProdecesor"></font></td>
                <td><font size=1><input type="text" v-model="data.newPowerSupply"></font></td>
                <td><font size=1><input type="text" v-model="data.newNode"></font></td>
                <td><font size=1><input type="text" v-model="data.childName"></font></td>
                <td><font size=1><button @click="deleteRow(index)">Delete</button></font></td>
            </tr>
        </table>
        <button class="add" @click="addRow">
          <font size=2 style="margin: 2px 10px 2px 10px">Add</font>
        </button>
        <br/>
      <q-btn color="primary" icon="save" label="Next"
        @click="checkingNode()" style="margin: 15px 10px 0 0"/>
      <q-btn color="negative" icon="close" label="cancel"
        @click="cancel()" style="margin: 15px 0 0 0"/>
    </q-modal>
    <q-modal v-model="modalCheking" minimized ref="modalRef"
      :content-css="{padding: '50px', minWidth: '50vw'}">
      <div style="width: 100%; margin: 0 0 30px 0">
        <q-chip square color="blue">
          <font size=4>Migration</font>
        </q-chip>
          <table>
           <tr>
                <th><font size=1>Validation Log</font></th>
            </tr>
            <tr v-for="(data, index) in dataValidation" :key="index">
              <div v-if="data.location === 'FIBERNODE'">
                <tr class="my-label text-green text-bold">
                  <font size = 2>..Checking Fibernode..</font>
                </tr>
                <div v-if="data.status === 'valid'">
                  <tr>
                    <font  class="my-label text-bold" size=2>INFO: </font>
                    <font class="my-label text-blue" size =2> {{data.message}}</font></tr>
                </div>
                <div v-if="data.status === 'invalid'">
                  <tr>
                    <font  class="my-label text-bold" size=2>INFO: </font>
                    <font class="my-label text-red" size = 2>{{data.message}}</font>
                  </tr>
                </div>
              </div>
              <div v-else-if="data.location === 'PS'" class="my-label text-black bg-white">
                <tr class="my-label text-orange text-bold">
                  <font size = 2>..Checking Power Supply..</font>
                </tr>
                <div v-if="data.status === 'valid'">
                  <tr>
                    <font  class="my-label text-bold" size=2>INFO: </font>
                    <font class="my-label text-blue" size=2>{{data.message}}</font></tr>
                </div>
                <div v-if="data.status === 'invalid'">
                  <tr>
                    <font  class="my-label text-bold" size=2>INFO: </font>
                    <font class="my-label text-red" size = 2>{{data.message}}</font>
                  </tr>
                </div>
              </div>
              <div v-else class="my-label text-black bg-white">
                <tr class="my-label text-purple text-bold">
                  <font size = 2>..Checking Amplifier..</font>
                </tr>
                <div v-if="data.status === 'valid'">
                  <tr>
                    <font  class="my-label text-bold" size=2>INFO: </font>
                    <font class="my-label text-blue" size =2>{{data.message}}</font></tr>
                </div>
                <div v-if="data.status === 'invalid'">
                  <tr>
                    <font  class="my-label text-bold" size=2>INFO: </font>
                    <font class="my-label text-red" size=2>{{data.message}}</font>
                  </tr>
                </div>
               </div>
            </tr>
        </table>
      <q-btn color="primary" icon="save" label="Next" @click="getListHierarchy()"
        style="margin: 15px 10px 0 0"/>
      <q-btn color="negative" icon="close" label="cancel" @click="cancel()"
        style="margin: 15px 0 0 0"/>
      </div>
    </q-modal>
    <q-modal v-model="modalHierarchy" minimized ref="modalRef"
      :content-css="{padding: '20px', minWidth: '60vw'}">
      <div style="width: 100%; margin: 0 0 30px 0">
        <q-chip square color="blue">
          <font size=4>Migration</font>
        </q-chip>
        <q-card-separator/>
      <table>
        <tr>
          <th colspan="5"><font size=1>Mapping State</font></th>
        </tr>
        <tr>
          <th colspan="3"><font size=1>Origin</font></th>
          <th colspan="2"><font size=1>New</font></th>
        </tr>
        <tr>
          <th><font size=1>Type</font></th>
          <th><font size=1>Prodecesor</font></th>
          <th><font size=1>Code</font></th>
          <th><font size=1>Prodecesor</font></th>
          <th><font size=1>Code</font></th>
        </tr>
        <tr v-for="(data, index) in dataListNode" :key="index">
          <td><font size=1>{{data.type}}</font></td>
          <td><font size=1>{{data.prodecesor}}</font></td>
          <td><font size=1>{{data.childName}}</font></td>
          <td><font size=1>{{data.newProdecesor}}</font></td>
          <td><font size=1>{{data.newChildName}}</font></td>
        </tr>
      </table>
      <table class="hierarchy" style="margin: 20px 0 0 0">
        <tr>
          <th colspan="1"><font size=1>Origin</font></th>
          <th colspan="1"><font size=1>New</font></th>
        </tr>
        <tr>
          <td class="main">
            <tr class="one" v-for="(data, index) in FIBER" :key="index">
              <td class="a">
              <span class="my-label text-white bg-blue">
              <font size=2 style="padding: 10px">{{data.type}}: {{data.childName}}</font>
              </span>
                <tr v-for="(data1, index) in AMP1" :key="index">
                  <td class="b">
                  <div v-if="data1.type === 'PS'">
                    <q-icon :name="'play_arrow'" color="red" size="16px" class="q-mr-sm"/>
                    <span class="my-label text-white bg-red">
                    <font size=2 style="padding: 10px">{{data1.type}}: {{data1.childName}}</font>
                    </span>
                  </div>
                  <div v-else >
                    <q-icon :name="'play_arrow'" color="green" size="16px" class="q-mr-sm"/>
                    <span class="my-label text-white bg-green">
                    <font size=2 style="padding: 10px">{{data1.type}}: {{data1.childName}}</font>
                    </span>
                  </div>
                    <tr v-for="(data2, index) in AMP2" :key="index">
                      <div style="margin: 5px 0 0 15px"
                        v-if="data2.parentName === data1.childName">
                      <td class="c">
                      <q-icon :name="'play_arrow'" color="black" size="16px" class="q-mr-sm" />
                      <span class="my-label text-white bg-black">
                      <font size=2 style="padding: 10px">
                        {{data2.type}}: {{data2.childName}}
                      </font>
                      </span>
                        <tr v-for="(data3, index) in AMP3" :key="index">
                          <div style="margin: 5px 0 0 15px"
                            v-if="data3.parentName === data2.childName">
                          <td class="d">
                          <q-icon :name="'play_arrow'" color="black" size="16px" class="q-mr-sm" />
                          <span class="my-label text-white bg-black">
                          <font size=2 style="padding: 10px">
                            {{data3.type}}: {{data3.childName}}
                          </font>
                          </span>
                            <tr v-for="(data4, index) in AMP4" :key="index">
                              <div style="margin: 5px 0 0 15px"
                                v-if="data4.parentName === data3.childName">
                              <td class="e">
                              <q-icon :name="'play_arrow'" color="black" size="16px"
                                class="q-mr-sm" />
                              <span class="my-label text-white bg-black">
                              <font size=2 style="padding: 10px">
                                {{data4.type}}: {{data4.childName}}
                              </font>
                              </span>
                                <tr v-for="(data5, index) in AMP5" :key="index">
                                  <div style="margin: 5px 0 0 15px"
                                    v-if="data5.parentName === data4.childName">
                                  <td class="e">
                                  <q-icon :name="'play_arrow'" color="black" size="16px"
                                    class="q-mr-sm" />
                                  <span class="my-label text-white bg-black">
                                  <font size=2 style="padding: 10px">
                                    {{data5.type}}: {{data5.childName}}
                                  </font>
                                  </span>
                                  </td>
                                  </div>
                                </tr>
                              </td>
                              </div>
                            </tr>
                          </td>
                          </div>
                        </tr>
                      </td>
                      </div>
                    </tr>
                  </td>
                </tr>
              </td>
            </tr>
          </td>
        </tr>
      </table>
      </div>
      <q-btn color="primary" icon="save" label="Next" @click="saveMigration()"
          style="margin: 15px 10px 0 0"/>
      <q-btn color="negative" icon="close" label="cancel" @click="cancel()"
          style="margin: 15px 0 0 0"/>
    </q-modal>
    <div class='hello' ref='myDiagramDiv'>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      dataValidation: [],
      dataSourceListNode: [],
      dataListNode: [],
      hubCodeList: [],
      modalDetailNode: false,
      modalMigration: false,
      modalCheking: false,
      modalHierarchy: false,
      listHierarchy: [],
      FIBER: [],
      AMP1: [],
      AMP2: [],
      AMP3: [],
      AMP4: [],
      AMP5: [],
      migrationList: [
        {
          label: 'Split',
          value: 'Split',
        },
        {
          label: 'Swap',
          value: 'Swap',
        },
      ],
      nodeDetail: {
        node: '',
        migrationType: '',
        activityDate: '',
        sourceHub: '',
        sourceNode: '',
        destinationHub: '',
        destinationNode: '',
      },
      pagination: {
        rowsPerPage: 50,
      },
      column: [
        {
          name: 'assetName',
          label: 'Asset Name',
          field: 'assetName',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'hubCode',
          label: 'Hub',
          field: 'hubCode',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'assetId',
          label: 'Asset Id',
          field: 'assetId',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'assetCategory',
          label: 'Asset Category',
          field: 'assetCategory',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
        {
          name: 'assetStatus',
          label: 'Asset Status',
          field: 'assetStatus',
          align: 'left',
          style: { color: '#ffffff' },
          classes: 'bg-primary',
          sortable: true,
        },
      ],
    };
  },
  watch: {
    selected: () => {
      if (this.selected.length !== 0) {
        this.buttonHide = false;
        this.buttonAdd = true;
      } else if (this.selected.length === 0) {
        this.buttonHide = true;
        this.buttonAdd = false;
      }
    },
    ModalAdd: (ModalAdd) => {
      if (ModalAdd === false) {
        this.Reset();
      }
    },
    ModalDelete: (ModalDelete) => {
      if (ModalDelete === false) {
        this.Reset();
      }
    },
    ModalUpload: (ModalUpload) => {
      if (ModalUpload === false) {
        this.Reset();
      }
    },
  },

  beforeMount() {
    this.getContent();
  },

  methods: {
    getContent() {
      this.$q.loading.hide();
      this.$axios.post(`${process.env.urlPrefix}getListFibernode/`, {
      })
        .then((response) => {
          this.dataList = response.data;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    addRow() {
      this.dataListNode.push({
        newChildName: '',
        newProdecesor: '',
        newPowerSupply: '',
        newNode: '',
      });
    },
    deleteRow(index) {
      this.dataListNode.splice(index, 1);
    },
    DetailNode(node) {
      this.getHubCode();
      this.nodeDetail.sourceNode = `${node.assetName} - ${node.description}`;
      this.nodeDetail.sourceHub = node.hubCode;
      this.nodeDetail.node = node.assetName;
      this.modalMigration = true;
    },
    getDetailNode() {
      this.$q.loading.hide();
      this.$axios.post(`${process.env.urlPrefix}findNyParent/`, {
        parentName: this.nodeDetail.node,
        newNode: this.nodeDetail.destinationNode,
      })
        .then((response) => {
          this.dataListNode = response.data;
          this.constructSourceListNode(response.data);
          this.modalDetailNode = true;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    constructSourceListNode(listNode) {
      this.dataSourceListNode = listNode.map(() => ({
        type: listNode.type,
        childName: listNode.childName,
        prodecesor: listNode.prodecesor,
        powerSupply: listNode.powerSupply,
        node: listNode.node,
      }));
    },
    checkingNode() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}checkingNode/`, this.dataListNode)
        .then((response) => {
          this.$q.loading.hide();
          if (response.data[0].status === 'failed') {
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative',
            });
          } else {
            this.modalCheking = true;
            this.dataValidation = response.data;
          }
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    getListHierarchy() {
      this.hierarchy();
    },
    hierarchy() {
      const FIBERNODE = [];
      const AMP1 = [];
      const AMP2 = [];
      const AMP3 = [];
      const AMP4 = [];
      const AMP5 = [];
      this.dataListNode.forEach((element) => {
        if (element.type === 'FIBERNODE') {
          FIBERNODE.push(element);
        } else if (element.type === 'PS') {
          AMP1.push(element);
        } else if (element.type === 'AMPLI 1') {
          AMP1.push(element);
        } else if (element.type === 'AMPLI 2') {
          AMP2.push(element);
        } else if (element.type === 'AMPLI 3') {
          AMP3.push(element);
        } else if (element.type === 'AMPLI 4') {
          AMP4.push(element);
        } else if (element.type === 'AMPLI 5') {
          AMP5.push(element);
        }
      });
      this.FIBER = FIBERNODE;
      this.AMP1 = AMP1;
      this.AMP2 = AMP2;
      this.AMP3 = AMP3;
      this.AMP4 = AMP4;
      this.AMP5 = AMP5;
      this.modalHierarchy = true;
    },
    getHubCode() {
      this.$axios.post(`${process.env.urlPrefix}getHubCode/`, {
      })
        .then((response) => {
          this.constructHubCode(response.data);
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    constructHubCode(hubCodeList) {
      this.hubCodeList = hubCodeList.map(hubCode => ({
        label: hubCode,
        value: hubCode,
      }));
    },
    saveMigration() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}savingMigration/`, {
        hierarchy: this.dataListNode,
        migration: this.nodeDetail,
      })
        .then((response) => {
          this.$q.loading.hide();
          if (response.data[0].status === 'failed') {
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative',
            });
          } else {
            this.modalCheking = true;
            this.dataValidation = response.data;
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
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
   padding: 5px;
}
table.hierarchy {
  width: 100%;
  border: 1px solid white;
}
td.a, td.b, td.c {
   border: 1px solid white;
}
table {
  width: 100%;
}
button {
  background-color: rgb(218, 74, 98); /* Green */
  border: none;
  color: white;
  padding: 2px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
}

button.add {
  background-color: rgb(102, 153, 0); /* Green */
  border: none;
  color: white;
  margin: 10px 0 10px 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
}
</style>
