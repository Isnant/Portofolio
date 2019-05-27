export default {
  data() {
    return {
      modalUpload: false,
      searchVal: {
        equipmentCategory: 'All',
        productType: 'All',
        subType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All',
      },
      equipmentToMigrate: {
        hubCode: undefined,
        nodeCode: undefined,
        newHubCode: undefined,
        newNode: undefined,
      },
      migrateDestination: {
        destinationHub: '',
      },
      filter: '',
      selection: 'multiple',
      dataList: [],
      selected: [],
      resultList: [],
      equipmentCategoryList: [],
      productTypeList: [],
      subTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      nodeList: [],
      filteredNodeList: [],
      migrationStep: 'setupDestination',
      migrationListOriginal: [],
      migrationListNew: [],
      originalNode: {},
      pagination: {
        rowsPerPage: 50,
      },
      migrationOriginalPagination: {
        rowsPerPage: 50,
      },
      migrationNewPagination: {
        rowsPerPage: 50,
      },
      showMigrationForm: false,
      selectedNewNode: undefined,
      moveNode: false,
      columns: [
        {
          name: 'id',
          label: 'Equipment Id',
          field: 'id',
          align: 'left',
          sortable: true,
        },
        {
          name: 'equipmentCategory',
          label: 'Equipment Category',
          field: 'equipmentCategory',
          align: 'left',
          sortable: true,
        },
        {
          name: 'equipmentName',
          label: 'Equipment Name',
          field: 'equipmentName',
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
          name: 'productTypeSubType',
          label: 'Sub Type',
          field: 'productTypeSubType',
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
          name: 'equipmentStatus',
          label: 'Equipment Status',
          field: 'equipmentStatus',
          align: 'left',
          sortable: true,
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center',
        },
      ],
      migrationOriginalColumns: [
        {
          name: 'equipmentName',
          label: 'Code',
          field: 'equipmentName',
          align: 'center',
        },
        {
          name: 'productTypeSubType',
          label: 'Type',
          field: 'productTypeSubType',
          align: 'center',
        },
        {
          name: 'predecessor',
          label: 'Predecessor',
          field: 'predecessor',
          align: 'center',
        },
        {
          name: 'psCode',
          label: 'Power Supply',
          field: 'psCode',
          align: 'center',
        },
      ],
      migrationNewColumns: [
        {
          name: 'equipmentName',
          label: 'Code',
          field: 'equipmentName',
          align: 'center',
        },
        {
          name: 'newEquipmentName',
          label: 'New Code',
          field: 'newEquipmentName',
          align: 'center',
        },
        {
          name: 'productTypeSubType',
          label: 'Type',
          field: 'productTypeSubType',
          align: 'center',
        },
        {
          name: 'predecessor',
          label: 'Predecessor',
          field: 'predecessor',
          align: 'center',
        },
        {
          name: 'psCode',
          label: 'Power Supply',
          field: 'psCode',
          align: 'center',
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center',
        },
      ],
      uploadCategory: 'field',
    };
  },

  beforeMount() {
    this.initPage();
  },

  methods: {
    initPage() {
      this.$axios.post(`${process.env.urlPrefix}getInitPage/`, {
      })
        .then((response) => {
          this.dataList = response.data.listOfEquipment;
          this.assetCategoryList = response.data.listOfAssetCategory;
          this.productTypeList = response.data.listOfProductType;
          this.subTypeList = response.data.listOfProductSubType;
          this.hubCodeList = response.data.listOfHub;
          this.bdfCodeList = response.data.listOfBdf;

          this.nodeList = response.data.listOfNodes;

          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            message: error,
          });
        });
    },
    getContent() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}getListAssetByFilter/`, this.searchVal)
        .then((response) => {
          this.dataList = response.data.listOfEquipment;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error,
          });
        });
    },
    uploadFile(file, updateProgress) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        this.$axios.post(`${process.env.urlPrefix}uploadField`, formData, {
          headers: { 'Content-Type': undefined },
        })
          .then(() => {
            updateProgress(1);
            resolve(file);
          })
          .catch((error) => {
            this.$q.notify({ message: error });
            reject(error);
          });
      });
    },
    openMigrationForm(cell) {
      this.showMigrationForm = true;
      this.migrationStep = 'setupDestination';

      this.equipmentToMigrate.hubCode = cell.row.hubCode;
      this.equipmentToMigrate.nodeCode = cell.row.nodeCode;
      this.equipmentToMigrate.newHubCode = cell.row.hubCode;

      this.moveNode = false;

      this.doChageMigrationHub();
    },
    doChageMigrationHub() {
      this.filteredNodeList = this.nodeList
        .filter(node => node.cascadeValue === this.equipmentToMigrate.newHubCode)
        .map(({ label, value }) => ({ label, value }));

      if (this.equipmentToMigrate.newHubCode === this.equipmentToMigrate.hubCode) {
        for (let i = 0; i < this.filteredNodeList.length; i += 1) {
          if (this.filteredNodeList[i].label === this.equipmentToMigrate.nodeCode) {
            this.filteredNodeList.splice(i, 1);
            break;
          }
        }
      }

      // this.filteredNodeList.unshift({ label: '[New]', value: 'N' });

      if (this.filteredNodeList.length < 1) {
        this.$q.notify({
          message: `Hub ${this.equipmentToMigrate.newHub} does not have nodes. Please add one before proceeding.`,
        });
        this.equipmentToMigrate.newNode = undefined;
      } else {
        this.selectedNewNode = this.filteredNodeList[0].value;
        this.equipmentToMigrate.newNode = this.selectedNewNode;
      }
    },
    doChangeMigrationNode() {
      if (this.selectedNewNode !== 'N') {
        this.equipmentToMigrate.newNode = this.selectedNewNode;
      } else {
        this.equipmentToMigrate.newNode = undefined;
      }
    },
    doValidateNewNode() {
      const existingNode = this.nodeList
        .filter(node => node.value === this.equipmentToMigrate.newNode);

      if (existingNode.length > 0) {
        this.$q.notify({
          message: `Node ${this.equipmentToMigrate.newNode} already used. Please specify other value.`,
        });
      }
    },
    doChangeMoveNode() {
      if (!this.moveNode) {
        for (let i = 0; i < this.migrationListNew.length; i += 1) {
          if (this.migrationListNew[i].equipmentName === this.equipmentToMigrate.nodeCode) {
            this.migrationListNew[i].newEquipmentName = undefined;
            this.migrationListNew[i].productTypeSubType = this.originalNode.productTypeSubType;
            this.migrationListNew[i].predecessor = this.originalNode.predecessor;
            this.migrationListNew[i].psCode = this.originalNode.psCode;
            break;
          }
        }
      }
    },
    getEquipmentChild(nodeCodeParam) {
      this.$q.loading.show();
      this.$axios.get(`${process.env.urlPrefix}getNodeChildMig/`, { params: { nodeCode: nodeCodeParam } })
        .then((response) => {
          this.migrationListOriginal = response.data;
          this.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal));

          for (let i = 0; i < this.migrationListNew.length; i += 1) {
            if (this.migrationListNew[i].equipmentName === this.equipmentToMigrate.nodeCode) {
              this.originalNode = this.migrationListNew[i];
              break;
            }
          }

          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error,
          });
        });
    },
    doSetupNewHierarchy() {
      if (this.equipmentToMigrate.newNode === undefined) {
        this.$refs.stepper.previous();
      }
    },
    doValidateMigration() {
      console.log('ya');
    },
    doCheckStep() {
      if (this.migrationStep === 'setupNewHierarchy') {
        this.doSetupNewHierarchy();
      } else if (this.migrationStep === 'validation') {
        this.doValidateMigration();
      }
    },
    getMigrationRowColor(rec) {
      if ((rec.equipmentName === this.equipmentToMigrate.nodeCode) && (!this.moveNode)) {
        return '#999';
      }
      return '#fff';
    },
    isMigrationEditDisabled(rec) {
      if ((rec.equipmentName === this.equipmentToMigrate.nodeCode) && (!this.moveNode)) {
        return true;
      }
      return false;
    },
  },
};
