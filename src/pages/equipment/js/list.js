export default {
  data () {
    return {
      modalUpload: false,
      searchVal: {
        equipmentCategory: 'All',
        productType: 'All',
        subType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All'
      },
      equipmentToMigrate: {
        hubCode: undefined,
        nodeCode: undefined,
        newHubCode: undefined,
        newNodeCode: undefined
      },
      migrateDestination: {
        destinationHub: ''
      },
      moveNodeOptions: [
        {
          label: 'Do not move Node',
          value: 'X'
        },
        {
          label: 'Move Node as Amplifier',
          value: 'A'
        },
        {
          label: 'Move All with One as New Node',
          value: 'N'
        },
        {
          label: 'Change Service',
          value: 'C'
        }
      ],
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
      nodeOptions: [],
      filteredNodeList: [],
      migrationStep: 1,
      migrationListOriginal: [],
      lastCodes: {},
      migrationListNew: [],
      originalNode: {},
      pagination: {
        sortBy: 'equipmentName',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      loading: false,
      migrationOriginalPagination: {
        rowsPerPage: 0
      },
      migrationNewPagination: {
        rowsPerPage: 0
      },
      showMigrationForm: false,
      selectedNewNode: undefined,
      moveNode: undefined,
      migrationTab: 'newConfig',
      nodeAtHub: false,
      columns: [
        {
          name: 'id',
          label: 'Equipment Id',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'equipmentCategory',
          label: 'Equipment Category',
          field: 'equipmentCategory',
          align: 'left',
          sortable: true
        },
        {
          name: 'equipmentName',
          label: 'Equipment Name',
          field: 'equipmentName',
          align: 'left',
          sortable: true
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true
        },
        {
          name: 'productTypeSubType',
          label: 'Sub Type',
          field: 'productTypeSubType',
          align: 'left',
          sortable: true
        },
        {
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          sortable: true
        },
        {
          name: 'brand',
          label: 'Brand',
          field: 'brand',
          align: 'left',
          sortable: true
        },
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'bdfCode',
          label: 'BDF Code',
          field: 'bdfCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'equipmentStatus',
          label: 'Equipment Status',
          field: 'equipmentStatus',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center'
        }
      ],
      migrationOriginalColumns: [
        {
          name: 'equipmentName',
          label: 'Code',
          field: 'equipmentName',
          align: 'center'
        },
        {
          name: 'productTypeSubType',
          label: 'Type',
          field: 'productTypeSubType',
          align: 'center'
        },
        {
          name: 'predecessor',
          label: 'Predecessor',
          field: 'predecessor',
          align: 'center'
        },
        {
          name: 'psCode',
          label: 'Power Supply',
          field: 'psCode',
          align: 'center'
        }
      ],
      migrationNewColumns: [
        {
          name: 'equipmentName',
          label: 'Code',
          field: 'equipmentName',
          align: 'center'
        },
        {
          name: 'newName',
          label: 'New Code',
          field: 'newName',
          align: 'center'
        },
        {
          name: 'productTypeSubType',
          label: 'Type',
          field: 'productTypeSubType',
          align: 'center'
        },
        {
          name: 'predecessor',
          label: 'Predecessor',
          field: 'predecessor',
          align: 'center'
        },
        {
          name: 'psCode',
          label: 'Power Supply',
          field: 'psCode',
          align: 'center'
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center'
        }
      ],
      uploadCategory: 'field'
    }
  },

  beforeMount () {
    this.initPage()
  },

  methods: {
    fillTableResult (pagedEquipment) {
      this.dataList = pagedEquipment.content
      this.pagination.rowsNumber = pagedEquipment.totalElements
    },
    initPage () {
      this.$axios.post(`${process.env.urlPrefix}getInitPage/`, {
      })
        .then((response) => {
          this.fillTableResult(response.data.listOfEquipment)

          this.assetCategoryList = response.data.listOfAssetCategory
          this.productTypeList = response.data.listOfProductType
          this.subTypeList = response.data.listOfProductSubType
          this.hubCodeList = response.data.listOfHub
          this.bdfCodeList = response.data.listOfBdf

          this.nodeList = response.data.listOfNodes

          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    },
    getContent (props) {
      this.$q.loading.show()

      let { page, rowsPerPage, sortBy, descending } = props.pagination

      this.$axios.get(`${process.env.urlPrefix}getPagedEquipment/`, {
        params: {
          pageIndex: page,
          pageSize: rowsPerPage,
          sortBy: sortBy,
          descending: descending
        }
      })
        .then((response) => {
          this.fillTableResult(response.data)
          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    },
    doUploadFile (file) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)

        this.$axios.post(`${process.env.urlPrefix}uploadField`, formData, {
          headers: { 'Content-Type': undefined }
        })
          .then(() => {
            resolve({
              url: `${process.env.urlPrefix}uploadField`
            })
          })
          .catch((error) => {
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: error
            })
            reject(error)
          })
      })
    },
    openMigrationForm (cell) {
      this.showMigrationForm = true
      this.migrationStep = 1
      this.nodeOptions = []

      this.equipmentToMigrate.hubCode = cell.row.hubCode
      this.equipmentToMigrate.nodeCode = cell.row.nodeCode
      this.equipmentToMigrate.newHubCode = this.hubCodeList
        .filter(hub => hub.value === cell.row.hubCode)[0]

      this.moveNode = this.moveNodeOptions[0].value

      this.doChageMigrationHub()
      this.getEquipmentChild(this.equipmentToMigrate.nodeCode)
    },
    doChageMigrationHub () {
      this.filteredNodeList = this.nodeList
        .filter(node => node.cascadeValue === this.equipmentToMigrate.newHubCode.value)
        .map(({ label, value }) => ({ label, value }))

      if (this.equipmentToMigrate.newHubCode.value === this.equipmentToMigrate.hubCode) {
        for (let i = 0; i < this.filteredNodeList.length; i += 1) {
          if (this.filteredNodeList[i].label === this.equipmentToMigrate.nodeCode) {
            this.filteredNodeList.splice(i, 1)
            break
          }
        }
      }

      // this.filteredNodeList.unshift({ label: '[New]', value: 'N' });

      if (this.filteredNodeList.length < 1) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: `Hub ${this.equipmentToMigrate.newHubCode} does not have nodes. Please add one before proceeding.`
        })
        this.selectedNewNode = undefined
        this.equipmentToMigrate.newNodeCode = undefined
      } else {
        this.selectedNewNode = this.filteredNodeList[0]
        this.equipmentToMigrate.newNodeCode = this.selectedNewNode.value
      }

      this.nodeOptions = []
    },
    doChangeMigrationNode (val) {
      if (this.selectedNewNode === 'N') {
        this.equipmentToMigrate.newNodeCode = undefined
      }
    },
    doFilterMigrationNode (val, update, abort) {
      if (val.length < 4) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.nodeOptions = this.filteredNodeList.filter(f => f.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    doValidateNewNode () {
      const existingNode = this.nodeList
        .filter(node => node.value === this.equipmentToMigrate.newNodeCode)

      if (existingNode.length > 0) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: `Node ${this.equipmentToMigrate.newNodeCode} already used. Please specify other value.`
        })
      }
    },
    getEquipmentChild (nodeCodeParam) {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getNodeChildMig/`, { params: { nodeCode: nodeCodeParam } })
        .then((response) => {
          this.migrationListOriginal = response.data

          for (let i = 0; i < this.migrationListNew.length; i += 1) {
            if (this.migrationListNew[i].equipmentName === this.equipmentToMigrate.nodeCode) {
              this.originalNode = this.migrationListNew[i]
              break
            }
          }

          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    },
    handleDoNotMoveNode () {
      const ampliCodePrefix = this.lastCodes.lastAmplifierCode.substring(0, 3)
      const psCode = this.lastCodes.lastPsCode
      let ampliCounter = parseInt(this.lastCodes.lastAmplifierCode.substring(3, 7), 10) * 1000
      let psCounter = 64
      let oldNewMap = []

      if (parseInt(this.lastCodes.lastAmplifierCode.substr(3), 10) < 10) {
        this.nodeAtHub = true
        ampliCounter = parseInt(this.lastCodes.lastAmplifierCode.substr(3), 10)
        this.$q.notify({
          color: 'info',
          icon: 'info',
          message: 'Because your destination node is a hub node, all amplifier will be first level amplifier. And only up to 9 amplifier is allowed.'
        })
      } else {
        this.nodeAtHub = false
      }

      if (this.lastCodes.lastPsCode.length > 6) {
        psCounter = this.lastCodes.lastPsCode.charCodeAt(6)
        if ((psCounter) < 64) psCounter = 64
      }

      for (let i = 0; i < this.migrationListNew.length; i += 1) {
        if (this.migrationListNew[i].equipmentName === this.equipmentToMigrate.nodeCode) {
          this.migrationListNew.splice(i, 1)
          i -= 1
        } else {
          let selectedElement = this.migrationListNew[i]
          this.$set(selectedElement, 'newName', '')
          this.$set(selectedElement, 'migrate', true)

          selectedElement.migrate = true
          if (selectedElement.productTypeSubType === 'PS') {
            psCounter += 1
            selectedElement.newName = psCode + String.fromCharCode(psCounter)
            selectedElement.psCode = selectedElement.newName
            selectedElement.predecessor = this.equipmentToMigrate.newNodeCode
          } else {
            let multiplier = 1000
            const newPsCode = oldNewMap
              .filter(map => map.oldCode === selectedElement.psCode)

            if (newPsCode !== undefined) {
              selectedElement.psCode = newPsCode[0].newCode
            }

            if (this.nodeAtHub) {
              selectedElement.productTypeSubType = 'AMPLI 1'
              selectedElement.predecessor = this.equipmentToMigrate.newNodeCode

              ampliCounter += 1
              if (ampliCounter < 10) {
                selectedElement.newName = ampliCodePrefix + '000000' + ampliCounter
              } else {
                selectedElement.migrate = false
              }
            } else {
              if (selectedElement.productTypeSubType === 'AMPLI 1') {
                selectedElement.predecessor = this.equipmentToMigrate.newNodeCode
              } else {
                const newAmpliCode = oldNewMap
                  .filter(map => map.oldCode === selectedElement.predecessor)

                if (newAmpliCode !== undefined) {
                  selectedElement.predecessor = newAmpliCode[0].newCode
                }

                if (selectedElement.productTypeSubType === 'AMPLI 2') {
                  multiplier = 100
                } else if (selectedElement.productTypeSubType === 'AMPLI 3') {
                  multiplier = 10
                } else if (selectedElement.productTypeSubType === 'AMPLI 4') {
                  multiplier = 1
                }
              }

              ampliCounter = (Math.floor(ampliCounter / multiplier) * multiplier) + multiplier
              let counterStr = '0000' + ampliCounter
              selectedElement.newName = ampliCodePrefix + counterStr.substring(counterStr.length - 7)
            }
          }
          this.$set(this.migrationListNew, i, selectedElement)

          oldNewMap.push({
            oldCode: this.migrationListNew[i].equipmentName,
            newCode: this.migrationListNew[i].newName
          })
        }
      }
    },
    handleMoveNodeAsNode () {
    },
    handleMoveNodeAsAmplifier () {
    },
    handleChangeService () {
    },
    doSetupNewHierarchy () {
      if (this.selectedNewNode.value !== 'N') {
        this.equipmentToMigrate.newNodeCode = this.selectedNewNode.value
      }

      if (this.equipmentToMigrate.newNodeCode === undefined) {
        this.$refs.stepper.previous()
      } else {
        this.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))
        this.$set(this.migrationListNew, 'newName', '')
        this.$set(this.migrationListNew, 'migrate', true)

        let targetUrl = 'getLastNode'
        let parameter = {
          hubCode: this.equipmentToMigrate.newHubCode,
          serviceType: this.equipmentToMigrate.nodeCode.substring(0, 1) === 'D' ? 'ANALOG' : 'DIGITAL'
        }

        if ((this.moveNode === 'X') && ('A')) {
          targetUrl = 'getLastAmpliPs'
          parameter = { nodeCode: this.equipmentToMigrate.newNodeCode }
        }

        this.$axios.get(`${process.env.urlPrefix}${targetUrl}/`, { params: parameter })
          .then((response) => {
            this.lastCodes = response.data

            if (this.moveNode === 'X') {
              this.handleDoNotMoveNode()
            } else if (this.moveNode === 'N') {
              this.handleMoveNodeAsNode()
            } else if (this.moveNode === 'A') {
              this.handleMoveNodeAsAmplifier()
            } else if (this.moveNode === 'C') {
              this.handleChangeService()
            }

            this.$q.loading.hide()
          })
          .catch((error) => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: error
            })
          })
      }
    },
    doStayOrMoveElement (row) {
      row.migrate = !row.migrate
    },
    doValidateMigration () {
      console.log('ya')
    },
    doCheckStep () {
      if (this.migrationStep === 2) {
        this.doSetupNewHierarchy()
      } else if (this.migrationStep === 3) {
        this.doValidateMigration()
      }
    }
  }
}
