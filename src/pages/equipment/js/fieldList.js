import moment from 'moment'
export default {
  data () {
    return {
      isActive: false,
      colorLabel: 'orange',
      bluePsCode: false,
      uploadButton: false,
      orangePsCode: true,
      psCodeWarningText: '',
      blueNodeCode: false,
      orangeNodeCode: true,
      blueAmplifierCode: false,
      orangeAmplifierCode: true,
      amplifierCodeWarningText: '',
      file: undefined,
      productTypeList: [],
      newProductTypeList: ['AMPLIFIER', 'POWER SUPPLY', 'FIBERNODE'],
      hubCodeList: [],
      bdfCodeList: [],
      subTypeList: [],
      hubCodeRoomList: [],
      technologyList: [],
      serviceList: [],
      capacityUnitsList: [],
      departmentList: [],
      divisionList: [],
      statusReasonList: [],
      propertyOfList: [],
      manufacturerList: [],
      brandList: [],
      migrationType: '',
      input: {
        id: '',
        equipmentCategory: 'Field',
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
        fatCode: '',
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
        homepassed: '',
        internetAccount: '',
        customerType: '',
        memoActiveDate: '',
        electricalStatus: '',
        lastModifiedByExcel: '',
        isComplete: ''
      },
      equipmentCategoryList: ['Hub', 'Field', 'Network'],
      searchVal: {
        equipmentCategory: 'Field',
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
      errorListColumn: [
        {
          name: 'message',
          label: 'Error Message',
          field: 'message',
          align: 'left'
        }
      ],
      listOfEquipment: [],
      listOfError: [],
      modalUpload: false,
      modalError: false,
      modalWarning: false,
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
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left'
        },
        {
          name: 'equipmentName',
          label: 'Code',
          field: 'equipmentName',
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
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'center'
        },
        {
          name: 'equipmentName',
          label: 'Source Code',
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
          name: 'newPredecessor',
          label: 'Predecessor',
          field: 'newPredecessor',
          align: 'center'
        },
        {
          name: 'newPsCode',
          label: 'Power Supply',
          field: 'newPsCode',
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
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}getFieldInitPage/`, {})
        .then((response) => {
          this.doMainFillTableResult(response.data.listOfEquipment)
          this.assetCategoryList = response.data.listOfAssetCategory
          this.productTypeList = response.data.listOfProductSubType
          this.hubCodeList = response.data.listOfHub.map(hubCode => hubCode.value)
          this.bdfCodeList = response.data.listOfBdf
          this.manufacturerList = response.data.listOfManufacturer
          this.technologyList = response.data.listOfTechnology
          this.serviceList = response.data.listOfService
          this.statusReasonList = response.data.listOfStatusReason
          this.departmentList = response.data.listOfDepartment
          this.divisionList = response.data.listOfDivision
          this.propertyOfList = response.data.listOfPropertyOf
          this.capacityUnitsList = response.data.listOfCapacityUnits
          this.hubCodeRoomList = response.data.listOfHubCodeRoom
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

      this.$axios.get(`${process.env.urlPrefix}getFieldPagedEquipment/`, {
        params: params
      })
        .then((response) => {
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
    saveEquipment () {
      // field
      this.$refs.fEquipmentName.validate()
      this.$refs.fProductType.validate()
      this.$refs.fProductSubType.validate()
      this.$refs.fProductSeries.validate()
      this.$refs.fManufacturer.validate()
      this.$refs.fBrand.validate()
      this.$refs.fQuantity.validate()
      this.$refs.fHubCode.validate()
      this.$refs.fDivision.validate()
      this.$refs.fDepartment.validate()
      this.$refs.fPropertyOf.validate()
      this.$refs.fStatusReason.validate()
      this.$refs.fDescription.validate()
      this.$refs.fService.validate()
      this.$refs.fTechnology.validate()
      this.$refs.fCapacity.validate()
      this.$refs.fCapacityUnits.validate()
      this.$refs.fPredecessor.validate()
      this.$refs.fItCode.validate()

      var f1 = this.$refs.fEquipmentName.hasError
      var f2 = this.$refs.fProductType.hasError
      var f3 = this.$refs.fProductSubType.hasError
      var f4 = this.$refs.fProductSeries.hasError
      var f5 = this.$refs.fManufacturer.hasError
      var f6 = this.$refs.fBrand.hasError
      var f7 = this.$refs.fQuantity.hasError
      var f8 = this.$refs.fHubCode.hasError
      var f9 = this.$refs.fDivision.hasError
      var f10 = this.$refs.fDepartment.hasError
      var f11 = this.$refs.fPropertyOf.hasError
      var f12 = this.$refs.fStatusReason.hasError
      var f13 = this.$refs.fDescription.hasError
      var f14 = false
      var f15 = false
      var f16 = false
      var f17 = this.$refs.fService.hasError
      var f18 = this.$refs.fTechnology.hasError
      var f19 = this.$refs.fCapacity.hasError
      var f20 = this.$refs.fCapacityUnits.hasError
      var f21 = this.$refs.fPredecessor.hasError
      var f22 = this.$refs.fItCode.hasError

      if (this.input.productType === 'POWER SUPPLY' || this.input.productType === 'POWER SUPPLY INDOOR') {
        if (this.input.psCode.length === 6 || this.input.psCode.length === 7) {
          this.$refs.fPowerSupplyCodeBlue.validate()
          f15 = this.$refs.fPowerSupplyCodeBlue.hasError
        } else {
          this.$refs.fPowerSupplyCodeOrange.validate()
          f15 = this.$refs.fPowerSupplyCodeOrange.hasError
        }
      } else {
        this.$refs.fPowerSupplyCodeElse.validate()
        f15 = this.$refs.fPowerSupplyCodeElse.hasError
      }

      if (this.input.productType === 'AMPLIFIER' || this.input.productType === 'AMPLIFIER INDOOR') {
        if (this.input.amplifierCode.length === 10) {
          this.$refs.fAmplifierCodeBlue.validate()
          f16 = this.$refs.fAmplifierCodeBlue.hasError
        } else {
          this.$refs.fAmplifierCodeOrange.validate()
          f16 = this.$refs.fAmplifierCodeOrange.hasError
        }
      }

      if (this.input.productType === 'FIBERNODE') {
        if (this.input.nodeCode.length === 8) {
          this.$refs.fNodeCodeBlue.validate()
          f8 = this.$refs.fNodeCodeBlue.hasError
        } else {
          this.$refs.fNodeCodeOrange.validate()
          f8 = this.$refs.fNodeCodeOrange.hasError
        }
      } else {
        this.$refs.fNodeCodeElse.validate()
        f8 = this.$refs.fNodeCodeElse.hasError
      }

      if (!f1 && !f2 && !f3 && !f4 && !f5 && !f6 && !f7 && !f8 && !f9 && !f10 && !f11 && !f12 && !f13 && !f14 && !f15 && !f16 && !f17 && !f18 && !f19 && !f20 && !f21 && !f22) {
        this.doSaveEquipment()
      }
    },
    doSaveEquipment () {
      this.$q.loading.show()
      this.input.purchasedDate = this.input.purchasedDate === '' ? '' : moment(String(this.input.purchasedDate), 'DD/MM/YYYY').format('YYYY-MM-DD')
      this.input.installationDate = this.input.installationDate === '' ? '' : moment(String(this.input.installationDate), 'DD/MM/YYYY').format('YYYY-MM-DD')
      this.input.updateDistanceDate = this.input.updateDistanceDate === '' ? '' : moment(String(this.input.updateDistanceDate), 'DD/MM/YYYY').format('YYYY-MM-DD')
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
    doAttachFile (file) {
      this.uploadButton = true
    },
    doHideButton () {
      this.uploadButton = false
    },
    doUploadFile (file) {
      this.$q.loading.show()
      let fr = new FileReader()
      fr.onload = (e) => {
        this.$axios.post(`${process.env.urlPrefix}uploadField`, { file64: e.target.result })
          .then((response) => {
            this.$q.loading.hide()
            this.listOfError = response.data
            this.listOfError.sort(this.compare)
            if (this.listOfError[0].messageStatus === 'error') {
              this.modalError = true
            } else if (this.listOfError[0].messageStatus === 'warning') {
              this.modalWarning = true
            } else {
              this.$q.notify({
                color: 'positive',
                icon: 'info',
                message: this.listOfError[0].message
              })
            }
            this.modalUpload = false
            this.doRefresh()
            this.doMainInitPage()
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
    doUploadAfterWarning () {
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}uploadFieldAfterWarning`)
        .then((response) => {
          this.$q.loading.hide()
          this.listOfError = response.data
          this.listOfError.sort(this.compare)
          if (this.listOfError[0].messageStatus === 'error') {
            this.modalError = true
          } else if (this.listOfError[0].messageStatus === 'warning') {
            this.modalWarning = true
          } else {
            this.$q.notify({
              color: 'positive',
              icon: 'info',
              message: this.listOfError[0].message
            })
            this.modalWarning = false
          }
          this.doRefresh()
          this.doMainInitPage()
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
          selectedElement.productType = 'AMPLIFIER'
        }

        if (selectedElement.productType === 'AMPLIFIER') {
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
          selectedElement.productType = 'AMPLIFIER'
        }

        if (selectedElement.productType === 'AMPLIFIER') {
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
      let prefix = this.equipmentToMigrate.newNodeCode.substring(0, 6)
      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].newNumber === '') {
          this.equipmentToMigrate.migrationListNew[i].newName = prefix + this.equipmentToMigrate.migrationListNew[i].equipmentName.substring(6, this.equipmentToMigrate.migrationListNew[i].equipmentName.length)
          this.equipmentToMigrate.migrationListNew[i].newPsCode = prefix + this.equipmentToMigrate.migrationListNew[i].psCode.substring(6, this.equipmentToMigrate.migrationListNew[i].psCode.length)
        } else {
          this.equipmentToMigrate.migrationListNew[i].newName = prefix + this.equipmentToMigrate.migrationListNew[i].newNumber
          this.equipmentToMigrate.migrationListNew[i].newPsCode = prefix + this.equipmentToMigrate.migrationListNew[i].newNumber
        }

        if (this.equipmentToMigrate.migrationListNew[i].predecessor === null) {
          this.equipmentToMigrate.migrationListNew[i].predecessor = ''
        }

        if (this.equipmentToMigrate.migrationListNew[i].predecessor !== '') {
          this.equipmentToMigrate.migrationListNew[i].newPredecessor = prefix + this.equipmentToMigrate.migrationListNew[i].predecessor.substring(6, this.equipmentToMigrate.migrationListNew[i].predecessor.length)
        } else {
          if (this.equipmentToMigrate.migrationListNew[i].productType === 'POWER SUPPLY') {
            this.equipmentToMigrate.migrationListNew[i].newPredecessor = prefix + '0000'
          }
          if (this.equipmentToMigrate.migrationListNew[i].productType === 'AMPLIFIER') {
            var lastString = this.equipmentToMigrate.migrationListNew[i].equipmentName.substring(6, this.equipmentToMigrate.migrationListNew[i].equipmentName.length)
            var cascades = lastString.replaceAll('0', '').length
            if (cascades === 1) {
              this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.migrationListNew[i].equipmentName.substring(0, 6) + '0000'
              this.equipmentToMigrate.migrationListNew[i].newPredecessor = this.equipmentToMigrate.migrationListNew[i].newName.substring(0, 6) + '0000'
            } else if (cascades === 2) {
              this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.migrationListNew[i].equipmentName.substring(0, 7) + '000'
              this.equipmentToMigrate.migrationListNew[i].newPredecessor = this.equipmentToMigrate.migrationListNew[i].newName.substring(0, 7) + '000'
            } else if (cascades === 3) {
              this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrat.migrationListNew[i].equipmentName.substring(0, 8) + '00'
              this.equipmentToMigrate.migrationListNew[i].newPredecessor = this.equipmentToMigrat.migrationListNew[i].newName.substring(0, 8) + '00'
            } else if (cascades === 4) {
              this.equipmentToMigrate.migrationListNew[i].predecessor = this.equipmentToMigrate.migrationListNew[i].equipmentName.substring(0, 9) + '0'
              this.equipmentToMigrate.migrationListNew[i].newPredecessor = this.equipmentToMigrate.migrationListNew[i].newName.substring(0, 9) + '0'
            }
          }
        }
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
            this.$set(selectedElement, 'originalPredecessor', selectedElement.predecessor)
            this.$set(selectedElement, 'originalPsCode', selectedElement.psCode)
            this.$set(selectedElement, 'newName', '')
            this.$set(selectedElement, 'newPsCode', '')
            this.$set(selectedElement, 'newPredecessor', '')
            this.$set(selectedElement, 'migrate', true)
            this.$set(selectedElement, 'newNumber', '')
            this.$set(selectedElement, 'assetStatus', 'Update')
          }
        } else {
          this.$set(selectedElement, 'originalPredecessor', selectedElement.predecessor)
          this.$set(selectedElement, 'originalPsCode', selectedElement.psCode)
          this.$set(selectedElement, 'newName', '')
          this.$set(selectedElement, 'newPsCode', '')
          this.$set(selectedElement, 'newPredecessor', '')
          this.$set(selectedElement, 'migrate', true)
          this.$set(selectedElement, 'newNumber', '')
          this.$set(selectedElement, 'assetStatus', 'Update')
        }
        // if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        //   this.$set(selectedElement, 'migrate', false)
        // }
        this.$set(this.equipmentToMigrate.migrationListNew, i, selectedElement)
      }
      this.doMigrationAssignNewName()
    },
    doMigrationInitializeList () {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
        this.doMigrationInitializeEquipmentList(true)
      } else {
        this.doMigrationInitializeEquipmentList(false)
      }
    },
    doMigrationSetupNewHierarchy () {
      if (!this.equipmentToMigrate.isNewNode) {
        this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.selectedNewNode
      }
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.newServiceNodeNumber + '00'
        this.equipmentToMigrate.newNodeNumber = this.equipmentToMigrate.newServiceNodeNumber.substring(3, 6)
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
      if (row.migrate) {
        row.newName = this.getMigrationEquipmentPrefix(row) + row.equipmentName.substring(6, row.equipmentName.length)
        row.newPredecessor = this.getMigrationEquipmentPrefix(row) + row.predecessor.substring(6, row.predecessor.length)
        row.newPsCode = this.getMigrationEquipmentPrefix(row)
      } else {
        row.newName = row.equipmentName
        row.newPredecessor = row.predecessor
        row.newPsCode = row.psCode
      }
      // this.doMigrationAssignNewName()
    },
    doRemove (cell) {
      this.equipmentToMigrate.migrationListNew.splice(cell.pageIndex, 1)
    },
    doInactive (row) {
      if (row.assetStatus !== 'Inactive') {
        row.newName = '[-]'
        row.assetStatus = 'Inactive'
      } else {
        row.newName = this.getMigrationEquipmentPrefix(row) + row.equipmentName.substring(6, row.equipmentName.length)
        row.assetStatus = 'Update'
      }
    },
    doReplace (row) {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        if (row.assetStatus === 'Replace') {
          row.assetStatus = 'Update'
        } else {
          row.assetStatus = 'Replace'
        }
      }
    },
    doMigrationChangeEquipmentName (cellRow) {
      cellRow.newName = this.getMigrationEquipmentPrefix(cellRow) + cellRow.newNumber
      if (this.equipmentToMigrate.migrationListNew.filter(item => item.newName === cellRow.newName).length > 1) {
        cellRow.newName = this.getMigrationEquipmentPrefix(cellRow) + '0000'
        cellRow.newNumber = '0000'
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: cellRow.newName + ' already used. Please use another.'
        })
      }
      // if ((cellRow.newName.length === 6) || (cellRow.newName.length === 7)) {
      //   if (cellRow.productType !== 'PS') {
      //     this.$q.notify({
      //       color: 'negative',
      //       icon: 'report_problem',
      //       message: 'Cannot change ' + cellRow.productType + ' to PS'
      //     })

      //     cellRow.newName = cellRow.newName + '0000'
      //     if (cellRow.productType === 'FIBERNODE') {
      //       cellRow.newName = cellRow.newName.substring(0, 8)
      //     } else {
      //       cellRow.newName = cellRow.newName.substring(0, 10)
      //     }
      //   }
      // } else if (cellRow.newName.length === 9) {
      //   cellRow.newName = cellRow.newName + '0'
      // }

      // if (cellRow.newName.length === 8) {
      //   cellRow.productType = 'FIBERNODE'
      //   cellRow.predecessor = ''
      // } else if (cellRow.newName.length === 10) {
      //   cellRow.productType = 'AMPLIFIER'
      //   cellRow.predecessor = cellRow.newName.substring(0, 6) + '0000'
      // } else if (cellRow.newName.length === 6) {
      //   cellRow.productType = 'POWER SUPPLY'
      //   cellRow.predecessor = cellRow.newName.substring(0, 6) + '0000'
      // }
      // else if (cellRow.newName.substring(cellRow.newName.length - 3) === '000') {
      //   cellRow.productType = 'AMPLI 1'
      //   cellRow.predecessor = cellRow.newName.substring(0, 6) + '0000'
      // } else if (cellRow.newName.substring(cellRow.newName.length - 2) === '00') {
      //   cellRow.productType = 'AMPLI 2'
      //   cellRow.predecessor = cellRow.newName.substring(0, 7) + '000'
      // } else if (cellRow.newName.substring(cellRow.newName.length - 1) === '0') {
      //   cellRow.productType = 'AMPLI 3'
      //   cellRow.predecessor = cellRow.newName.substring(0, 8) + '00'
      // } else if (cellRow.newName.length === 10) {
      //   cellRow.productType = 'AMPLI 4'
      //   cellRow.predecessor = cellRow.newName.substring(0, 9) + '0'
      // }
    },
    doMigrationChangePredecessor (cellRow) {
      cellRow.newPredecessor = this.getMigrationEquipmentPrefix(cellRow) + cellRow.newPredecessorNumber
    },
    isMigrationPromoteVisible (row) {
      return (row.productType !== 'PS' && row.productType !== 'FIBERNODE' &&
        this.equipmentToMigrate.isNewNode && row.migrate && this.equipmentToMigrate.selectedMoveNodeOption === 'X')
    },
    isMigrationStayOrMoveVisible (row) {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        return false
      } else if (row.productType !== 'FIBERNODE' && this.equipmentToMigrate.selectedMoveNodeOption !== 'N') {
        return true
      }
    },
    isMigrationReplaceVisible (row) {
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        return true
      }
    },
    isMigrationRemoveVisible (row) {
      if (this.equipmentToMigrate.selectedMoveNodeOption !== 'C') {
        return true
      }
    },
    isMigrationAddPowerSupplyVisible () {
      return true
      // return this.equipmentToMigrate.selectedMoveNodeOption !== 'C'
    },
    isMigrationAddAmplifierVisible () {
      return true
      // return this.equipmentToMigrate.selectedMoveNodeOption !== 'C'
    },
    doMigrationAddPowerSupply () {
      const newPowerSupply = {
        id: 'X' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productType: 'POWER SUPPLY',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: this.equipmentToMigrate.newNodeCode.substring(0, 6) + '#',
        newPredecessor: this.equipmentToMigrate.newNodeCode + '00',
        newPsCode: this.equipmentToMigrate.newNodeCode.substring(0, 6),
        amplifierCode: '',
        migrate: true,
        newNumber: '',
        assetStatus: 'New'
      }

      this.equipmentToMigrate.migrationListNew.unshift(newPowerSupply)
      // this.doMigrationAssignNewName()
    },
    doMigrationAddAmplifier () {
      const newAmplifier = {
        id: 'Y' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productType: 'AMPLIFIER',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: this.equipmentToMigrate.newNodeCode.substring(0, 6) + '####',
        newPsCode: this.equipmentToMigrate.newNodeCode.substring(0, 6),
        newPredecessor: this.equipmentToMigrate.newNodeCode + '00',
        migrate: true,
        newNumber: '',
        assetStatus: 'New'
      }

      this.equipmentToMigrate.migrationListNew.push(newAmplifier)
      // this.doMigrationAssignNewName()
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
      let rawChildren = list.filter(f => f.newPredecessor === parent &&
        f.productType !== 'FIBERNODE' && f.migrate === migrate && f.newName.substring(6, f.newName.length) !== '0000')
      let result = []

      // if (rawChildren.length === 0 && hierarchy === 1) {
      //   let newParent = list[0].newName
      //   console.log(newParent)
      //   rawChildren = list.filter(f => f.newPredecessor === newParent &&
      //     f.productType !== 'FIBERNODE' && f.migrate === migrate)
      //   console.log(rawChildren)
      // }

      for (let i = 0; i < rawChildren.length; i++) {
        let original = rawChildren[i].equipmentName

        if (original === '') {
          original = 'NEW'
        }

        let child = {
          label: rawChildren[i].newName + ' - ' + rawChildren[i].assetStatus,
          original: original,
          status: rawChildren[i].assetStatus,
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
        let sourceNodeReference = fiberNode[0].equipmentName + '00'

        // if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        //   original = fiberNode[0].equipmentName
        //   source = this.equipmentToMigrate.hubCode + ' - ' + this.equipmentToMigrate.newNodeCode
        //   sourceNodeReference = this.equipmentToMigrate.newNodeCode + '00'
        // }

        let sourceTree = {
          label: source,
          original: original,
          status: '',
          header: 'root',
          children: []
        }

        let originalVirtualAmpli = this.equipmentToMigrate.migrationListNew.filter(f => f.newName.substring(6, f.newName.length) === '0000' && f.migrate === false)

        let sourceChild = {
          label: '',
          original: '',
          status: '',
          children: []
        }

        if (originalVirtualAmpli.length > 0) {
          sourceChild = {
            label: originalVirtualAmpli[0].newName,
            original: originalVirtualAmpli[0].equipmentName,
            children: []
          }
        }

        const child = this.getMigrationPreviewChild(sourceNodeReference, this.equipmentToMigrate.migrationListNew, false)
        if (child.length > 0) {
          sourceChild.children = child
        }

        let sourceChildResult = []
        sourceChildResult.push(sourceChild)
        sourceTree.children = sourceChildResult

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
        status: '',
        children: []
      }

      let newVirtualAmpli = this.equipmentToMigrate.migrationListNew.filter(f => f.newName.substring(6, f.newName.length) === '0000' && f.migrate === true)

      let targetChild = {
        label: '[]',
        original: '',
        status: '',
        children: []
      }

      if (newVirtualAmpli.length > 0) {
        targetChild = {
          label: newVirtualAmpli[0].newName + ' - ' + newVirtualAmpli[0].assetStatus,
          original: newVirtualAmpli[0].equipmentName,
          status: newVirtualAmpli[0].assetStatus,
          children: []
        }
      }

      const child = this.getMigrationPreviewChild(this.equipmentToMigrate.newNodeCode + '00', this.equipmentToMigrate.migrationListNew, true)

      if (child.length > 0) {
        targetChild.children = child
      } else {
        let parentList2 = this.equipmentToMigrate.migrationListNew.filter(f => f.newPredecessor.substring(7, f.newPredecessor.length) === '000' &&
          f.migrate === true && f.newPredecessor.substring(6, f.newPredecessor.length) !== '0000')
        let newChild = []
        for (let i = 0; i < parentList2.length; i++) {
          let original = parentList2[i].equipmentName
          if (original === '') {
            original = 'NEW'
          }

          let child2 = {
            label: parentList2[i].newName,
            original: original,
            children: []
          }
          const child3 = this.getMigrationPreviewChild(parentList2[i].amplifierCode, this.equipmentToMigrate.migrationListNew, true)
          child2.children = child3
          newChild.push(child2)
        }

        if (newChild.length > 0) {
          targetChild.children = newChild
        } else {
          let parentList3 = this.equipmentToMigrate.migrationListNew.filter(f => f.newPredecessor.substring(8, f.newPredecessor.length) === '00' &&
            f.migrate === true && f.newPredecessor.substring(7, f.newPredecessor.length) !== '000')
          let newChild2 = []
          for (let i = 0; i < parentList3.length; i++) {
            let original = parentList3[i].equipmentName
            if (original === '') {
              original = 'NEW'
            }
            let child = {
              label: parentList3[i].newName,
              original: original,
              children: []
            }
            const child3 = this.getMigrationPreviewChild(parentList3[i].amplifierCode, this.equipmentToMigrate.migrationListNew, true)
            child.children = child3
            newChild2.push(child)
          }
          targetChild.children = newChild2
        }
      }

      let targetChildResult = []
      targetChildResult.push(targetChild)
      targetTree.children = targetChildResult

      this.$set(this.targetPreview, 0, targetTree)

      this.$refs.targetPreview.expandAll()
    },
    doMigrationValidate () {
      this.$q.loading.show()

      for (let i = 0; i < this.equipmentToMigrate.migrationListNew.length; i++) {
        if (this.equipmentToMigrate.migrationListNew[i].productType !== 'POWER SUPPLY') {
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
          if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
            this.migrationType = 'Split Node'
          } else if (this.equipmentToMigrate.selectedMoveNodeOption === 'N') {
            this.migrationType = 'Swap Node'
          } else {
            this.migrationType = 'Change Service'
          }
          this.doMigrationSetupNewHierarchy()
        }
        this.reloadMigrationList = true
      } else if (this.migrationStep === 3) {
        this.reloadMigrationList = false
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
      this.input.productType = this.input.productType.value
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          pid: this.input.productType
        }
      })
        .then((response) => {
          this.subTypeList = response.data.map(data => ({
            label: data.id.toUpperCase(),
            value: data.id.toUpperCase()
          }))
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
    getSubTypeValue () {
      this.input.productSubType = this.input.productSubType.value
    },
    getDropdownValue (type) {
      if (type === 'statusReason') {
        this.input.statusReason = this.input.statusReason.value
      } else if (type === 'hubCode') {
        this.input.hubCode = this.input.hubCode.value
      } else if (type === 'hubCodeRoom') {
        this.input.hubCodeRoom = this.input.hubCodeRoom.value
      } else if (type === 'service') {
        this.input.service = this.input.service.value
      } else if (type === 'technology') {
        this.input.technology = this.input.technology.value
      } else if (type === 'capacityUnits') {
        this.input.capacityUnits = this.input.capacityUnits.value
      } else if (type === 'division') {
        this.input.division = this.input.division.value
      } else if (type === 'department') {
        this.input.department = this.input.department.value
      }
    },
    convertManufacturer () {
      this.input.manufacturer = this.input.manufacturer.value
    },
    getBrand () {
      this.$q.loading.show()
      this.input.manufacturer = this.input.manufacturer.value
      this.$axios.get(`${process.env.urlPrefix}getBrand`, {
        params: {
          description: this.input.manufacturer
        }
      })
        .then((response) => {
          this.brandList = response.data.map(data => ({
            label: data.brand.toUpperCase(),
            value: data.brand.toUpperCase()
          }))
          // this.brandList = response.data.map(brand => brand.brand)
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
    convertBrand () {
      this.input.brand = this.input.brand.value
    },
    doEdit (cell) {
      this.input = JSON.parse(JSON.stringify(cell.row))
      this.input.purchasedDate = this.input.purchasedDate === null ? '' : moment(this.input.purchasedDate).format('DD/MM/YYYY')
      this.input.updateDistanceDate = this.input.updateDistanceDate === null ? '' : moment(this.input.updateDistanceDate).format('DD/MM/YYYY')
      this.input.installationDate = this.input.installationDate === null ? '' : moment(this.input.installationDate).format('DD/MM/YYYY')
      this.modalAddNewAsset = true
    },
    changeColorNodeCode () {
      if (this.input.nodeCode.length === 6) {
        this.psCodeValidation()
        this.amplifierCodeValidation()
      }
      if (this.input.nodeCode.length === 8) {
        this.blueNodeCode = true
        this.orangeNodeCode = false
      } else {
        this.blueNodeCode = false
        this.orangeNodeCode = true
      }
    },
    nodeInput () {
      this.psCodeValidation()
      this.amplifierCodeValidation()
    },
    changeColorPsCode () {
      if (this.input.psCode.length === 6 || this.input.psCode.length === 7) {
        this.psCodeValidation()
      } else {
        this.psCodeWarningText = 'Input Power Suply Code in 6/7 characters'
        this.bluePsCode = false
        this.orangePsCode = true
      }
    },
    psCodeValidation () {
      if (this.input.nodeCode.length >= 6) {
        this.psCodeWarningText = ''
        var node = this.input.nodeCode.substring(0, 6)
        if (this.input.psCode.length >= 6) {
          var ps = this.input.psCode.substring(0, 6)
          if (node !== ps) {
            this.psCodeWarningText = '6 digit pertama harus sama dengan Node Code'
            this.bluePsCode = false
            this.orangePsCode = true
          } else {
            this.bluePsCode = true
            this.orangePsCode = false
          }
        }
      } else {
        this.psCodeWarningText = 'Node Code Belum lengkap'
        this.bluePsCode = false
        this.orangePsCode = true
      }
    },
    changeColorAmplifierCode () {
      if (this.input.amplifierCode.length === 10) {
        this.amplifierCodeValidation()
      } else {
        this.amplifierCodeWarningText = 'Input Amplifier Code in 10 characters'
        this.blueAmplifierCode = false
        this.orangeAmplifierCode = true
      }
    },
    amplifierCodeValidation () {
      if (this.input.nodeCode.length >= 6) {
        this.amplifierCodeWarningText = ''
        var node = this.input.nodeCode.substring(0, 6)
        if (this.input.amplifierCode.length >= 6) {
          var ps = this.input.amplifierCode.substring(0, 6)
          if (node !== ps) {
            this.amplifierCodeWarningText = '6 digit pertama harus sama dengan Node Code'
            this.blueAmplifierCode = false
            this.orangeAmplifierCode = true
          } else {
            this.blueAmplifierCode = true
            this.orangeAmplifierCode = false
          }
        }
      } else {
        this.amplifierCodeWarningText = 'Node Code Belum lengkap'
        this.blueAmplifierCode = false
        this.orangeAmplifierCode = true
      }
    },
    downloadExcel (props) {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}fieldExcelDownload`, {
        responseType: 'arraybuffer',
        params: {
          searchVal: this.searchVal
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'field_excel_download.xlsx'
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          this.$q.loading.hide()
          this.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    },
    compare (a, b) {
      const statusA = a.messageStatus.toUpperCase()
      const statusB = b.messageStatus.toUpperCase()
      let comparison = 0
      if (statusA > statusB) {
        comparison = 1
      } else if (statusA < statusB) {
        comparison = -1
      }
      return comparison
    },
    doRefresh () {
      this.input = {
        id: '',
        equipmentCategory: 'Field',
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
