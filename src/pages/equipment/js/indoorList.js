import moment from 'moment'
import showLoading from './loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      file: undefined,
      uploadButton: false,
      productTypeList: [],
      productSeriesList: [],
      equipmentStatusList: [],
      filteredProductSeries: [],
      hubCodeList: [],
      bdfCodeList: [],
      subTypeList: [],
      manufacturerList: [],
      brandList: [],
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Hub'
      },
      input: {
        id: '',
        equipmentCategory: 'Hub',
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
      searchVal: {
        equipmentCategory: 'Hub',
        productType: 'All',
        productSeries: 'All',
        hubCode: 'All',
        bdfCode: 'All',
        nodeCode: '',
        assetStatus: 'All',
        equipmentStatus: 'All',
        equipmentName: ''
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
          name: 'productSubType',
          label: 'Product Sub Type',
          field: 'productSubType',
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
      modalUpload: false,
      listOfError: [],
      modalError: false,
      modalWarning: false,
      modalAddNewAsset: false,
      modalSuccess: false
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
      // this.$q.loading.show()
      this.showLoading()
      const userToken = localStorage.getItem('user-token')
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_04') === -1) {
        this.$router.push('/')
      }
      this.$axios.post(`${process.env.urlPrefix}getIndoorInitPage/`, {
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
          this.$q.loading.hide()
        })
    },
    doMainRefresh (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getIndoorPagedEquipment/`, {
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
    constructSelectList (response, type) {
      if (type === 'main') {
        this.equipmentStatusListSearch = response.data.listOfEquipmentStatusSearch.sort(this.compareValue)
        this.productTypeListSearch = response.data.listOfProductTypeSearch.sort(this.compareValue)
        this.productSeriesList = response.data.listOfProductSeriesSearch.sort(this.compareValue)
        this.equipmentStatusListSearch.unshift({ label: 'All', value: 'All' })
        this.productTypeListSearch.unshift({ label: 'All', value: 'All' })
        this.productSeriesList.unshift({ label: 'All', value: 'All' })
      } else if (type === 'detail') {
        this.productTypeList = this.productTypeListSearch.filter(a => a.value !== 'All')
        // this.productSeriesList = response.data.listOfProductSeries.sort(this.compareValue)
        this.equipmentStatusList = this.equipmentStatusListSearch.filter(a => a.value !== 'All')
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
    getSelectOptionForDetail () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHubEquipmentDetailSelectOption`, {})
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
    doEdit (cell) {
      // this.$q.loading.show()
      this.showLoading()
      this.input = JSON.parse(JSON.stringify(cell.row))
      this.input.purchasedDate = this.input.purchasedDate === null || this.input.purchasedDate === '' ? '' : moment(this.input.purchasedDate).format('DD/MM/YYYY')
      this.input.updateDistanceDate = this.input.updateDistanceDate === null || this.input.updateDistanceDate === '' ? '' : moment(this.input.updateDistanceDate).format('DD/MM/YYYY')
      this.input.installationDate = this.input.installationDate === null || this.input.installationDate === '' ? '' : moment(this.input.installationDate).format('DD/MM/YYYY')
      this.getSelectOptionForDetail()
    },
    saveEquipment () {
      this.$refs.hEquipmentName.validate()
      this.$refs.hProductType.validate()
      this.$refs.hProductSubType.validate()
      this.$refs.hProductSeries.validate()
      this.$refs.hManufacturer.validate()
      this.$refs.hBrand.validate()
      this.$refs.hQuantity.validate()
      this.$refs.hRack.validate()
      this.$refs.hChassis.validate()
      this.$refs.hSlot.validate()
      this.$refs.hHubCode.validate()
      this.$refs.hHubAddress.validate()
      this.$refs.hDivision.validate()
      this.$refs.hDepartment.validate()
      this.$refs.hPropertyOf.validate()
      this.$refs.hEquipmentStatus.validate()

      var h1 = this.$refs.hEquipmentName.hasError
      var h2 = this.$refs.hProductType.hasError
      var h3 = this.$refs.hProductSubType.hasError
      var h4 = this.$refs.hProductSeries.hasError
      var h5 = this.$refs.hManufacturer.hasError
      var h6 = this.$refs.hBrand.hasError
      var h7 = this.$refs.hQuantity.hasError
      var h8 = this.$refs.hRack.hasError
      var h9 = this.$refs.hChassis.hasError
      var h10 = this.$refs.hSlot.hasError
      var h11 = this.$refs.hHubCode.hasError
      var h12 = this.$refs.hHubAddress.hasError
      var h13 = this.$refs.hDivision.hasError
      var h14 = this.$refs.hDepartment.hasError
      var h15 = this.$refs.hPropertyOf.hasError
      var h16 = this.$refs.hEquipmentStatus.hasError

      if (!h1 && !h2 && !h3 && !h4 && !h5 && !h6 && !h7 && !h8 && !h9 && !h10 && !h11 && !h12 && !h13 && !h14 && !h15 && !h16) {
        this.doSaveEquipment()
      }
    },
    doSaveEquipment () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}doSaveEquipment`, this.input)
        .then((response) => {
          if (response.data === 'success') {
            this.$q.notify({
              color: 'positive',
              icon: 'report_problem',
              message: `successfully submitted`
            })
            this.modalAddNewAsset = false
            this.doRefresh()
            this.doMainInitPage()
          } else {
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: response.data
            })
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
    doUploadFile () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadIndoor`, this.fileAttach)
        .then((response) => {
          this.$q.loading.hide()
          this.listOfError = response.data
          this.listOfError.sort(this.compare)
          if (this.listOfError[0].messageStatus === 'error') {
            this.modalError = true
          } else if (this.listOfError[0].messageStatus === 'warning') {
            this.modalWarning = true
          } else if (this.listOfError[0].messageStatus === 'success') {
            this.modalSuccess = true
            this.succesMessage = this.listOfError[0].message
          } else {
            this.$q.notify({
              color: 'negative',
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
      this.showUploadLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadIndoorAfterWarning`)
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
            this.modalSuccess = false
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
    getSubType () {
      // this.$q.loading.show()
      this.showLoading()
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
      // this.$q.loading.show()
      this.showLoading()
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
          link.download = 'indoor_excel_download.xlsx'
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
    getDropdownValue (type) {
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

      // form
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
      }
    },
    doDropdownFilter (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredProductSeries = this.productSeriesList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    doRefresh () {
      this.input = {
        id: '',
        equipmentCategory: 'Hub',
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
