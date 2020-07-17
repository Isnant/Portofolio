export default {
  data () {
    return {
      file: undefined,
      productTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      subTypeList: [],
      manufacturerList: [],
      brandList: [],
      hubTrue: false,
      hubFalse: true,
      input: {
        id: '',
        equipmentCategory: 'Network',
        equipmentName: '',
        description: '',
        productType: '',
        productSubType: '',
        productSeries: '',
        manufacturer: '',
        brand: '',
        serialNumberDevice: '',
        serialNumberInternal: '',
        quantity: '',
        rack: '',
        chassis: '',
        slot: '',
        hubCode: '',
        hubAddress: '',
        bdfCode: '',
        nodeCode: '',
        psCode: '',
        amplifierCode: '',
        service: '',
        technology: '',
        ipAddress: '',
        macAddress: '',
        capacity: '',
        capacityUnits: '',
        usedCapacity: '',
        capacity1: '',
        capacity2: '',
        capacity3: '',
        noOfPortFront: '',
        noOfPortRear: '',
        productionYear: '',
        assetLifetime: '',
        purchasedDate: '',
        installationDate: '',
        installedBy: '',
        pic: '',
        division: '',
        department: '',
        propertyOf: '',
        equipmentStatus: '',
        predecessor: '',
        itCode: '',
        buildingName: '',
        tower: '',
        floor: '',
        complexName: '',
        streetName: '',
        streetNumber: '',
        kelurahan: '',
        postalCode: '',
        direction: '',
        normalDistance: '',
        updateDistanceDate: '',
        remarks: '',
        cascades: '',
        amplifierNotes: '',
        memoActiveDate: '',
        electricalStatus: '',
        lastModifiedByExcel: '',
        isComplete: ''
      },
      equipmentCategoryList: ['Hub', 'Field', 'Network'],
      searchVal: {
        equipmentCategory: 'Network',
        productType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All',
        nodeCode: ''
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
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
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
      modalAddNewAsset: false,
      addHub: true,
      modalAddField: false,
      modalAddNetwork: false,
      uploadCategory: 'field',
      migrationStep: 1,
      showMigrationForm: false,
      migrationTab: 'newConfig',
      reloadMigrationList: true,
      equipmentToMigrate: {
        hubCode: undefined,
        nodeCode: undefined,
        service: undefined,
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
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
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
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
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
    doMainFillTableResult (pagedEquipment) {
      this.listOfEquipment = pagedEquipment.content
      this.equipmentPagination.rowsNumber = pagedEquipment.totalElements
      this.equipmentPagination.page = pagedEquipment.number + 1
    },
    doMainInitPage () {
      this.$axios.post(`${process.env.urlPrefix}getNetworkInitPage/`, {})
        .then((response) => {
          this.doMainFillTableResult(response.data.listOfEquipment)

          this.assetCategoryList = response.data.listOfAssetCategory
          this.productTypeList = response.data.listOfProductSubType.map(productType => productType.value)
          this.hubCodeList = response.data.listOfHub.map(hubCode => hubCode.value)
          this.bdfCodeList = response.data.listOfBdf
          this.manufacturerList = response.data.listOfManufacturer
          console.log(this.manufacturerList)

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
    doMainRefresh (params) {
      this.$q.loading.show()
      console.log(params)

      this.$axios.get(`${process.env.urlPrefix}getFieldPagedEquipment/`, {
        params: params
      })
        .then((response) => {
          console.log(response.data)
          this.doMainFillTableResult(response.data)
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
    doMainEquipmentRefreshList () {
      const params = {
        pageIndex: 0,
        pageSize: this.equipmentPagination.rowsPerPage,
        searchVal: this.searchVal,
        sortBy: this.equipmentPagination.sortBy,
        descending: this.equipmentPagination.descending
      }

      this.doMainRefresh(params)
    },
    saveEquipment () {
      // Network
      this.$refs.nEquipmentName.validate()
      this.$refs.nProductType.validate()
      this.$refs.nProductSubType.validate()
      this.$refs.nProductSeries.validate()
      this.$refs.nManufacturer.validate()
      this.$refs.nBrand.validate()
      this.$refs.nQuantity.validate()
      this.$refs.nHubAddress.validate()
      this.$refs.nBdfCode.validate()
      this.$refs.nDivision.validate()
      this.$refs.nDepartment.validate()
      this.$refs.nPropertyOf.validate()
      this.$refs.nEquipmentStatus.validate()
      this.$refs.nDescription.validate()
      this.$refs.nItCode.validate()

      var n1 = this.$refs.nEquipmentName.hasError
      var n2 = this.$refs.nProductType.hasError
      var n3 = this.$refs.nProductSubType.hasError
      var n4 = this.$refs.nProductSeries.hasError
      var n5 = this.$refs.nManufacturer.hasError
      var n6 = this.$refs.nBrand.hasError
      var n7 = this.$refs.nQuantity.hasError
      var n9 = this.$refs.nHubAddress.hasError
      var n10 = this.$refs.nBdfCode.hasError
      var n11 = this.$refs.nDivision.hasError
      var n12 = this.$refs.nDepartment.hasError
      var n13 = this.$refs.nPropertyOf.hasError
      var n14 = this.$refs.nEquipmentStatus.hasError
      var n15 = this.$refs.nDescription.hasError
      var n16 = this.$refs.nItCode.hasError

      if (this.input.hubCode === '') {
        n9 = false
      } else {
        n10 = false
      }

      if (!n1 && !n2 && !n3 && !n4 && !n5 && !n6 && !n7 && !n9 && !n10 && !n11 && !n12 && !n13 && !n14 && !n15 && !n16) {
        this.doSaveEquipment()
      }
    },
    doSaveEquipment () {
      this.$q.loading.show()
      console.log(this.input)
      this.$axios.post(`${process.env.urlPrefix}doSaveEquipment`, this.input)
        .then((response) => {
          this.$q.notify({
            color: 'positive',
            icon: 'report_problem',
            message: `successfully submitted`
          })
          this.$q.loading.hide()
          this.modalAddNewAsset = false
          this.doRefresh()
          this.doMainInitPage()
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
          this.$q.loading.hide()
        })
    },
    doMainEquipmentChangePage (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const params = {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
        searchVal: this.searchVal,
        sortBy: sortBy,
        descending: descending
      }

      this.doMainRefresh(params)
    },
    doUploadFile (file) {
      this.$q.loading.show()

      let fr = new FileReader()
      fr.onload = (e) => {
        this.$axios.post(`${process.env.urlPrefix}uploadField`, { file64: e.target.result })
          .then((response) => {
            this.$q.loading.hide()

            this.$q.notify({
              color: 'positive',
              icon: 'info',
              message: 'File successfully uploaded'
            })
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
      fr.readAsDataURL(this.$refs.fieldExcelFile.files[0])
    },
    doMainOpenMigrationForm (cell) {
      this.showMigrationForm = true
      this.migrationStep = 1
      this.destinationNodeOptions = []

      this.equipmentToMigrate.hubCode = cell.row.hubCode
      this.equipmentToMigrate.nodeCode = cell.row.nodeCode
      this.equipmentToMigrate.service = cell.row.service
      this.equipmentToMigrate.newHubCode = cell.row.hubCode
      this.equipmentToMigrate.migrationListNew = []
      this.equipmentToMigrate.isNewNode = false
      this.equipmentToMigrate.newServiceNodeNumber = undefined

      this.equipmentToMigrate.selectedMoveNodeOption = this.moveNodeOptions[0].value

      this.getMigrationEquipment(this.equipmentToMigrate.nodeCode)
    },
    doMigrationChangeHub () {
      this.$axios.get(`${process.env.urlPrefix}getNodeByHub/`,
        {
          params: {
            hubCode: this.equipmentToMigrate.newHubCode,
            service: this.equipmentToMigrate.service
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
    doMigrationChangeNewNode () {
      if (this.equipmentToMigrate.isNewNode) {
        this.equipmentToMigrate.newNodeCode = undefined
        this.equipmentToMigrate.newNodeNumber = undefined
      }
    },
    doMigrationFilterNode (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.destinationNodeOptions = this.fullNodeListByHub.filter(f => f.toLowerCase().indexOf(needle) > -1)
      })
    },
    doMigrationValidateNewNode () {
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
    getMigrationEquipment (nodeCodeParam) {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getNodeChildMig`, { params: { nodeCode: nodeCodeParam } })
        .then((response) => {
          this.migrationListOriginal = response.data

          this.doMigrationChangeHub()
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
    doMigrationConstructNewAmpliCode (ampliCodePrefix, counter, selectedElement, oldNewMap, isMovedEquipment) {
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
          selectedElement.productType = 'AMPLI 1'
        }

        if (selectedElement.productType === 'AMPLI 1') {
          selectedElement.predecessor = this.equipmentToMigrate.newNodeCode + '00'

          prefix = selectedElement.predecessor.substring(0, 6)
          newSequence = usedCounter.charCodeAt(0) + 1
        }
      } else {
        selectedElement.predecessor = selectedElement.originalPredecessor
        selectedElement.psCode = selectedElement.originalPsCode

        usedCounter = counter.stayAmpliCounter

        if (this.equipmentToMigrate.migrationListNew.filter(item => item.newName === selectedElement.predecessor).length <= 0) {
          selectedElement.predecessor = this.equipmentToMigrate.nodeCode + '00'
          selectedElement.productType = 'AMPLI 1'
        }

        if (selectedElement.productType === 'AMPLI 1') {
          prefix = selectedElement.predecessor.substring(0, 6)
          newSequence = usedCounter.charCodeAt(0) + 1
        }
      }

      if (selectedElement.productType === 'AMPLI 2') {
        prefix = selectedElement.predecessor.substring(0, 6)
        staticCounter = usedCounter.substring(0, 1)
        if (usedCounter.length === 1) {
          newSequence = 49
        } else {
          newSequence = usedCounter.charCodeAt(1) + 1
        }
      } else if (selectedElement.productType === 'AMPLI 3') {
        prefix = selectedElement.predecessor.substring(0, 6)
        staticCounter = usedCounter.substring(0, 2)
        if (usedCounter.length === 2) {
          newSequence = 49
        } else {
          newSequence = usedCounter.charCodeAt(2) + 1
        }
      } else if (selectedElement.productType === 'AMPLI 4') {
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
    doMigrationAssignNewName () {
      let ampliCodePrefix
      let psCodePrefix

      let counter = {
        ampliCounter: '0',
        psCounter: 63,
        stayAmpliCounter: '0',
        stayPsCounter: 63
      }

      let oldNewMap = []
      let oldNewStayMap = []
      let defaultOldPsCode
      let defaultNewPsCode

      if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
        if (this.lastCodes.lastAmplifierCode !== null) {
          counter.ampliCounter = this.lastCodes.lastAmplifierCode.substring(6, 7)
          ampliCodePrefix = this.lastCodes.lastAmplifierCode.substring(0, 3)
        } else {
          ampliCodePrefix = this.equipmentToMigrate.newNodeCode.substring(0, 3)
        }

        if (this.lastCodes.lastPsCode !== null) {
          defaultNewPsCode = this.lastCodes.lastPsCode
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

      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if ((defaultNewPsCode !== undefined) && (this.equipmentToMigrate.migrationListNew[i].productType !== 'PS')) {
          this.equipmentToMigrate.migrationListNew[i].psCode = defaultNewPsCode
        }

        if (this.equipmentToMigrate.migrationListNew[i].productType === 'FIBERNODE') {
          this.equipmentToMigrate.migrationListNew[i].newName = this.equipmentToMigrate.newNodeCode
        }

        if (this.equipmentToMigrate.migrationListNew[i].migrate || this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          if (this.equipmentToMigrate.migrationListNew[i].productType === 'PS') {
            this.equipmentToMigrate.migrationListNew[i].newName = psCodePrefix

            if (counter.psCounter < 64) {
              counter.psCounter += 1
            } else {
              this.equipmentToMigrate.migrationListNew[i].newName = this.equipmentToMigrate.migrationListNew[i].newName +
                String.fromCharCode(++counter.psCounter)
            }

            this.equipmentToMigrate.migrationListNew[i].psCode = this.equipmentToMigrate.migrationListNew[i].newName
            defaultNewPsCode = this.equipmentToMigrate.migrationListNew[i].newName

            this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.newNodeCode + '00'

            oldNewMap.push({
              oldCode: this.equipmentToMigrate.migrationListNew[i].equipmentName,
              newCode: this.equipmentToMigrate.migrationListNew[i].newName
            })
          } else if (this.equipmentToMigrate.migrationListNew[i].productType !== 'FIBERNODE') {
            this.equipmentToMigrate.migrationListNew[i] = this.doMigrationConstructNewAmpliCode(ampliCodePrefix, counter,
              this.equipmentToMigrate.migrationListNew[i], oldNewMap, true)
          }
        } else {
          if (this.equipmentToMigrate.migrationListNew[i].productType === 'PS') {
            counter.stayPsCounter += 1
            let strPsCounter = ''

            if (counter.stayPsCounter >= 65) {
              strPsCounter = String.fromCharCode(counter.stayPsCounter)
            }
            this.equipmentToMigrate.migrationListNew[i].newName = this.equipmentToMigrate.nodeCode.substring(0, 6) + strPsCounter
            this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.nodeCode + '00'

            this.equipmentToMigrate.migrationListNew[i].psCode = this.equipmentToMigrate.migrationListNew[i].newName
            defaultOldPsCode = this.equipmentToMigrate.migrationListNew[i].newName

            oldNewStayMap.push({
              oldCode: this.equipmentToMigrate.migrationListNew[i].equipmentName,
              newCode: this.equipmentToMigrate.migrationListNew[i].newName
            })
          } else {
            this.equipmentToMigrate.migrationListNew[i] = this.doMigrationConstructNewAmpliCode(this.equipmentToMigrate.nodeCode.substring(0, 3), counter,
              this.equipmentToMigrate.migrationListNew[i], oldNewStayMap, false)

            if (defaultOldPsCode !== undefined) {
              this.equipmentToMigrate.migrationListNew[i].psCode = defaultOldPsCode
            } else {
              this.equipmentToMigrate.migrationListNew[i].psCode = this.equipmentToMigrate.migrationListNew[i].originalPsCode
            }
          }
        }
        this.equipmentToMigrate.migrationListNew[i].newNumber = this.equipmentToMigrate.migrationListNew[i].newName.substring(6)
        this.equipmentToMigrate.migrationListNew[i].newPredecessorNumber = this.equipmentToMigrate.migrationListNew[i].predecessor.substring(6)
      }
    },
    doMigrationInitializeEquipmentList (removeNode) {
      const oppositeService = this.equipmentToMigrate.service === 'DIGITAL' ? 'ANALOG' : 'DIGITAL'

      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        let selectedElement = this.equipmentToMigrate.migrationListNew[i]

        if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          selectedElement.service = oppositeService
        }

        if ((selectedElement.productType === 'FIBERNODE')) {
          if (removeNode) {
            this.equipmentToMigrate.migrationListNew.splice(i--, 1)
            continue
          } else {
            selectedElement.predecessor = ''
            this.$set(selectedElement, 'newName', '')
            this.$set(selectedElement, 'migrate', true)
          }
        } else {
          this.$set(selectedElement, 'originalPredecessor', selectedElement.predecessor)
          this.$set(selectedElement, 'originalPsCode', selectedElement.psCode)
          this.$set(selectedElement, 'newName', '')
          this.$set(selectedElement, 'migrate', true)
        }

        if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          this.$set(selectedElement, 'migrate', false)
        }

        this.$set(this.equipmentToMigrate.migrationListNew, i, selectedElement)
      }
      this.doMigrationAssignNewName()
    },
    doMigrationInitializeList () {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
        this.doMigrationInitializeEquipmentList(true)
      } else if (this.equipmentToMigrate.selectedMoveNodeOption === 'N') {
        this.doMigrationInitializeEquipmentList(false)
      }
    },
    doMigrationSetupNewHierarchy () {
      if (!this.equipmentToMigrate.isNewNode) {
        this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.selectedNewNode
      }

      if (this.equipmentToMigrate.newNodeCode === undefined) {
        this.$refs.stepper.previous()
      } else {
        this.equipmentToMigrate.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))

        if (this.equipmentToMigrate.selectedMoveNodeOption !== 'X') {
          this.lastNodeCode = this.fullNodeListByHub[this.fullNodeListByHub.length - 1]

          this.doMigrationInitializeList()
        } else {
          this.$q.loading.show()
          this.$axios.get(`${process.env.urlPrefix}getLastAmpliPs/`, { params: { nodeCode: this.equipmentToMigrate.newNodeCode } })
            .then((response) => {
              this.lastCodes = response.data
              this.doMigrationInitializeList()

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
    doMigrationChangeServiceHierarchy () {
      this.equipmentToMigrate.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))
      this.doMigrationInitializeEquipmentList(false)
    },
    doMigrationStayOrMove (row) {
      row.migrate = !row.migrate
      this.doMigrationAssignNewName()
    },
    doMigrationChangeEquipmentName (cellRow) {
      cellRow.newName = this.getMigrationEquipmentPrefix(cellRow) + cellRow.newNumber
      if ((cellRow.newName.length === 6) || (cellRow.newName.length === 7)) {
        if (cellRow.productType !== 'PS') {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: 'Cannot change ' + cellRow.productType + ' to PS'
          })

          cellRow.newName = cellRow.newName + '0000'
          if (cellRow.productType === 'FIBERNODE') {
            cellRow.newName = cellRow.newName.substring(0, 8)
          } else {
            cellRow.newName = cellRow.newName.substring(0, 10)
          }
        }
      } else if (cellRow.newName.length === 9) {
        cellRow.newName = cellRow.newName + '0'
      }

      if (cellRow.newName.length === 8) {
        cellRow.productType = 'FIBERNODE'
        cellRow.predecessor = ''
      } else if (cellRow.newName.substring(cellRow.newName.length - 3) === '000') {
        cellRow.productType = 'AMPLI 1'
        cellRow.predecessor = cellRow.newName.substring(0, 6) + '0000'
      } else if (cellRow.newName.substring(cellRow.newName.length - 2) === '00') {
        cellRow.productType = 'AMPLI 2'
        cellRow.predecessor = cellRow.newName.substring(0, 7) + '000'
      } else if (cellRow.newName.substring(cellRow.newName.length - 1) === '0') {
        cellRow.productType = 'AMPLI 3'
        cellRow.predecessor = cellRow.newName.substring(0, 8) + '00'
      } else if (cellRow.newName.length === 10) {
        cellRow.productType = 'AMPLI 4'
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
    doMigrationChangePredecessor (cellRow) {
      cellRow.predecessor = this.getMigrationEquipmentPrefix(cellRow) + cellRow.newPredecessorNumber
    },
    isMigrationPromoteVisible (row) {
      return (row.productType !== 'PS' && row.productType !== 'FIBERNODE' &&
        this.equipmentToMigrate.isNewNode && row.migrate && this.equipmentToMigrate.selectedMoveNodeOption === 'X')
    },
    isMigrationStayOrMoveVisible (row) {
      return (row.productType !== 'FIBERNODE' && this.equipmentToMigrate.selectedMoveNodeOption !== 'N')
    },
    isMigrationAddPowerSupplyVisible () {
      return this.equipmentToMigrate.selectedMoveNodeOption !== 'C'
    },
    isMigrationAddAmplifierVisible () {
      return this.equipmentToMigrate.selectedMoveNodeOption !== 'C'
    },
    doMigrationAddPowerSupply () {
      const newPowerSupply = {
        id: 'X' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productType: 'PS',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: '',
        amplifierCode: '',
        migrate: true
      }

      this.equipmentToMigrate.migrationListNew.unshift(newPowerSupply)
      this.doMigrationAssignNewName()
    },
    doMigrationAddAmplifier () {
      const newAmplifier = {
        id: 'Y' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productType: 'AMPLI 1',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: '',
        migrate: true
      }

      this.equipmentToMigrate.migrationListNew.push(newAmplifier)
      this.doMigrationAssignNewName()
    },
    doMigrationCascadeUpgrade (row) {
      const listOfChild = this.equipmentToMigrate.migrationListNew.filter(item => item.predecessor === row.newName)
      for (let i = 0; i < listOfChild.length; i++) {
        if (row.productType === 'FIBERNODE') {
          listOfChild[i].productType = 'AMPLI 1'
        } else {
          listOfChild[i].productType = 'AMPLI ' + (parseInt(row.productType.substring(6), 10) + 1)
        }
        this.doMigrationCascadeUpgrade(listOfChild[i])
      }
    },
    doMigrationPromoteToFibernode (row) {
      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].productType === 'FIBERNODE') {
          this.equipmentToMigrate.migrationListNew[i].productType = 'AMPLI 1'
          this.equipmentToMigrate.migrationListNew[i].predecessor = row.newName

          this.doMigrationCascadeUpgrade(this.equipmentToMigrate.migrationListNew[i])
        }
      }
      row.predecessor = ''
      row.productType = 'FIBERNODE'
      this.doMigrationCascadeUpgrade(row)
      row.newName = this.equipmentToMigrate.newNodeCode
      this.doMigrationAssignNewName()
    },
    getMigrationEquipmentPrefix (cellRow) {
      if (cellRow.migrate) {
        return this.equipmentToMigrate.newNodeCode.substring(0, 6)
      } else {
        return this.equipmentToMigrate.nodeCode.substring(0, 6)
      }
    },
    getMigrationPreviewChild (parent, list, migrate) {
      let rawChildren = list.filter(f => f.predecessor === parent &&
        f.productType !== 'FIBERNODE' && f.migrate === migrate)
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

        child.children = this.getMigrationPreviewChild(rawChildren[i].amplifierCode, list, migrate)

        result.push(child)
      }

      return result
    },
    doMigrationPreview () {
      // Source Preview
      const fiberNode = this.migrationListOriginal.filter(f => f.productType === 'FIBERNODE')

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

        const child = this.getMigrationPreviewChild(sourceNodeReference, this.equipmentToMigrate.migrationListNew, false)

        if (child.length > 0) {
          sourceTree.children = child
        }

        this.$set(this.sourcePreview, 0, sourceTree)

        this.$refs.sourcePreview.expandAll()
      }

      // Targe Preview
      let original
      if (this.equipmentToMigrate.isNewNode) {
        const promotedAmpli = this.equipmentToMigrate.migrationListNew.filter(f => f.productType === 'FIBERNODE')

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

      const child = this.getMigrationPreviewChild(this.equipmentToMigrate.newNodeCode + '00', this.equipmentToMigrate.migrationListNew, true)

      if (child.length > 0) {
        targetTree.children = child
      }

      this.$set(this.targetPreview, 0, targetTree)

      this.$refs.targetPreview.expandAll()
    },
    doMigrationValidate () {
      this.$q.loading.show()

      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].productType !== 'PS') {
          this.equipmentToMigrate.migrationListNew[i].amplifierCode = (this.equipmentToMigrate.migrationListNew[i].newName +
            '0000').substring(0, 10)
        }

        this.equipmentToMigrate.migrationListNew[i].nodeCode = this.equipmentToMigrate.newNodeCode
      }

      this.$axios.post(`${process.env.urlPrefix}doValidate/`, this.equipmentToMigrate)
        .then((response) => {
          this.validationResults = []
          this.$set(this.sourcePreview, 0, [])
          this.$set(this.targetPreview, 0, [])

          if (response.data.length === 0) {
            this.doMigrationPreview()
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
    },
    doMigrationChangeMoveNodeOption () {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        this.isHierarchyDisabled = true
      } else {
        this.isHierarchyDisabled = false
      }
    },
    doMigrationCheckStep () {
      if (this.migrationStep === 1) {
        this.reloadMigrationList = true
      } else if (this.migrationStep === 2) {
        if (this.reloadMigrationList) {
          this.doMigrationSetupNewHierarchy()
        }
        this.reloadMigrationList = true
      } else if (this.migrationStep === 3) {
        if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
          this.doMigrationChangeServiceHierarchy()
        } else {
          this.reloadMigrationList = false
        }

        this.doMigrationValidate()
      }
    },
    doMigrationExecute () {
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

          this.doMainEquipmentRefreshList()
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
    },
    doChangeEquipmentCategory () {
      if (this.input.equipmentCategory === 'Hub') {
        this.addHub = true
        this.addField = false
        this.addNetwork = false
        this.input.bdfCode = ''
        this.input.nodeCode = ''
        this.input.psCode = ''
        this.input.amplifierCode = ''
        this.input.predecessor = ''
        this.input.itCode = ''
        this.input.buildingName = ''
        this.input.tower = ''
        this.input.floor = ''
        this.input.complexName = ''
        this.input.streetName = ''
        this.input.streetNumber = ''
        this.input.kelurahan = ''
        this.input.postalCode = ''
        this.input.direction = ''
        this.input.normalDistance = ''
        this.input.updateDistanceDate = ''
      } else if (this.input.equipmentCategory === 'Field') {
        this.addHub = false
        this.addField = true
        this.addNetwork = false
      } else if (this.input.equipmentCategory === 'Network') {
        this.addHub = false
        this.addField = false
        this.addNetwork = true
        this.input.nodeCode = ''
        this.input.psCode = ''
        this.input.amplifierCode = ''
      }
    },
    getSubType () {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          pid: this.input.productType
        }
      })
        .then((response) => {
          console.log(response.data)
          this.subTypeList = response.data.map(subType => subType.id)
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
    },
    getBrand () {
      this.$q.loading.show()
      this.input.manufacturer = this.input.manufacturer.value
      this.$axios.get(`${process.env.urlPrefix}getBrand`, {
        params: {
          pid: this.input.manufacturer
        }
      })
        .then((response) => {
          console.log(response.data)
          this.brandList = response.data.map(brand => brand.brand)
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
    },
    hubChange () {
      if (this.input.hubCode === '') {
        this.input.hubAddress = ''
        this.hubFalse = true
        this.hubTrue = false
      } else {
        this.input.bdfCode = ''
        this.hubTrue = true
        this.hubFalse = false
      }
    },
    doEdit (cell) {
      this.input = JSON.parse(JSON.stringify(cell.row))
      this.modalAddNewAsset = true
    },
    doRefresh () {
      this.input = {
        id: '',
        equipmentCategory: 'Network',
        equipmentName: '',
        description: '',
        productType: '',
        productSubType: '',
        productSeries: '',
        manufacturer: '',
        brand: '',
        serialNumberDevice: '',
        serialNumberInternal: '',
        quantity: '',
        rack: '',
        chassis: '',
        slot: '',
        hubCode: '',
        hubAddress: '',
        bdfCode: '',
        nodeCode: '',
        psCode: '',
        amplifierCode: '',
        service: '',
        technology: '',
        ipAddress: '',
        macAddress: '',
        capacity: '',
        capacityUnits: '',
        usedCapacity: '',
        capacity1: '',
        capacity2: '',
        capacity3: '',
        noOfPortFront: '',
        noOfPortRear: '',
        productionYear: '',
        assetLifetime: '',
        purchasedDate: '',
        installationDate: '',
        installedBy: '',
        pic: '',
        division: '',
        department: '',
        propertyOf: '',
        equipmentStatus: '',
        predecessor: '',
        itCode: '',
        buildingName: '',
        tower: '',
        floor: '',
        complexName: '',
        streetName: '',
        streetNumber: '',
        kelurahan: '',
        postalCode: '',
        direction: '',
        normalDistance: '',
        updateDistanceDate: '',
        remarks: '',
        cascades: '',
        amplifierNotes: '',
        memoActiveDate: '',
        electricalStatus: '',
        lastModifiedByExcel: '',
        isComplete: ''
      }
    }
  },
  beforeMount () {
    this.doMainInitPage()
  }
}
