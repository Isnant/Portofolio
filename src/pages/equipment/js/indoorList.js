import moment from 'moment'
import showLoading from './loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      file: undefined,
      uploadButton: false,
      equipmentStatusListSearch: [],
      productTypeListSearch: [],
      assetStatusListSearch: [],
      hubCodeListSearch: [],
      filteredHubCode: [],
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
        id: '',
        equipmentCategory: 'Hub',
        productType: 'ALL',
        productSeries: 'ALL',
        hubCode: 'ALL',
        bdfCode: 'ALL',
        nodeCode: '',
        assetStatus: 'ALL',
        equipmentStatus: 'ALL',
        equipmentName: '',
        logBatch: '',
        technology: 'ALL',
        wdmCode: ''
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
        this.productTypeListSearch = response.data.listOfProductTypeSearch.sort(this.compareValue).filter(a => a.cascadeValue === 'Indoor')
        this.assetStatusListSearch = response.data.listOfAssetStatusSearch.sort(this.compareValue)
        this.hubCodeListSearch = response.data.listOfHubCodeSearch.sort(this.compareValue)
        this.productSeriesList = response.data.listOfProductSeriesSearch.sort(this.compareValue)
        this.assetStatusList = this.assetStatusListSearch.filter(a => a.value !== 'ALL')
        this.assetStatusListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.equipmentStatusListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.productTypeListSearch.unshift({ label: 'ALL', value: 'ALL' })
        this.productSeriesList.unshift({ label: 'ALL', value: 'ALL' })
      } else if (type === 'detail') {
        this.hubCodeList = this.hubCodeListSearch.filter(a => a.value !== 'ALL')
        this.assetStatusList = this.assetStatusListSearch.filter(a => a.value !== 'ALL')
        this.equipmentStatusList = this.equipmentStatusListSearch.filter(a => a.value !== 'ALL')
        this.productTypeList = this.productTypeListSearch
        // this.productSeriesList = response.data.listOfProductSeries.sort(this.compareValue)
        this.manufacturerList = response.data.listOfManufacturer.sort(this.compareValue)
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
      this.$refs.fAssetStatus.validate()
      this.$refs.fEquipmentName.validate()
      this.$refs.fProductType.validate()
      this.$refs.fProductSeries.validate()
      this.$refs.fManufacturer.validate()
      this.$refs.fBrand.validate()
      this.$refs.fStatusReason.validate()
      this.$refs.fQuantity.validate()
      this.$refs.fRack.validate()
      this.$refs.fChasis.validate()
      this.$refs.fHubCode.validate()
      this.$refs.fHubCodeRoom.validate()
      this.$refs.fDivision.validate()
      this.$refs.fDepartment.validate()
      this.$refs.fPropertyOf.validate()
      this.$refs.fEquipmentStatus.validate()

      var vAssetStatus = this.$refs.fAssetStatus.hasError
      var vEquipmentName = this.$refs.fEquipmentName.hasError
      var vProductType = this.$refs.fProductType.hasError
      var vProductSeries = this.$refs.fProductSeries.hasError
      var vManufacturer = this.$refs.fManufacturer.hasError
      var vBrand = this.$refs.fBrand.hasError
      var vStatusReason = this.$refs.fStatusReason.hasError
      var vQuantity = this.$refs.fQuantity.hasError
      var vRack = this.$refs.fRack.hasError
      var vChasis = this.$refs.fChasis.hasError
      var vHubCode = this.$refs.fHubCode.hasError
      var vHubCodeRoom = this.$refs.fHubCodeRoom.hasError
      var vDivision = this.$refs.fDivision.hasError
      var vDepartment = this.$refs.fDepartment.hasError
      var vPropertyOf = this.$refs.fPropertyOf.hasError
      var fvEquipmentStatus = this.$refs.fEquipmentStatus.hasError

      if (!vAssetStatus && !vEquipmentName && !vProductType && !vProductSeries && !vManufacturer && !vBrand && !vStatusReason) {
        if (!vQuantity && !vRack && !vChasis && !vHubCode && !vHubCodeRoom && !vDivision && !vDepartment && !vPropertyOf && !fvEquipmentStatus) {
          this.doSaveEquipment()
        }
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
      this.input.productType = this.input.productType.value
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          productType: this.input.productType,
          eqCategory: 'Indoor'
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
    IndoorErrorExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}IndoorErrorExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'Error Indoor Upload - Excel Downlod.xlsx'
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
