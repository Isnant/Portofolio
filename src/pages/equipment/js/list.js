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
          label: 'Split Node',
          value: 'X'
        },
        {
          label: 'Swap Node',
          value: 'N'
        },
        {
          label: 'Change Service',
          value: 'C'
        }
      ],
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
      this.pagination.page = pagedEquipment.number + 1
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

      let { page, rowsPerPage, sortBy } = props.pagination

      this.$axios.get(`${process.env.urlPrefix}getPagedEquipment/`, {
        params: {
          pageIndex: page - 1,
          pageSize: rowsPerPage,
          sortBy: sortBy,
          descending: false
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
          if ((this.filteredNodeList[i].label === this.equipmentToMigrate.nodeCode) ||
            (parseInt(this.filteredNodeList[i].label.substring(3)) < 10)) {
            this.filteredNodeList.splice(i--, 1)
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
    doConstructNewAmpliCode (ampliCodePrefix, counter, selectedElement, oldNewMap, isMovedEquipment) {
      let prefix = ''
      let usedCounter = counter.ampliCounter

      let staticCounter = ''
      let newSequence = 0

      if (isMovedEquipment) {
        const newPsCode = oldNewMap
          .filter(map => map.oldCode === selectedElement.originalPsCode)

        if ((newPsCode.length > 0) && (newPsCode[0].newCode !== '')) {
          selectedElement.psCode = newPsCode[0].newCode
        } else {
          selectedElement.psCode = this.lastCodes.lastPsCode
        }

        if (selectedElement.productTypeSubType === 'AMPLI 1') {
          selectedElement.predecessor = this.equipmentToMigrate.newNodeCode + '00'

          prefix = selectedElement.predecessor.substring(0, 6)
          newSequence = usedCounter.charCodeAt(0) + 1
        } else {
          const newAmpliCode = oldNewMap
            .filter(map => map.oldCode === selectedElement.originalPredecessor)

          if (newAmpliCode.length > 0) {
            selectedElement.predecessor = newAmpliCode[0].newCode
          }
        }
      } else {
        selectedElement.predecessor = selectedElement.originalPredecessor
        selectedElement.psCode = selectedElement.originalPsCode
        usedCounter = counter.stayAmpliCounter

        if (selectedElement.productTypeSubType === 'AMPLI 1') {
          prefix = selectedElement.predecessor.substring(0, 6)
          newSequence = usedCounter.charCodeAt(0) + 1
        }
      }

      if (selectedElement.productTypeSubType === 'AMPLI 2') {
        prefix = selectedElement.predecessor.substring(0, 6)
        staticCounter = usedCounter.substring(0, 1)
        if (usedCounter.length === 1) {
          newSequence = 49
        } else {
          newSequence = usedCounter.charCodeAt(1) + 1
        }
      } else if (selectedElement.productTypeSubType === 'AMPLI 3') {
        prefix = selectedElement.predecessor.substring(0, 6)
        staticCounter = usedCounter.substring(0, 2)
        if (usedCounter.length === 2) {
          newSequence = 49
        } else {
          newSequence = usedCounter.charCodeAt(2) + 1
        }
      } else if (selectedElement.productTypeSubType === 'AMPLI 4') {
        prefix = selectedElement.predecessor.substring(0, 6)
        staticCounter = usedCounter.substring(0, 3)
        if (usedCounter.length === 2) {
          newSequence = 49
        } else {
          newSequence = usedCounter.charCodeAt(3) + 1
        }
      }

      if (newSequence === 58) {
        newSequence = 65
      }
      usedCounter = staticCounter + String.fromCharCode(newSequence)

      if (isMovedEquipment) {
        counter.ampliCounter = usedCounter
      } else {
        counter.stayAmpliCounter = usedCounter
      }

      let counterStr = prefix + usedCounter + '0000'
      counterStr = counterStr.substring(0, 10)

      selectedElement.newName = counterStr

      oldNewMap.push({
        oldCode: selectedElement.equipmentName,
        newCode: selectedElement.newName
      })

      return selectedElement
    },
    doAssignNewName () {
      const ampliCodePrefix = this.lastCodes.lastAmplifierCode.substring(0, 3)
      const psCodePrefix = this.lastCodes.lastPsCode.substring(0, 6)
      let counter = {
        ampliCounter: this.lastCodes.lastAmplifierCode.substring(6, 7),
        psCounter: 64,
        stayAmpliCounter: '0',
        stayPsCounter: 63
      }

      let oldNewMap = []
      let oldNewStayMap = []

      if (this.lastCodes.lastPsCode.length > 6) {
        counter.psCounter = this.lastCodes.lastPsCode.charCodeAt(6)
      }

      if (this.lastCodes.lastPsCode.length > 6) {
        counter.psCounter = this.lastCodes.lastPsCode.charCodeAt(6)
        if ((counter.psCounter) < 64) counter.psCounter = 64
      }

      for (let i = 0; i < this.migrationListNew.length; i++) {
        if (this.migrationListNew[i].migrate) {
          if (this.migrationListNew[i].productTypeSubType === 'PS') {
            this.migrationListNew[i].newName = psCodePrefix + String.fromCharCode(++counter.psCounter)
            this.migrationListNew[i].psCode = this.migrationListNew[i].newName
            this.migrationListNew[i].predecessor = this.equipmentToMigrate.newNodeCode + '00'

            oldNewMap.push({
              oldCode: this.migrationListNew[i].equipmentName,
              newCode: this.migrationListNew[i].newName
            })
          } else {
            this.migrationListNew[i] = this.doConstructNewAmpliCode(ampliCodePrefix, counter,
              this.migrationListNew[i], oldNewMap, true)
          }
        } else {
          if (this.migrationListNew[i].productTypeSubType === 'PS') {
            counter.stayPsCounter += 1
            let strPsCounter = ''

            if (counter.stayPsCounter >= 65) {
              strPsCounter = String.fromCharCode(counter.stayPsCounter)
            }
            this.migrationListNew[i].newName = this.equipmentToMigrate.nodeCode.substring(0, 6) + strPsCounter
            this.migrationListNew[i].psCode = this.migrationListNew[i].newName
            this.migrationListNew[i].predecessor = this.equipmentToMigrate.nodeCode + '00'

            oldNewStayMap.push({
              oldCode: this.migrationListNew[i].equipmentName,
              newCode: this.migrationListNew[i].newName
            })
          } else {
            this.migrationListNew[i] = this.doConstructNewAmpliCode(this.equipmentToMigrate.nodeCode.substring(0, 3), counter,
              this.migrationListNew[i], oldNewStayMap, false)
          }
        }
      }
    },
    handleDoNotMoveNode () {
      for (let i = 0; i < this.migrationListNew.length; i++) {
        if (this.migrationListNew[i].equipmentName === this.equipmentToMigrate.nodeCode) {
          this.migrationListNew.splice(i--, 1)
        } else {
          let selectedElement = this.migrationListNew[i]

          this.$set(selectedElement, 'originalPredecessor', '')
          this.$set(selectedElement, 'originalPsCode', '')
          this.$set(selectedElement, 'newName', '')
          this.$set(selectedElement, 'migrate', true)

          selectedElement.originalPredecessor = selectedElement.predecessor
          selectedElement.originalPsCode = selectedElement.psCode

          this.$set(this.migrationListNew, i, selectedElement)
        }
      }

      this.doAssignNewName()
    },
    handleMoveNodeAsAmplifier () {
      for (let i = 0; i < this.migrationListNew.length; i++) {
        let selectedElement = this.migrationListNew[i]

        this.$set(selectedElement, 'originalPredecessor', selectedElement.predecessor)
        this.$set(selectedElement, 'originalPsCode', selectedElement.psCode)
        this.$set(selectedElement, 'newName', '')
        this.$set(selectedElement, 'migrate', true)

        if (selectedElement.equipmentName === this.equipmentToMigrate.nodeCode) {
          selectedElement.productTypeSubType = 'AMPLI 1'
        }

        this.$set(this.migrationListNew, i, selectedElement)
      }

      this.doAssignNewName()
    },
    handleMoveNodeAsNode () {
      // this.doAssignNewName()
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

        if ((this.moveNode === 'X') || (this.moveNode === 'A')) {
          targetUrl = 'getLastAmpliPs'
          parameter = { nodeCode: this.equipmentToMigrate.newNodeCode }
        }

        this.$axios.get(`${process.env.urlPrefix}${targetUrl}/`, { params: parameter })
          .then((response) => {
            this.lastCodes = response.data

            if (this.moveNode === 'X') {
              this.handleDoNotMoveNode()
            } else if (this.moveNode === 'A') {
              this.handleMoveNodeAsAmplifier()
            } else if (this.moveNode === 'N') {
              this.handleMoveNodeAsNode()
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
      this.doAssignNewName()
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
