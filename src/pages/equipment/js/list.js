export default {
  data () {
    return {
      equipmentListColumns: [
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
      equipmentPagination: {
        sortBy: 'equipmentName',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      listOfEquipment: [],
      equipmentCategoryList: [],
      productTypeList: [],
      subTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      modalUpload: false,
      uploadCategory: 'field',
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
      destinationNodeOptions: [],
      fullNodeListByHub: [],
      nodePrefixByHub: '',
      lastCodes: {},
      migrationStep: 1,
      migrationListOriginal: [],
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
      migrationOriginalPagination: {
        rowsPerPage: 0
      },
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
      migrationNewPagination: {
        rowsPerPage: 0
      },
      migrationListNew: [],
      showMigrationForm: false,
      selectedNewNode: undefined,
      moveNode: undefined,
      migrationTab: 'newConfig'
    }
  },

  beforeMount () {
    this.initPage()
  },

  methods: {
    fillTableResult (pagedEquipment) {
      this.listOfEquipment = pagedEquipment.content
      this.equipmentPagination.rowsNumber = pagedEquipment.totalElements
      this.equipmentPagination.page = pagedEquipment.number + 1
    },
    initPage () {
      this.$axios.post(`${process.env.urlPrefix}getInitPage/`, {
      })
        .then((response) => {
          this.fillTableResult(response.data.listOfEquipment)

          this.assetCategoryList = response.data.listOfAssetCategory
          this.productTypeList = response.data.listOfProductType
          this.subTypeList = response.data.listOfProductSubType
          this.hubCodeList = response.data.listOfHub.map(hubCode => hubCode.value)
          this.bdfCodeList = response.data.listOfBdf

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
    doListOfEquipmentRefresh (props) {
      this.$q.loading.show()

      let { page, rowsPerPage, sortBy } = props.equipmentPagination

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
      this.destinationNodeOptions = []

      this.equipmentToMigrate.hubCode = cell.row.hubCode
      this.equipmentToMigrate.nodeCode = cell.row.nodeCode
      this.equipmentToMigrate.newHubCode = cell.row.hubCode

      this.moveNode = this.moveNodeOptions[0].value

      this.getEquipmentChild(this.equipmentToMigrate.nodeCode)
    },
    doChageMigrationHub () {
      this.$axios.get(`${process.env.urlPrefix}getNodeByHub/`,
        {
          params: { hubCode: this.equipmentToMigrate.newHubCode }
        })
        .then((response) => {
          this.fullNodeListByHub = []

          if (response.data.length > 0) {
            this.fullNodeListByHub = response.data.map(nodeChoice => nodeChoice.value)
            this.nodePrefixByHub = this.fullNodeListByHub[0].substring(0, 3)

            if (this.equipmentToMigrate.newHubCode === this.equipmentToMigrate.hubCode) {
              for (let i = 0; i < this.fullNodeListByHub.length; i += 1) {
                if ((this.fullNodeListByHub[i] === this.equipmentToMigrate.nodeCode) ||
                  (parseInt(this.fullNodeListByHub[i].substring(3)) < 10)) {
                  this.fullNodeListByHub.splice(i--, 1)
                }
              }
            }
          }

          if (this.fullNodeListByHub.length < 1) {
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: `Hub ${this.equipmentToMigrate.newHubCode} does not have nodes. Please add one before proceeding.`
            })
            this.selectedNewNode = undefined
            this.equipmentToMigrate.newNodeCode = undefined

            this.destinationNodeOptions = []
          } else {
            this.selectedNewNode = this.fullNodeListByHub[0]
            this.equipmentToMigrate.newNodeCode = this.selectedNewNode.value

            this.destinationNodeOptions.push(this.fullNodeListByHub[0])
            this.destinationNodeOptions.unshift('New Node')
          }

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
    doChangeTargetNode (val) {
      if (this.selectedNewNode.value === 'New Node') {
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
        this.destinationNodeOptions = this.fullNodeListByHub.filter(f => f.toLowerCase().indexOf(needle) > -1)
        this.destinationNodeOptions.unshift('New Node')
      })
    },
    doValidateNewNode () {
      if (this.selectedNewNode !== 'New Node') {
        return
      }

      if (this.fullNodeListByHub.includes(this.nodePrefixByHub + this.equipmentToMigrate.newNodeCode + '00')) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: `Node ${this.equipmentToMigrate.newNodeCode} already used. Please specify other value.`
        })
      }
    },
    getEquipmentChild (nodeCodeParam) {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getNodeChildMig`, { params: { nodeCode: nodeCodeParam } })
        .then((response) => {
          this.migrationListOriginal = response.data

          this.doChageMigrationHub()
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
      let ampliCodePrefix
      let psCodePrefix

      let counter = {
        ampliCounter: '0',
        psCounter: 64,
        stayAmpliCounter: '0',
        stayPsCounter: 63
      }

      if ((this.lastCodes.lastNodeCode !== undefined) && (this.lastCodes.lastNodeCode !== null)) {
        ampliCodePrefix = this.lastCodes.lastNodeCode.substring(0, 3)
        psCodePrefix = this.lastCodes.lastNodeCode.substring(0, 6)

        const lastNodeNumber = '000' + (parseInt(this.lastCodes.lastNodeCode.substring(3, 6), 10) + 1)
        this.equipmentToMigrate.newNodeCode = this.lastCodes.lastNodeCode.substring(0, 3) + lastNodeNumber.substr(lastNodeNumber.length - 3) + '00'
      } else {
        counter.ampliCounter = this.lastCodes.lastAmplifierCode.substring(6, 7)
        ampliCodePrefix = this.lastCodes.lastAmplifierCode.substring(0, 3)
        psCodePrefix = this.lastCodes.lastPsCode.substring(0, 6)

        if (this.lastCodes.lastPsCode.length > 6) {
          counter.psCounter = this.lastCodes.lastPsCode.charCodeAt(6)
          if ((counter.psCounter) < 64) counter.psCounter = 64
        }
      }

      let oldNewMap = []
      let oldNewStayMap = []

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
    doInitializeMigrationList (removeNode) {
      console.log('a')
      for (let i = 0; i < this.migrationListNew.length; i++) {
        if (removeNode && (this.migrationListNew[i].equipmentName === this.equipmentToMigrate.nodeCode)) {
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
    showSplitNode () {
      this.doInitializeMigrationList(true)
    },
    showSwapNode () {
      this.doInitializeMigrationList(false)
    },
    showChangeService () {
    },
    doSetupNewHierarchy () {
      console.log(this.selectedNewNode)
      if (this.selectedNewNode !== 'New Node') {
        this.equipmentToMigrate.newNodeCode = this.selectedNewNode.value
      } else {
        this.equipmentToMigrate.newNodeCode = this.nodePrefixByHub + this.equipmentToMigrate.newNodeCode + '00'
      }
      console.log(this.equipmentToMigrate.newNodeCode)

      if (this.equipmentToMigrate.newNodeCode === undefined) {
        this.$refs.stepper.previous()
      } else {
        this.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))
        this.$set(this.migrationListNew, 'newName', '')
        this.$set(this.migrationListNew, 'migrate', true)

        let targetUrl = 'getLastNode'
        let parameter = {
          hubCode: this.equipmentToMigrate.newHubCode.label,
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
              this.showSplitNode()
            } else if (this.moveNode === 'N') {
              this.showSwapNode()
            } else if (this.moveNode === 'C') {
              this.showChangeService()
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
