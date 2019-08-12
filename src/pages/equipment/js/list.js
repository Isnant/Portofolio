export default {
  data () {
    return {
      equipmentCategoryList: [],
      productTypeList: [],
      subTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      searchVal: {
        equipmentCategory: 'All',
        productType: 'All',
        subType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All'
      },
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
      modalUpload: false,
      uploadCategory: 'field',
      migrationStep: 1,
      showMigrationForm: false,
      migrationTab: 'newConfig',
      reloadMigrationList: true,
      equipmentToMigrate: {
        hubCode: undefined,
        nodeCode: undefined,
        serviceType: undefined,
        newHubCode: undefined,
        newNodeCode: undefined,
        newNodeNumber: undefined,
        newServiceNodeNumber: undefined,
        selectedNewNode: undefined,
        selectedMoveNodeOption: undefined,
        isNewNode: false,
        migrationListNew: []
      },
      nodePrefixByHub: '',
      fullNodeListByHub: [],
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
      isHierarchyDisabled: false,
      lastCodes: {},
      lastNodeCode: undefined,
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
      validationResults: [],
      sourcePreview: [],
      targetPreview: []
    }
  },

  methods: {
    doFillTableResult (pagedEquipment) {
      this.listOfEquipment = pagedEquipment.content
      this.equipmentPagination.rowsNumber = pagedEquipment.totalElements
      this.equipmentPagination.page = pagedEquipment.number + 1
    },
    doInitPage () {
      this.$axios.post(`${process.env.urlPrefix}getInitPage/`, {
      })
        .then((response) => {
          this.doFillTableResult(response.data.listOfEquipment)

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
          this.doFillTableResult(response.data)
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
    doOpenMigrationForm (cell) {
      this.showMigrationForm = true
      this.migrationStep = 1
      this.destinationNodeOptions = []

      this.equipmentToMigrate.hubCode = cell.row.hubCode
      this.equipmentToMigrate.nodeCode = cell.row.nodeCode
      this.equipmentToMigrate.serviceType = cell.row.service
      this.equipmentToMigrate.newHubCode = cell.row.hubCode

      this.equipmentToMigrate.selectedMoveNodeOption = this.moveNodeOptions[0].value

      this.getEquipmentChild(this.equipmentToMigrate.nodeCode)
    },
    doChageMigrationHub () {
      this.$axios.get(`${process.env.urlPrefix}getNodeByHub/`,
        {
          params: {
            hubCode: this.equipmentToMigrate.newHubCode,
            serviceType: this.equipmentToMigrate.serviceType
          }
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
            this.equipmentToMigrate.selectedNewNode = undefined
            this.equipmentToMigrate.newNodeCode = undefined

            this.destinationNodeOptions = []
          } else {
            this.equipmentToMigrate.selectedNewNode = this.fullNodeListByHub[0]
            this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.selectedNewNode.value

            this.destinationNodeOptions.push(this.fullNodeListByHub[0])
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
    doIsNewNodeChange () {
      if (this.equipmentToMigrate.isNewNode) {
        this.equipmentToMigrate.newNodeCode = undefined
        this.equipmentToMigrate.newNodeNumber = undefined
      }
    },
    doFilterMigrationNode (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.destinationNodeOptions = this.fullNodeListByHub.filter(f => f.toLowerCase().indexOf(needle) > -1)
      })
    },
    doValidateNewNode () {
      if (!this.equipmentToMigrate.isNewNode && this.equipmentToMigrate.selectedMoveNodeOption !== 'C') {
        return
      }

      let constructedNodeName = this.nodePrefixByHub + this.equipmentToMigrate.newNodeNumber + '00'

      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        constructedNodeName = this.equipmentToMigrate.newServiceNodeNumber + '00'
      }

      if (this.fullNodeListByHub.includes(constructedNodeName)) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: `Node ${this.equipmentToMigrate.newNodeNumber} already used. Please specify other value.`
        })
      } else {
        this.equipmentToMigrate.newNodeCode = constructedNodeName
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
        const newAmpliCode = oldNewMap
          .filter(map => map.oldCode === selectedElement.originalPredecessor)

        if (newAmpliCode.length > 0) {
          selectedElement.predecessor = newAmpliCode[0].newCode
        } else {
          selectedElement.productTypeSubType = 'AMPLI 1'
        }

        if (selectedElement.productTypeSubType === 'AMPLI 1') {
          selectedElement.predecessor = this.equipmentToMigrate.newNodeCode + '00'

          prefix = selectedElement.predecessor.substring(0, 6)
          newSequence = usedCounter.charCodeAt(0) + 1
        }
      } else {
        selectedElement.predecessor = selectedElement.originalPredecessor

        usedCounter = counter.stayAmpliCounter

        if (this.equipmentToMigrate.migrationListNew.filter(item => item.newName === selectedElement.predecessor).length <= 0) {
          selectedElement.predecessor = this.equipmentToMigrate.nodeCode + '00'
          selectedElement.productTypeSubType = 'AMPLI 1'
        }

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
        psCounter: 63,
        stayAmpliCounter: '0',
        stayPsCounter: 63
      }

      if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
        if (this.lastCodes.lastAmplifierCode !== null) {
          counter.ampliCounter = this.lastCodes.lastAmplifierCode.substring(6, 7)
          ampliCodePrefix = this.lastCodes.lastAmplifierCode.substring(0, 3)
        } else {
          ampliCodePrefix = this.equipmentToMigrate.newNodeCode.substring(0, 3)
        }

        if (this.lastCodes.lastPsCode !== null) {
          psCodePrefix = this.lastCodes.lastPsCode.substring(0, 6)

          if (this.lastCodes.lastPsCode.length > 6) {
            counter.psCounter = this.lastCodes.lastPsCode.charCodeAt(6)
            if ((counter.psCounter) < 64) counter.psCounter = 64
          } else {
            counter.psCounter += 1
          }
        } else {
          psCodePrefix = this.equipmentToMigrate.newNodeCode.substring(0, 6)
        }
      } else {
        if (!this.equipmentToMigrate.isNewNode && this.equipmentToMigrate.selectedMoveNodeOption !== 'C') {
          const lastNodeNumber = '000' + (parseInt(this.lastNodeCode.substring(3, 6), 10) + 1)
          this.equipmentToMigrate.newNodeCode = this.lastNodeCode.substring(0, 3) + lastNodeNumber.substr(lastNodeNumber.length - 3) + '00'
        }
        ampliCodePrefix = this.equipmentToMigrate.newNodeCode.substring(0, 3)
        psCodePrefix = this.equipmentToMigrate.newNodeCode.substring(0, 6)
      }

      let oldNewMap = []
      let oldNewStayMap = []

      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].productTypeSubType === 'FIBERNODE') {
          this.equipmentToMigrate.migrationListNew[i].newName = this.equipmentToMigrate.newNodeCode
        }

        if (this.equipmentToMigrate.migrationListNew[i].migrate || this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          if (this.equipmentToMigrate.migrationListNew[i].productTypeSubType === 'PS') {
            this.equipmentToMigrate.migrationListNew[i].newName = psCodePrefix

            if (counter.psCounter < 64) {
              counter.psCounter += 1
            } else {
              this.equipmentToMigrate.migrationListNew[i].newName = this.equipmentToMigrate.migrationListNew[i].newName +
                String.fromCharCode(++counter.psCounter)
            }

            this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.newNodeCode + '00'

            oldNewMap.push({
              oldCode: this.equipmentToMigrate.migrationListNew[i].equipmentName,
              newCode: this.equipmentToMigrate.migrationListNew[i].newName
            })
          } else if (this.equipmentToMigrate.migrationListNew[i].productTypeSubType !== 'FIBERNODE') {
            this.equipmentToMigrate.migrationListNew[i] = this.doConstructNewAmpliCode(ampliCodePrefix, counter,
              this.equipmentToMigrate.migrationListNew[i], oldNewMap, true)
          }
        } else {
          if (this.equipmentToMigrate.migrationListNew[i].productTypeSubType === 'PS') {
            counter.stayPsCounter += 1
            let strPsCounter = ''

            if (counter.stayPsCounter >= 65) {
              strPsCounter = String.fromCharCode(counter.stayPsCounter)
            }
            this.equipmentToMigrate.migrationListNew[i].newName = this.equipmentToMigrate.nodeCode.substring(0, 6) + strPsCounter
            this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.nodeCode + '00'

            oldNewStayMap.push({
              oldCode: this.equipmentToMigrate.migrationListNew[i].equipmentName,
              newCode: this.equipmentToMigrate.migrationListNew[i].newName
            })
          } else {
            this.equipmentToMigrate.migrationListNew[i] = this.doConstructNewAmpliCode(this.equipmentToMigrate.nodeCode.substring(0, 3), counter,
              this.equipmentToMigrate.migrationListNew[i], oldNewStayMap, false)
          }
        }
        this.equipmentToMigrate.migrationListNew[i].newNumber = this.equipmentToMigrate.migrationListNew[i].newName.substring(6)
        this.equipmentToMigrate.migrationListNew[i].newPredecessorNumber = this.equipmentToMigrate.migrationListNew[i].predecessor.substring(6)
      }
    },
    doInitializeMigrationList (removeNode) {
      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        let selectedElement = this.equipmentToMigrate.migrationListNew[i]

        if ((selectedElement.productTypeSubType === 'FIBERNODE')) {
          if (removeNode) {
            this.equipmentToMigrate.migrationListNew.splice(i--, 1)
            continue
          } else {
            selectedElement.predecessor = ''
            this.$set(selectedElement, 'newName', '')
            this.$set(selectedElement, 'migrate', true)
          }
        } else {
          this.$set(selectedElement, 'originalPredecessor', '')
          this.$set(selectedElement, 'originalPsCode', '')
          this.$set(selectedElement, 'newName', '')
          this.$set(selectedElement, 'migrate', true)

          selectedElement.originalPredecessor = selectedElement.predecessor
        }

        if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          this.$set(selectedElement, 'migrate', false)
        }

        this.$set(this.equipmentToMigrate.migrationListNew, i, selectedElement)
      }
      this.doAssignNewName()
    },
    doInitializeList () {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
        this.doInitializeMigrationList(true)
      } else if (this.equipmentToMigrate.selectedMoveNodeOption === 'N') {
        this.doInitializeMigrationList(false)
      }
    },
    doSetupNewHierarchy () {
      if (!this.equipmentToMigrate.isNewNode) {
        this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.selectedNewNode
      }

      if (this.equipmentToMigrate.newNodeCode === undefined) {
        this.$refs.stepper.previous()
      } else {
        this.equipmentToMigrate.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))

        if (this.equipmentToMigrate.selectedMoveNodeOption !== 'X') {
          this.lastNodeCode = this.fullNodeListByHub[this.fullNodeListByHub.length - 1]

          this.doInitializeList()
        } else {
          this.$q.loading.show()
          this.$axios.get(`${process.env.urlPrefix}getLastAmpliPs/`, { params: { nodeCode: this.equipmentToMigrate.newNodeCode } })
            .then((response) => {
              this.lastCodes = response.data
              this.doInitializeList()

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
      }
    },
    doChangeServiceHierarchy () {
      this.equipmentToMigrate.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))
      this.doInitializeMigrationList(false)
    },
    doStayOrMoveElement (row) {
      row.migrate = !row.migrate
      this.doAssignNewName()
    },
    doChangeName (cellRow) {
      cellRow.newName = this.getEquipmentPrefix(cellRow) + cellRow.newNumber
      if ((cellRow.newName.length === 6) || (cellRow.newName.length === 7)) {
        if (cellRow.productTypeSubType !== 'PS') {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: 'Cannot change ' + cellRow.productTypeSubType + ' to PS'
          })

          cellRow.newName = cellRow.newName + '0000'
          if (cellRow.productTypeSubType === 'FIBERNODE') {
            cellRow.newName = cellRow.newName.substring(0, 8)
          } else {
            cellRow.newName = cellRow.newName.substring(0, 10)
          }
        }
      } else if (cellRow.newName.length === 9) {
        cellRow.newName = cellRow.newName + '0'
      }

      if (cellRow.newName.length === 8) {
        cellRow.productTypeSubType = 'FIBERNODE'
        cellRow.predecessor = ''
      } else if (cellRow.newName.substring(cellRow.newName.length - 3) === '000') {
        cellRow.productTypeSubType = 'AMPLI 1'
        cellRow.predecessor = cellRow.newName.substring(0, 6) + '0000'
      } else if (cellRow.newName.substring(cellRow.newName.length - 2) === '00') {
        cellRow.productTypeSubType = 'AMPLI 2'
        cellRow.predecessor = cellRow.newName.substring(0, 7) + '000'
      } else if (cellRow.newName.substring(cellRow.newName.length - 1) === '0') {
        cellRow.productTypeSubType = 'AMPLI 3'
        cellRow.predecessor = cellRow.newName.substring(0, 8) + '00'
      } else if (cellRow.newName.length === 10) {
        cellRow.productTypeSubType = 'AMPLI 4'
        cellRow.predecessor = cellRow.newName.substring(0, 9) + '0'
      }

      if (this.equipmentToMigrate.migrationListNew.filter(item => item.newName === cellRow.newName).length > 1) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: cellRow.newName + ' already used. Please use another.'
        })
      }
    },
    doChangePredecessor (cellRow) {
      cellRow.predecessor = this.getEquipmentPrefix(cellRow) + cellRow.newPredecessorNumber
    },
    isPromoteVisible (row) {
      return (row.productTypeSubType !== 'PS' && row.productTypeSubType !== 'FIBERNODE' &&
        this.equipmentToMigrate.isNewNode && row.migrate && this.equipmentToMigrate.selectedMoveNodeOption === 'X')
    },
    isStayOrMoveVisible (row) {
      return (row.productTypeSubType !== 'FIBERNODE' && this.equipmentToMigrate.selectedMoveNodeOption !== 'N')
    },
    isAddPowerSupplyVisible () {
      return this.equipmentToMigrate.selectedMoveNodeOption !== 'C'
    },
    isAddAmplifierVisible () {
      return this.equipmentToMigrate.selectedMoveNodeOption !== 'C'
    },
    doAddPowerSupply () {
      const newPowerSupply = {
        id: 'X' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productTypeSubType: 'PS',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: '',
        amplifierCode: '',
        migrate: true
      }

      this.equipmentToMigrate.migrationListNew.unshift(newPowerSupply)
      this.doAssignNewName()
    },
    doAddAmplifier () {
      const newAmplifier = {
        id: 'Y' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productTypeSubType: 'AMPLI 1',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: '',
        migrate: true
      }

      this.equipmentToMigrate.migrationListNew.push(newAmplifier)
      this.doAssignNewName()
    },
    doCascadeUpgrade (row) {
      const listOfChild = this.equipmentToMigrate.migrationListNew.filter(item => item.predecessor === row.newName)
      for (let i = 0; i < listOfChild.length; i++) {
        if (row.productTypeSubType === 'FIBERNODE') {
          listOfChild[i].productTypeSubType = 'AMPLI 1'
        } else {
          listOfChild[i].productTypeSubType = 'AMPLI ' + (parseInt(row.productTypeSubType.substring(6), 10) + 1)
        }
        this.doCascadeUpgrade(listOfChild[i])
      }
    },
    doPromoteToFibernode (row) {
      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].productTypeSubType === 'FIBERNODE') {
          this.equipmentToMigrate.migrationListNew[i].productTypeSubType = 'AMPLI 1'
          this.equipmentToMigrate.migrationListNew[i].predecessor = row.newName

          this.doCascadeUpgrade(this.equipmentToMigrate.migrationListNew[i])
        }
      }
      row.predecessor = ''
      row.productTypeSubType = 'FIBERNODE'
      this.doCascadeUpgrade(row)
      row.newName = this.equipmentToMigrate.newNodeCode
      this.doAssignNewName()
    },
    getEquipmentPrefix (cellRow) {
      if (cellRow.migrate) {
        return this.equipmentToMigrate.newNodeCode.substring(0, 6)
      } else {
        return this.equipmentToMigrate.nodeCode.substring(0, 6)
      }
    },
    getPreviewChild (parent, list, migrate) {
      let rawChildren = list.filter(f => f.predecessor === parent &&
        f.productTypeSubType !== 'FIBERNODE' && f.migrate === migrate)
      let result = []

      for (let i = 0; i < rawChildren.length; i++) {
        let original = rawChildren[i].equipmentName

        if (original === '') {
          original = 'NEW'
        }

        let child = {
          label: rawChildren[i].newName,
          original: original,
          children: []
        }

        child.children = this.getPreviewChild(rawChildren[i].amplifierCode, list, migrate)

        result.push(child)
      }

      return result
    },
    doPreview () {
      // Source Preview
      const fiberNode = this.migrationListOriginal.filter(f => f.productTypeSubType === 'FIBERNODE')

      if (fiberNode.length !== 1) {
        this.validationResults.push({ id: this.validationResults.length, message: 'Source have invlaid node. Please check' })
      } else {
        let source = this.equipmentToMigrate.hubCode + ' - ' + fiberNode[0].equipmentName
        let original
        let sourceNodeReference = fiberNode[0].amplifierCode

        if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          original = fiberNode[0].equipmentName
          source = this.equipmentToMigrate.hubCode + ' - ' + this.equipmentToMigrate.newNodeCode
          sourceNodeReference = this.equipmentToMigrate.newNodeCode + '00'
        }
        let sourceTree = {
          label: source,
          original: original,
          header: 'root',
          children: []
        }

        const child = this.getPreviewChild(sourceNodeReference, this.equipmentToMigrate.migrationListNew, false)

        if (child.length > 0) {
          sourceTree.children = child
        }

        this.$set(this.sourcePreview, 0, sourceTree)

        this.$refs.sourcePreview.expandAll()
      }

      // Targe Preview
      let original
      if (this.equipmentToMigrate.isNewNode) {
        const promotedAmpli = this.equipmentToMigrate.migrationListNew.filter(f => f.productTypeSubType === 'FIBERNODE')

        if (promotedAmpli.length === 1) {
          original = promotedAmpli[0].equipmentName
        } else {
          original = 'NEW'
        }
      }

      let targetTree = {
        label: this.equipmentToMigrate.newHubCode + ' - ' + this.equipmentToMigrate.newNodeCode,
        original: original,
        header: 'root',
        children: []
      }

      const child = this.getPreviewChild(this.equipmentToMigrate.newNodeCode + '00', this.equipmentToMigrate.migrationListNew, true)

      if (child.length > 0) {
        targetTree.children = child
      }

      this.$set(this.targetPreview, 0, targetTree)

      this.$refs.targetPreview.expandAll()
    },
    doValidateMigration () {
      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].productTypeSubType !== 'PS') {
          this.equipmentToMigrate.migrationListNew[i].amplifierCode = (this.equipmentToMigrate.migrationListNew[i].newName +
            '0000').substring(0, 10)
        }
      }

      this.$axios.post(`${process.env.urlPrefix}doValidate/`, this.equipmentToMigrate)
        .then((response) => {
          this.validationResults = []
          this.$set(this.sourcePreview, 0, [])
          this.$set(this.targetPreview, 0, [])

          if (response.data.length === 0) {
            this.doPreview()
          } else {
            for (let i = 0; i < response.data.length; i++) {
              this.validationResults.push({ id: this.validationResults.length, message: response.data[i] })
            }
          }
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    },
    doChangeMoveNodeOption () {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        this.isHierarchyDisabled = true
      } else {
        this.isHierarchyDisabled = false
      }
    },
    doCheckStep () {
      if (this.migrationStep === 1) {
        this.reloadMigrationList = true
      } else if (this.migrationStep === 2) {
        if (this.reloadMigrationList) {
          this.doSetupNewHierarchy()
        }
        this.reloadMigrationList = true
      } else if (this.migrationStep === 3) {
        if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          this.doChangeServiceHierarchy()
        } else {
          this.reloadMigrationList = false
        }

        this.doValidateMigration()
      }
    },
    doExecuteMigration () {
      this.$q.loading.show()

      this.$axios.post(`${process.env.urlPrefix}doExecuteMigration/`, this.equipmentToMigrate)
        .then((response) => {
          if (response.data.length === 0) {
            this.showMigrationForm = false
          } else {
            for (let i = 0; i < response.data.length; i++) {
              this.validationResults.push({ id: this.validationResults.length, message: response.data[i] })
            }
          }

          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })

          this.$q.loading.hide()
        })
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
