import moment from 'moment'
import showLoading from './loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      file: undefined,
      equipmentStatusListSearch: [],
      productTypeListSearch: [],
      assetStatusListSearch: [],
      hubCodeListSearch: [],
      filteredHubCode: [],
      productTypeList: [],
      productSeriesList: [],
      filteredProductSeries: [],
      assetStatusList: [],
      hubCodeList: [],
      bdfCodeList: [],
      filteredBdfCode: [],
      subTypeList: [],
      manufacturerList: [],
      listOfError: [],
      brandList: [],
      hubTrue: false,
      hubFalse: true,
      convertTabs: 'convert',
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
        id: '',
        equipmentCategory: 'Network',
        productType: 'ALL',
        productSeries: 'ALL',
        hubCode: 'ALL',
        bdfCode: 'ALL',
        nodeCode: '',
        assetStatus: 'ALL',
        equipmentStatus: 'ALL',
        equipmentName: '',
        logBatch: '',
        technology: 'ALL'
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
          label: 'BDF Name',
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
      errorListColumn: [
        {
          name: 'messageStatus',
          label: 'Status',
          field: 'messageStatus',
          align: 'left'
        },
        {
          name: 'message',
          label: 'Message',
          field: 'message',
          align: 'left'
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
      modalUploadExcel: false,
      modalUploadTxt: false,
      modalUploadPreviewTxt: false,
      modalAddNewAsset: false,
      modalErrorExcel: false,
      modalWarningExcel: false,
      addHub: true,
      modalAddField: false,
      modalAddNetwork: false,
      uploadCategory: 'network',
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
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Network'
      },
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
      dataNotesList: [],
      dataEmptyList: [],
      paginationNotes: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdDate'
      },
      listColumnNotes: [
        {
          name: 'equipmentUploadStatus',
          label: 'Status',
          field: 'equipmentUploadStatus',
          align: 'left',
          style: 'width: 700px',
          sortable: true
        },
        {
          name: 'equipmentName',
          label: 'Equipment Name',
          field: 'equipmentName',
          align: 'left',
          style: 'width: 700px',
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
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          sortable: true
        },
        {
          name: 'bdfCode',
          label: 'Bdf Code',
          field: 'bdfCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'serialNumberDevice',
          label: 'Serial Number',
          field: 'serialNumberDevice',
          align: 'left',
          sortable: true
        },
        {
          name: 'capacity3',
          label: 'VID',
          field: 'capacity3',
          align: 'left',
          sortable: true
        }
      ],
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
      // this.$q.loading.show()
      this.showLoading()
      const userToken = localStorage.getItem('user-token')
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_05') === -1) {
        this.$router.push('/')
      }
      this.$axios.get(`${process.env.urlPrefix}getNetworkInitPage/`, {
        params: {
          searchVal: this.searchVal
        }
      })
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
    constructSelectList (response, type) {
      if (type === 'main') {
        this.equipmentStatusListSearch = response.data.listOfEquipmentStatusSearch.sort(this.compareValue)
        this.productTypeListSearch = response.data.listOfProductTypeSearch.sort(this.compareValue)
        this.assetStatusListSearch = response.data.listOfAssetStatusSearch.sort(this.compareValue)
        this.hubCodeListSearch = response.data.listOfHubCodeSearch.sort(this.compareValue)
        this.productSeriesList = response.data.listOfProductSeriesSearch.sort(this.compareValue)
        this.bdfCodeList = response.data.listOfBdfCodeSearch.sort(this.compareValue)

        this.productTypeListSearch = this.productTypeListSearch.filter(a => a.cascadeValue === 'Network')
        this.assetStatusList = this.assetStatusListSearch.filter(a => a.value !== 'All')
        this.assetStatusListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.equipmentStatusListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.productTypeListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.productSeriesList.unshift({ label: 'ALL', value: 'ALL' })
        this.bdfCodeList.unshift({ label: 'ALL', value: 'ALL' })
        this.hubCodeList = this.hubCodeListSearch.filter(a => a.value !== 'All')
      } else if (type === 'detail') {
        this.productTypeList = this.productTypeListSearch.filter(a => a.cascadeValue === 'Network')
        // this.productSeriesList = response.data.listOfProductSeries.sort(this.compareValue)
        this.assetStatusList = this.assetStatusListSearch.filter(a => a.value !== 'ALL')
        this.equipmentStatusList = this.equipmentStatusListSearch.filter(a => a.value !== 'All')
        this.manufacturerList = response.data.listOfManufacturer.sort(this.compareValue)
        this.statusReasonList = response.data.listOfStatusReason.sort(this.compareValue)
        this.departmentList = response.data.listOfDepartment.sort(this.compareValue)
        this.divisionList = response.data.listOfDivision.sort(this.compareValue)
        this.propertyOfList = response.data.listOfPropertyOf.sort(this.compareValue)
        this.capacityUnitsList = response.data.listOfCapacityUnits.sort(this.compareValue)
        this.hubCodeRoomList = response.data.listOfHubCodeRoom.sort(this.compareValue)
      }
    },
    getSelectOptionForDetail () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getNetworkEquipmentDetailSelectOption`, {})
        .then((response) => {
          this.constructSelectList(response, 'detail')
          this.modalAddNewAsset = true
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
        this.input.brand = this.input.brand
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
    saveEquipment () {
      // Network
      this.$refs.nEquipmentName.validate()
      this.$refs.nProductType.validate()
      this.$refs.nManufacturer.validate()
      this.$refs.nBrand.validate()
      this.$refs.nStatusReason.validate()
      this.$refs.nQuantity.validate()
      this.$refs.nBdfCode.validate()
      this.$refs.nDivision.validate()
      this.$refs.nDepartment.validate()
      this.$refs.nPropertyOf.validate()

      var n1 = this.$refs.nEquipmentName.hasError
      var n2 = this.$refs.nProductType.hasError
      var n3 = this.$refs.nManufacturer.hasError
      var n4 = this.$refs.nBrand.hasError
      var n5 = this.$refs.nStatusReason.hasError
      var n6 = this.$refs.nQuantity.hasError
      var n7 = this.$refs.nBdfCode.hasError
      var n8 = this.$refs.nPropertyOf.hasError
      var n9 = this.$refs.nDivision.hasError
      var n10 = this.$refs.nDepartment.hasError

      if (!n1 && !n2 && !n3 && !n4 && !n5 && !n6 && !n7 && !n8 && !n9 && !n10) {
        this.doSaveEquipment()
      }
    },
    doSaveEquipment () {
      // this.$q.loading.show()
      this.showLoading()
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
    doAttachFile (file) {
      let fr = new FileReader()
      fr.onload = (e) => {
        this.fileAttach.fileName = file.name
        this.fileAttach.file64 = e.target.result
      }
      fr.readAsDataURL(file)
    },
    doUploadFile (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadNetwork`, this.fileAttach)
        .then((response) => {
          this.$q.loading.hide()
          this.listOfError = response.data
          this.listOfError.sort(this.compare)
          if (this.listOfError[0].messageStatus === 'error') {
            this.modalErrorExcel = true
          } else if (this.listOfError[0].messageStatus === 'warning') {
            this.modalWarningExcel = true
          } else {
            this.$q.notify({
              color: 'positive',
              icon: 'info',
              message: this.listOfError[0].message
            })
          }
          this.modalUploadExcel = false
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
          link.download = 'network_excel_download.xlsx'
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
    uploadTxtEquipment (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadTxtEquipment`, this.fileAttach)
        .then((response) => {
          this.dataNotesList = response.data.listOfNetworkEquipment
          this.dataEmptyList = response.data.listOfHostname.map(data => ({
            hostname: data
          }))
          this.modalUploadTxt = false
          this.modalUploadPreviewTxt = true
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
    convertTxtToExcel (mode) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}networkFromTxtExcelDownload`, {
        responseType: 'arraybuffer',
        params: {
          mode: mode
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          if (mode === 'convert') {
            link.download = 'network_equipment.xlsx'
          } else {
            link.download = 'hostname_empty.xlsx'
          }
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
    getProductTypeValue () {
      this.input.productType = this.input.productType.value
      this.getSubType()
    },
    getSubType () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          productType: this.input.productType,
          eqCategory: 'Network'
        }
      })
        .then((response) => {
          if (response.data !== '') {
            this.subTypeList = response.data.map(data => ({
              label: data.subtype.toUpperCase(),
              value: data.subtype.toUpperCase()
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
    getManufacturerValue () {
      this.input.manufacturer = this.input.manufacturer.value
      this.getBrand()
    },
    getBrand () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getBrand`, {
        params: {
          description: this.input.manufacturer
        }
      })
        .then((response) => {
          if (response.data !== '') {
            this.brandList = response.data.map(brand => brand.brand)
          } else {
            this.brandList = []
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
      this.showLoading()
      this.input = JSON.parse(JSON.stringify(cell.row))
      this.input.purchasedDate = this.input.purchasedDate === null || this.input.purchasedDate === '' ? '' : moment(this.input.purchasedDate).format('DD/MM/YYYY')
      this.input.updateDistanceDate = this.input.updateDistanceDate === null || this.input.updateDistanceDate === '' ? '' : moment(this.input.updateDistanceDate).format('DD/MM/YYYY')
      this.input.installationDate = this.input.installationDate === null || this.input.installationDate === '' ? '' : moment(this.input.installationDate).format('DD/MM/YYYY')
      this.getSelectOptionForDetail()
      this.getSubType()
      this.getBrand()
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
      this.brandList = []
    }
  },
  beforeMount () {
    this.doMainInitPage()
  }
}
