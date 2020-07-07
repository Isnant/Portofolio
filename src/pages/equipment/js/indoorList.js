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
      listOfEquipment: [],
      modalUpload: false,
      modalAddNewAsset: false
    }
  },

  methods: {
    doMainFillTableResult (pagedEquipment) {
      this.listOfEquipment = pagedEquipment.content
      this.equipmentPagination.rowsNumber = pagedEquipment.totalElements
      this.equipmentPagination.page = pagedEquipment.number + 1
    },
    doMainInitPage () {
      this.$axios.post(`${process.env.urlPrefix}getIndoorInitPage/`, {
      })
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
      this.$q.loading.show()

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
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}doSaveEquipment`, this.input)
        .then((response) => {
          this.$q.notify({
            color: 'positive',
            icon: 'report_problem',
            message: `successfully submitted`
          })
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
    doUploadFile () {
      this.$q.loading.show()

      let fr = new FileReader()
      fr.onload = (e) => {
        this.$axios.post(`${process.env.urlPrefix}uploadIndoor`, { file64: e.target.result })
          .then((response) => {
            this.$q.loading.hide()

            this.$q.notify({
              color: 'positive',
              icon: 'info',
              message: 'File successfully uploaded'
            })

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
      fr.readAsDataURL(this.$refs.excelFile.files[0])
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
      this.$axios.get(`${process.env.urlPrefix}getBrand`, {
        params: {
          pid: this.input.manufacturer.value
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
