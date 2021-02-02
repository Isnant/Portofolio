import showLoading from './loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      file: undefined,
      productTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      subTypeList: [],
      manufacturerList: [],
      listOfError: [],
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
      paginationNotes: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdDate'
      },
      listColumnNotes: [
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
          name: 'serialNumberInternal',
          label: 'Serial Number',
          field: 'serialNumberInternal',
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
      this.$axios.post(`${process.env.urlPrefix}getNetworkInitPage/`, {})
        .then((response) => {
          this.doMainFillTableResult(response.data.listOfEquipment)

          this.assetCategoryList = response.data.listOfAssetCategory
          this.productTypeList = response.data.listOfProductSubType.map(productType => productType.value)
          this.hubCodeList = response.data.listOfHub.map(hubCode => hubCode.value)
          this.bdfCodeList = response.data.listOfBdf
          this.manufacturerList = response.data.listOfManufacturer

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
    uploadTxtEquipment (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadTxtEquipment`, this.fileAttach)
        .then((response) => {
          this.dataNotesList = response.data
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
    convertTxtToExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}networkFromTxtExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'network_equipment.xlsx'
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
    getSubType () {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          pid: this.input.productType
        }
      })
        .then((response) => {
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
