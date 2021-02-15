import moment from 'moment'
import showLoading from './loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      isActive: false,
      equipmentStatusListSearch: [],
      productTypeListSearch: [],
      assetStatusListSearch: [],
      hubCodeListSearch: [],
      hubCodeName: '',
      migrationHistoryList: [],
      selected: [],
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
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Field'
      },
      productTypeList: [],
      newProductTypeList: ['AMPLIFIER', 'POWER SUPPLY', 'FIBERNODE'],
      hubCodeList: [],
      filteredHubCode: [],
      productSeriesList: [],
      filteredProductSeries: [],
      bdfCodeList: [],
      filteredBdfCode: [],
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
      equipmentStatusList: [],
      assetStatusList: [],
      assetStatusFormList: [],
      hubCodeServiceList: [],
      hubCodeServiceSelected: [],
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
        productType: 'ALL',
        productSeries: 'ALL',
        hubCode: 'ALL',
        bdfCode: 'ALL',
        nodeCode: '',
        assetStatus: 'ALL',
        equipmentStatus: 'ALL',
        equipmentName: ''
      },
      groupSelect: {
        assetStatus: '',
        assetId: []
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
          name: 'department',
          label: 'Department',
          field: 'department',
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
          name: 'equipmentUploadStatus',
          label: 'Asset Status',
          field: 'equipmentUploadStatus',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center'
        }
      ],
      migrationColumns: [
        {
          name: 'newProductType',
          label: 'Product Type',
          field: 'newProductType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'originalCode',
          label: 'Source Code',
          field: 'originalCode',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'newCode',
          label: 'New Code',
          field: 'newCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'originalHub',
          label: 'Source Hub',
          field: 'originalHub',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'newHub',
          label: 'New Hub',
          field: 'newHub',
          align: 'left',
          sortable: true
        },
        {
          name: 'assetStatus',
          label: 'Asset Status',
          field: 'assetStatus',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        }, {
          name: 'historyDate',
          label: 'Migration Date',
          field: 'historyDate',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'migrationType',
          label: 'Migration Type',
          field: 'migrationType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        }
      ],
      equipmentPagination: {
        sortBy: 'equipmentName',
        descending: false,
        page: 1,
        rowsPerPage: 10,
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
      modalChangeAssetStatus: false,
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
        date: '',
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
      this.equipmentPagination.rowsPerPage = pagedEquipment.pageable.pageSize
      this.equipmentPagination.page = pagedEquipment.number + 1
    },
    doMainInitPage () {
      this.showLoading()
      const userToken = localStorage.getItem('user-token')
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_03') === -1) {
        this.$router.push('/')
      }
      this.$axios.post(`${process.env.urlPrefix}getFieldInitPage/`, {})
        .then((response) => {
          this.doMainFillTableResult(response.data.listOfEquipment)
          this.constructSelectList(response, 'main')
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
      // this.$q.loading.show()
      this.showLoading()
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
    constructSelectList (response, type) {
      if (type === 'main') {
        this.equipmentStatusListSearch = response.data.listOfEquipmentStatusSearch.sort(this.compareValue)
        this.productTypeListSearch = response.data.listOfProductTypeSearch.sort(this.compareValue)
        this.productTypeListSearch = this.productTypeListSearch.filter(a => a.cascadeValue === 'Field')
        this.assetStatusListSearch = response.data.listOfAssetStatusSearch.sort(this.compareValue)
        this.hubCodeListSearch = response.data.listOfHubCodeSearch.sort(this.compareValue)
        this.productSeriesList = response.data.listOfProductSeriesSearch.sort(this.compareValue)
        this.bdfCodeList = response.data.listOfBDFSearch.sort(this.compareValue)
        this.assetStatusList = this.assetStatusListSearch.filter(a => a.value !== 'ALL')
        this.assetStatusListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.equipmentStatusListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.productTypeListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.productSeriesList.unshift({ label: 'ALL', value: 'ALL' })
        this.bdfCodeList.unshift({ label: 'ALL', value: 'ALL' })
        this.hubCodeList = this.hubCodeListSearch.filter(a => a.value !== 'ALL')
      } else if (type === 'detail') {
        this.productTypeList = this.productTypeListSearch.filter(a => a.cascadeValue === 'Field')
        // this.productSeriesList = response.data.listOfProductSeries.sort(this.compareValue)
        this.assetStatusList = this.assetStatusListSearch.filter(a => a.value !== 'ALL')
        this.equipmentStatusList = this.equipmentStatusListSearch.filter(a => a.value !== 'ALL')
        this.manufacturerList = response.data.listOfManufacturer.sort(this.compareValue)
        this.technologyList = response.data.listOfTechnology.sort(this.compareValue)
        this.serviceList = response.data.listOfService.sort(this.compareValue)
        this.statusReasonList = response.data.listOfStatusReason.sort(this.compareValue)
        this.departmentList = response.data.listOfDepartment.sort(this.compareValue)
        this.divisionList = response.data.listOfDivision.sort(this.compareValue)
        this.propertyOfList = response.data.listOfPropertyOf.sort(this.compareValue)
        this.capacityUnitsList = response.data.listOfCapacityUnits.sort(this.compareValue)
        this.hubCodeRoomList = response.data.listOfHubCodeRoom.sort(this.compareValue)
      }
    },

    // == Start Form Detail ==
    doEdit (cell) {
      this.showLoading()
      this.input = JSON.parse(JSON.stringify(cell.row))
      this.input.purchasedDate = this.input.purchasedDate === null || this.input.purchasedDate === '' ? '' : moment(this.input.purchasedDate).format('DD/MM/YYYY')
      this.input.updateDistanceDate = this.input.updateDistanceDate === null || this.input.updateDistanceDate === '' ? '' : moment(this.input.updateDistanceDate).format('DD/MM/YYYY')
      this.input.installationDate = this.input.installationDate === null || this.input.installationDate === '' ? '' : moment(this.input.installationDate).format('DD/MM/YYYY')
      this.getMigrationHistory(cell)
      this.getSelectOptionForDetail()
      this.modalAddNewAsset = true
    },
    getSelectOptionForDetail () {
      this.$axios.get(`${process.env.urlPrefix}getFieldEquipmentDetailSelectOption`, {})
        .then((response) => {
          this.constructSelectList(response, 'detail')
          this.modalAddNewAsset = true
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
      this.$q.loading.hide()
    },
    getMigrationHistory (cell) {
      var assetId = cell.row.id.toString()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getMigrationHistoryByAssetId`, {
        params: {
          assetId: assetId
        }
      })
        .then((response) => {
          this.migrationHistoryList = response.data
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
      this.$q.loading.hide()
    },
    getDropdownValue (type) {
      // search bar
      if (type === 'equipmentStatusSearch') {
        this.searchVal.equipmentStatus = this.searchVal.equipmentStatus.value
      }
      if (type === 'productTypeSearch') {
        this.searchVal.productType = this.searchVal.productType.value
      }
      if (type === 'productSeriesSearch') {
        this.searchVal.productSeries = this.searchVal.productSeries.value
      }
      if (type === 'assetStatusSearch') {
        this.searchVal.assetStatus = this.searchVal.assetStatus.value
      }
      if (type === 'hubCodeSearch') {
        this.searchVal.hubCode = this.searchVal.hubCode.value
      }
      if (type === 'bdfCodeSearch') {
        this.searchVal.bdfCode = this.searchVal.bdfCode.value
      }

      // form detail
      if (type === 'equipmentStatusForm') {
        this.input.equipmentStatus = this.input.equipmentStatus.value
      }
      if (type === 'assetStatusForm') {
        this.input.equipmentUploadStatus = this.input.equipmentUploadStatus.value
      }
      if (type === 'assetStatusSelectForm') {
        this.groupSelect.assetStatus = this.groupSelect.assetStatus.value
        this.btnChangeStatus = true
      }
      if (type === 'statusReasonForm') {
        this.input.statusReason = this.input.statusReason.value
      } else if (type === 'hubCodeForm') {
        this.input.hubCode = this.input.hubCode.value
      } else if (type === 'hubCodeRoomForm') {
        this.input.hubCodeRoom = this.input.hubCodeRoom.value
      } else if (type === 'serviceForm') {
        this.input.service = this.input.service.value
      } else if (type === 'technologyForm') {
        this.input.technology = this.input.technology.value
      } else if (type === 'capacityUnitsForm') {
        this.input.capacityUnits = this.input.capacityUnits.value
      } else if (type === 'divisionForm') {
        this.input.division = this.input.division.value
      } else if (type === 'departmentForm') {
        this.input.department = this.input.department.value
      } else if (type === 'productSeriesForm') {
        this.input.productSeries = this.input.productSeries.value
      } else if (type === 'brand') {
        this.input.brand = this.input.brand.value
      } else if (type === 'productSubType') {
        this.input.productSubType = this.input.productSubType.value
      } else if (type === 'propertyOf') {
        this.input.propertyOf = this.input.propertyOf.value
      }
    },
    doProductSeriesFilter (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredProductSeries = this.productSeriesList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    doHubCodeFilter (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredHubCode = this.hubCodeListSearch.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
      })
    },
    doBdfFilter (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredBdfCode = this.bdfCodeList.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
      })
    },
    getSubType () {
      // this.$q.loading.show()
      this.showLoading()
      this.input.productType = this.input.productType.value
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          pid: this.input.productType
        }
      })
        .then((response) => {
          if (response.data !== '') {
            this.subTypeList = response.data.map(data => ({
              label: data.id.toUpperCase(),
              value: data.id.toUpperCase()
            }))
          } else {
            this.subTypeList = []
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
    getBrand () {
      // this.$q.loading.show()
      this.showLoading()
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
    saveEquipment () {
      // field
      this.$refs.fEquipmentName.validate()
      this.$refs.fProductType.validate()
      this.$refs.fProductSeries.validate()
      this.$refs.fManufacturer.validate()
      this.$refs.fBrand.validate()
      this.$refs.fQuantity.validate()
      this.$refs.fHubCode.validate()
      this.$refs.fDivision.validate()
      this.$refs.fDepartment.validate()
      this.$refs.fPropertyOf.validate()
      this.$refs.fStatusReason.validate()
      this.$refs.fService.validate()
      this.$refs.fTechnology.validate()
      this.$refs.fItCode.validate()

      var vEquipmentName = this.$refs.fEquipmentName.hasError
      var vProductType = this.$refs.fProductType.hasError
      var vProductSeries = this.$refs.fProductSeries.hasError
      var vManufacturer = this.$refs.fManufacturer.hasError
      var vBrand = this.$refs.fBrand.hasError
      var vQuantity = this.$refs.fQuantity.hasError
      var vHubCode = this.$refs.fHubCode.hasError
      var vDivision = this.$refs.fDivision.hasError
      var vDepartment = this.$refs.fDepartment.hasError
      var vPropertyOf = this.$refs.fPropertyOf.hasError
      var vStatusReason = this.$refs.fStatusReason.hasError
      var vService = this.$refs.fService.hasError
      var vTechnology = this.$refs.fTechnology.hasError
      var vItCode = this.$refs.fItCode.hasError
      var vPowerSupplyCode = false
      var vAmplifierCode = false
      var vNodeCode = false
      var vCapacity = false
      var vCapacityUnits = false
      var vPredecessor = false

      if (this.input.technology !== 'FTTH' && this.input.productType !== 'FIBERNODE' && this.input.productType !== 'WDM') {
        this.$refs.fCapacity.validate()
        this.$refs.fCapacityUnits.validate()
        this.$refs.fPredecessor.validate()

        vCapacity = this.$refs.fCapacity.hasError
        vCapacityUnits = this.$refs.fCapacityUnits.hasError
        vPredecessor = this.$refs.fPredecessor.hasError
      }

      if (this.input.technology !== 'FTTH' && this.input.productType !== 'WDM') {
        if (this.input.productType === 'POWER SUPPLY' || this.input.productType === 'POWER SUPPLY INDOOR') {
          if (this.input.psCode.length === 6 || this.input.psCode.length === 7) {
            this.$refs.fPowerSupplyCodeBlue.validate()
            vPowerSupplyCode = this.$refs.fPowerSupplyCodeBlue.hasError
          } else {
            this.$refs.fPowerSupplyCodeOrange.validate()
            vPowerSupplyCode = this.$refs.fPowerSupplyCodeOrange.hasError
          }
        } else {
          this.$refs.fPowerSupplyCodeElse.validate()
          vPowerSupplyCode = this.$refs.fPowerSupplyCodeElse.hasError
        }
      }

      if (this.input.productType === 'AMPLIFIER' || this.input.productType === 'AMPLIFIER INDOOR') {
        if (this.input.amplifierCode.length === 10) {
          this.$refs.fAmplifierCodeBlue.validate()
          vAmplifierCode = this.$refs.fAmplifierCodeBlue.hasError
        } else {
          this.$refs.fAmplifierCodeOrange.validate()
          vAmplifierCode = this.$refs.fAmplifierCodeOrange.hasError
        }
      }

      if (this.input.productType === 'FIBERNODE') {
        if (this.input.nodeCode.length === 8) {
          this.$refs.fNodeCodeBlue.validate()
          vNodeCode = this.$refs.fNodeCodeBlue.hasError
        } else {
          this.$refs.fNodeCodeOrange.validate()
          vNodeCode = this.$refs.fNodeCodeOrange.hasError
        }
      } else {
        this.$refs.fNodeCodeElse.validate()
        vNodeCode = this.$refs.fNodeCodeElse.hasError
      }

      if (!vEquipmentName && !vProductType && !vProductSeries && !vManufacturer && !vBrand && !vQuantity && !vHubCode && !vDivision && !vDepartment) {
        if (!vPropertyOf && !vStatusReason && !vService && !vTechnology && !vItCode && !vPowerSupplyCode && !vAmplifierCode && !vCapacity && !vCapacityUnits && !vPredecessor && !vNodeCode) {
          this.doSaveEquipment()
        }
      }
    },
    doSaveEquipment () {
      // this.$q.loading.show()
      this.showLoading()
      this.input.purchasedDate = this.input.purchasedDate === null || this.input.purchasedDate === '' ? '' : moment(String(this.input.purchasedDate), 'DD/MM/YYYY').format('YYYY-MM-DD')
      this.input.installationDate = this.input.installationDate === null || this.input.installationDate === '' ? '' : moment(String(this.input.installationDate), 'DD/MM/YYYY').format('YYYY-MM-DD')
      this.input.updateDistanceDate = this.input.updateDistanceDate === null || this.input.updateDistanceDate === '' ? '' : moment(String(this.input.updateDistanceDate), 'DD/MM/YYYY').format('YYYY-MM-DD')
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
    // == End Form Detail ==

    doAttachFile (file) {
      let fr = new FileReader()
      this.uploadButton = true
      fr.onload = (e) => {
        this.fileAttach.fileName = file.name
        this.fileAttach.file64 = e.target.result
      }
      fr.readAsDataURL(file)
    },
    doHideButton () {
      this.uploadButton = false
    },
    doUploadFile (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadField`, this.fileAttach)
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
    },
    doUploadAfterWarning () {
      // this.$q.loading.show()
      this.showLoading()
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
      this.hubCodeName = this.hubCodeList.filter(v => v.value.toUpperCase().indexOf(this.equipmentToMigrate.newHubCode.toUpperCase()) > -1)[0]
      this.equipmentToMigrate.selectedMoveNodeOption = this.moveNodeOptions[0].value
      this.equipmentToMigrate.date = this.getCurrentDate()

      this.getMigrationEquipment(this.equipmentToMigrate.nodeCode)
    },
    doMigrationChangeHub () {
      this.equipmentToMigrate.newHubCode = this.hubCodeName.value
      this.hubCodeServiceSelected = this.hubCodeServiceList.filter(v => v.cascadeValue.toUpperCase().indexOf(this.hubCodeName.value.toUpperCase()) > -1)
    },
    doMigrationChangeHubCode () {
      this.nodePrefixByHub = this.hubCodeService.value
    },
    doMergeSelectedNewNode () {
      this.equipmentToMigrate.selectedNewNode = this.nodePrefixByHub + this.equipmentToMigrate.newNodeNumber
    },
    // doMigrationChangeHub () {
    //   this.$axios.get(`${process.env.urlPrefix}getNodeByHub/`,
    //     {
    //       params: {
    //         hubCode: this.equipmentToMigrate.newHubCode,
    //         service: this.equipmentToMigrate.service
    //       }
    //     })
    //     .then((response) => {
    //       this.fullNodeListByHub = []

    //       if (response.data.length > 0) {
    //         this.fullNodeListByHub = response.data.map(nodeChoice => nodeChoice.value)
    //         this.nodePrefixByHub = this.fullNodeListByHub[0].substring(0, 3)

    //         if (this.equipmentToMigrate.newHubCode === this.equipmentToMigrate.hubCode) {
    //           for (let i = 0; i < this.fullNodeListByHub.length; i += 1) {
    //             if ((this.fullNodeListByHub[i] === this.equipmentToMigrate.nodeCode) ||
    //               (parseInt(this.fullNodeListByHub[i].substring(3)) < 10)) {
    //               this.fullNodeListByHub.splice(i--, 1)
    //             }
    //           }
    //         }
    //       }

    //       if (this.fullNodeListByHub.length < 1) {
    //         this.$q.notify({
    //           color: 'negative',
    //           icon: 'report_problem',
    //           message: `Hub ${this.equipmentToMigrate.newHubCode} does not have nodes. Please add one before proceeding.`
    //         })
    //         this.equipmentToMigrate.selectedNewNode = undefined
    //         this.equipmentToMigrate.newNodeCode = undefined

    //         this.destinationNodeOptions = []
    //       } else {
    //         this.equipmentToMigrate.selectedNewNode = this.fullNodeListByHub[0]
    //         this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.selectedNewNode.value

    //         this.destinationNodeOptions.push(this.fullNodeListByHub[0])
    //       }

    //       this.$q.loading.hide()
    //     })
    //     .catch((error) => {
    //       this.$q.notify({
    //         color: 'negative',
    //         icon: 'report_problem',
    //         message: error
    //       })
    //     })
    // },
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
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getNodeChildMig`, { params: { nodeCode: nodeCodeParam } })
        .then((response) => {
          this.migrationListOriginal = response.data.listNodeChildMig
          this.hubCodeServiceList = response.data.listOfHubCodeService
          this.hubCodeServiceSelected = this.hubCodeServiceList.filter(v => v.cascadeValue.toUpperCase().indexOf(this.hubCodeName.value.toUpperCase()) > -1)
          // this.doMigrationChangeHub()
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
      alert('2')
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
      alert('1')
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
            this.$set(selectedElement, 'originalProductType', selectedElement.productType)
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
          this.$set(selectedElement, 'originalProductType', selectedElement.productType)
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
      alert('haha')
      this.equipmentToMigrate.selectedNewNode = this.nodePrefixByHub + this.equipmentToMigrate.newNodeNumber
      if (!this.equipmentToMigrate.isNewNode) {
        this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.selectedNewNode
      }
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
        // this.equipmentToMigrate.newNodeCode = this.equipmentToMigrate.newServiceNodeNumber + '00'
        this.equipmentToMigrate.newNodeNumber = this.equipmentToMigrate.newNodeCode.substring(3, 6)
      }
      if (this.equipmentToMigrate.newNodeCode === undefined) {
        this.$refs.stepper.previous()
      } else {
        this.equipmentToMigrate.migrationListNew = JSON.parse(JSON.stringify(this.migrationListOriginal))

        if (this.equipmentToMigrate.selectedMoveNodeOption !== 'X') {
          this.lastNodeCode = this.fullNodeListByHub[this.fullNodeListByHub.length - 1]

          this.doMigrationInitializeList()
        } else {
          // this.$q.loading.show()
          this.showLoading()
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
    doMigrationChangeProductType (cellRow) {
      if (cellRow.productType === 'FIBERNODE') {
        cellRow.newName = cellRow.newName.substring(0, 6) + '00'
        cellRow.newPredecessor = ''
      } else if (cellRow.productType === 'AMPLIFIER') {
        cellRow.newName = cellRow.newName.substring(0, 6)
        cellRow.newPredecessor = cellRow.newName.substring(0, 6)
      } else if (cellRow.productType === 'POWER SUPPLY') {
        cellRow.newName = cellRow.newName.substring(0, 6)
        cellRow.newPredecessor = ''
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
      if (this.equipmentToMigrate.selectedMoveNodeOption === 'C' || row.equipmentName === '') {
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
    isMigrationInactiveVisible (row) {
      // if (this.equipmentToMigrate.selectedMoveNodeOption === 'C') {
      return true
      // }
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
    changeAssetStatusVisible () {
      if (this.selected.length > 0) {
        return true
      }
    },
    doMigrationAddPowerSupply () {
      const newPowerSupply = {
        id: 'X' + this.equipmentToMigrate.migrationListNew.length,
        equipmentName: '',
        productType: '',
        originalProductType: '',
        hubCode: this.equipmentToMigrate.newHubCode,
        predecessor: this.equipmentToMigrate.newNodeCode + '00',
        newName: this.equipmentToMigrate.newNodeCode,
        newPredecessor: '',
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
        originalProductType: '',
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
      // ==== Source Preview ====
      this.createSourceTree()
      // ==== Targe Preview ====
      this.createTagetTree()
    },
    createSourceTree () {
      const fiberNode = this.migrationListOriginal.filter(f => f.productType === 'FIBERNODE')
      if (fiberNode.length !== 1) {
        this.validationResults.push({ id: this.validationResults.length, message: 'Source have invlaid node. Please check' })
      } else {
        let source = this.equipmentToMigrate.hubCode + ' - ' + fiberNode[0].equipmentName
        let original
        let sourceNodeReference = fiberNode[0].equipmentName + '00'

        let sourceTree = {
          label: source,
          original: original,
          status: '',
          header: 'root',
          children: []
        }
        let sourceChildResult = []

        // get WDM Code
        let sourceWDMCode = this.equipmentToMigrate.migrationListNew.filter(f => f.originalProductType === 'WDM' && f.migrate === false)
        let sourceWDM = {
          label: '',
          original: '',
          status: '',
          children: []
        }
        if (sourceWDMCode.length > 0) {
          sourceWDM = {
            label: sourceWDMCode[0].newName,
            original: sourceWDMCode[0].equipmentName,
            children: []
          }
        }

        // get Fibernode
        let sourceFibernodeCode = this.equipmentToMigrate.migrationListNew.filter(f => f.productType === 'FIBERNODE' && f.migrate === true)
        let sourceFibernode = {
          label: '',
          original: '',
          status: '',
          children: []
        }
        if (sourceFibernodeCode.length > 0) {
          sourceFibernode = {
            label: '[NODE] ' + sourceFibernodeCode[0].newName,
            original: sourceFibernodeCode[0].equipmentName,
            children: []
          }
        }

        // get Power Supply
        let originalPSCode = this.equipmentToMigrate.migrationListNew.filter(f => f.originalProductType === 'POWER SUPPLY' && f.migrate === false)
        for (let i = 0; i < originalPSCode.length; i++) {
          let psCode = originalPSCode[i].newName
          let psCodeChild = {
            label: psCode + ' - ' + originalPSCode[i].assetStatus,
            original: originalPSCode[i].equipmentName,
            status: originalPSCode[i].assetStatus,
            children: []
          }
          sourceFibernode.children.push(psCodeChild)
        }

        // get Virtual amplifier
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

        if (sourceChild.length > 0) {
          sourceFibernodeCode.children.push(sourceChild)
          if (sourceWDMCode.length > 0) {
            sourceWDM.children.push(sourceFibernode)
            sourceChildResult.push(sourceWDM)
          } else {
            sourceChildResult.push(sourceFibernode)
          }
        }
        sourceTree.children = sourceChildResult
        this.$set(this.sourcePreview, 0, sourceTree)
        this.$refs.sourcePreview.expandAll()
      }
    },
    createTagetTree () {
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
        label: '[' + this.equipmentToMigrate.newHubCode + ']',
        original: original,
        header: 'root',
        status: '',
        children: []
      }

      let targetChildResult = []

      // get WDM Code
      let targetWDMCode = this.equipmentToMigrate.migrationListNew.filter(f => f.productType === 'WDM' && f.migrate === true)
      let targetWDM = {
        label: '',
        original: '',
        status: '',
        children: []
      }
      if (targetWDMCode.length > 0) {
        targetWDM = {
          label: targetWDMCode[0].newName,
          original: targetWDMCode[0].equipmentName,
          children: []
        }
      }

      // get Fibernode
      let targetFibernodeCode = this.equipmentToMigrate.migrationListNew.filter(f => f.productType === 'FIBERNODE' && f.migrate === true)
      let targetFibernode = {
        label: '',
        original: '',
        status: '',
        children: []
      }
      if (targetFibernodeCode.length > 0) {
        targetFibernode = {
          label: '[NODE] ' + targetFibernodeCode[0].newName,
          original: targetFibernodeCode[0].equipmentName,
          children: []
        }
      }

      // get Power Supply
      let targetPSCode = this.equipmentToMigrate.migrationListNew.filter(f => f.productType === 'POWER SUPPLY' && f.migrate === true)
      for (let i = 0; i < targetPSCode.length; i++) {
        let psCode = targetPSCode[i].newName
        let psCodeChild = {
          label: '[PS] ' + psCode + ' - ' + targetPSCode[i].assetStatus,
          original: targetPSCode[i].equipmentName,
          status: targetPSCode[i].assetStatus,
          children: []
        }
        targetFibernode.children.push(psCodeChild)
      }

      // get Virtual amplifier
      let newVirtualAmpli = this.equipmentToMigrate.migrationListNew.filter(f => f.newName.substring(6, f.newName.length) === '0000' && f.migrate === true)
      let targetChild = {
        label: '[]',
        original: '',
        status: '',
        children: []
      }

      if (newVirtualAmpli.length > 0) {
        targetChild = {
          label: '[VA] ' + newVirtualAmpli[0].newName + ' - ' + newVirtualAmpli[0].assetStatus,
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

      targetFibernode.children.push(targetChild)

      if (targetWDMCode.length > 0) {
        targetWDM.children.push(targetFibernode)
        targetChildResult.push(targetWDM)
      } else {
        targetChildResult.push(targetFibernode)
      }

      targetTree.children = targetChildResult
      this.$set(this.targetPreview, 0, targetTree)
      this.$refs.targetPreview.expandAll()
    },
    doMigrationValidate () {
      // this.$q.loading.show()
      this.showLoading()
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
        this.$refs.destinationNode.validate()
        var vDestinationNode = this.$refs.destinationNode.hasError
        if (this.reloadMigrationList && !vDestinationNode) {
          if (this.equipmentToMigrate.selectedMoveNodeOption === 'X') {
            this.migrationType = 'Split Node'
          } else if (this.equipmentToMigrate.selectedMoveNodeOption === 'N') {
            this.migrationType = 'Swap Node'
          } else {
            this.migrationType = 'Change Service'
          }
          this.doMigrationSetupNewHierarchy()
        } else {
          this.$refs.stepper.previous()
        }
        this.reloadMigrationList = true
      } else if (this.migrationStep === 3) {
        this.reloadMigrationList = false
        this.doMigrationValidate()
      }
    },
    doMigrationExecute () {
      // this.$q.loading.show()
      this.showLoading()
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
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
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
    changeSelectedStatus () {
      // this.$q.loading.show()
      this.showLoading()
      this.groupSelect.assetId = []
      for (let i = 0; i < this.selected.length; i++) {
        this.groupSelect.assetId.push(this.selected[i].id)
      }

      this.$axios.post(`${process.env.urlPrefix}updateAssetStatus/`, this.groupSelect)
        .then((response) => {
          this.$q.loading.hide()
          this.modalChangeAssetStatus = false
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
    compareLabel (a, b) {
      const labelA = a.label.toUpperCase()
      const labelB = b.label.toUpperCase()
      let comparison = 0
      if (labelA > labelB) {
        comparison = 1
      } else if (labelA < labelB) {
        comparison = -1
      }
      return comparison
    },
    compareValue (a, b) {
      const labelA = a.value.toUpperCase()
      const labelB = b.value.toUpperCase()
      let comparison = 0
      if (labelA > labelB) {
        comparison = 1
      } else if (labelA < labelB) {
        comparison = -1
      }
      return comparison
    },
    getCurrentDate () {
      var today = new Date()
      var month = today.getMonth() + 1
      var strDate = (today.getDate().toString().length === 1 ? '0' + today.getDate() : today.getDate())
      var strMonth = month.toString().toString().length === 1 ? '0' + month.toString() : month.toString()
      var currentDate = strDate + '/' + strMonth + '/' + today.getFullYear()
      return currentDate
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
      this.groupSelect = {
        assetStatus: '',
        assetId: []
      }
    }
  },
  beforeMount () {
    this.doMainInitPage()
  }
}
