import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      listOfBrand: [],
      listOfManufacturer: [],
      manufacturerCodeList: [],
      modalUploadExcel: false,
      productTypeList: [],
      filteredBrandList: [],
      subTypeList: [],
      subTypeListResult: [],
      subTypeForList: '',
      productSubType: '',
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Network'
      },
      tableColumns: [
        {
          name: 'pid',
          label: 'Series Code',
          field: 'pid',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'series',
          label: 'Series',
          field: 'series',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'manufacturer',
          label: 'Manufacturer',
          field: 'manufacturer',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'brand',
          label: 'Brand',
          field: 'brand',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'productSubType',
          label: 'Sub Type',
          field: 'productSubType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'unit',
          label: 'Unit',
          field: 'unit',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'recordStatus',
          label: 'Status',
          field: 'recordStatus',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center',
          style: 'width: 100px'
        }
      ],
      pagination: {
        sortBy: 'id',
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        descending: true
      },
      subTypePagination: {
        sortBy: 'id',
        descending: false,
        rowsPerPage: 0
      },
      searchVal: {
        series: ''
      },
      showForm: false,
      formData: {
        pid: 'AUTO GENERATE',
        description: '',
        manufacturer: '',
        brand: '',
        productType: '',
        mode: 'create',
        productSubType: '',
        unit: ''
      }
    }
  },
  beforeMount () {
    this.doInitPage()
  },
  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getProductSeriesInitPage`, {
        params: {
          pageIndex: 0,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          series: this.searchVal.series
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data.listOfProductSeries)
          this.manufacturerCodeList = response.data.listOfManufacturerDropdown
          this.listOfManufacturer = response.data.listOfManufacturer
          this.productTypeList = response.data.listOfProductTypeDropdown.map(data => ({
            label: data.value.toUpperCase() + ' (' + data.cascadeValue.toUpperCase() + ')',
            value: data.value.toUpperCase(),
            cascadeValue: data.cascadeValue
          }))
          // this.productTypeList = response.data.listOfProductTypeDropdown.sort(this.compareValue)
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
    getProductSeriesList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getProductSeriesList`, {
        params: params
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data)
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
    doMainFillTableResult (pagedEquipment) {
      this.dataList = pagedEquipment.content
      this.pagination.rowsNumber = pagedEquipment.totalElements
      this.pagination.rowsPerPage = pagedEquipment.pageable.pageSize
      this.pagination.page = pagedEquipment.number + 1
    },
    doMainEquipmentChangePage (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const params = {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        descending: descending,
        series: this.searchVal.series
      }
      this.getProductSeriesList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        series: this.searchVal.series
      }
      this.getProductSeriesList(params)
    },
    doOpenForm (pid) {
      if (pid === false) {
        this.showForm = true
      } else {
        // this.$q.loading.show()
        this.showLoading()
        this.$axios.get(`${process.env.urlPrefix}getProductSeriesDetail`, {
          params: {
            pid: pid
          }
        })
          .then((response) => {
            this.formData = response.data
            this.formData.mode = 'update'
            this.showForm = true
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
    doSave () {
      // this.$q.loading.show()
      this.showLoading()
      if (this.formData.pid === 'AUTO GENERATE') {
        this.formData.pid = ''
      }
      this.$axios.post(`${process.env.urlPrefix}saveProductSeries`, this.formData)
        .then((response) => {
          this.$q.loading.hide()
          if (response.data === 'Success') {
            this.$q.notify({
              color: 'positive',
              icon: 'info',
              message: 'Record successfully saved'
            })
          } else {
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: response.data
            })
          }
          this.showForm = false
          this.doRefresh()
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
    getBrand () {
      this.formData.manufacturer = this.formData.manufacturer.value
      var brand = this.listOfManufacturer.filter(v => v.description.indexOf(this.formData.manufacturer) > -1)[0].brand
      if (brand !== null) {
        var brandList = JSON.parse(brand)
        this.filteredBrandList = brandList.map(data => ({
          label: data.brand.toUpperCase(),
          value: data.brand.toUpperCase()
        }))
      } else {
        this.filteredBrandList = []
        this.formData.brand = ''
      }
    },
    getSubType () {
      this.showLoading()
      var category = this.formData.productType.cascadeValue
      this.formData.productType = this.formData.productType.value
      this.$axios.get(`${process.env.urlPrefix}getSubType`, {
        params: {
          productType: this.formData.productType,
          eqCategory: category
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
    getBrandValue () {
      this.formData.brand = this.formData.brand.value
    },
    // getProductTypeValue () {
    //   this.formData.productType = this.formData.productType.value
    //   this.getSubType()
    // },
    getSubTypeValue () {
      this.formData.productSubType = this.formData.productSubType.value
    },
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = cell.row
      this.formData.mode = 'update'
      this.doSave()
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
    uploadField (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadSeries`, this.fileAttach)
        .then((response) => {
          this.modalUploadExcel = false
          this.$q.loading.hide()
          this.doInitPage()
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
      this.$axios.get(`${process.env.urlPrefix}productSeriesDownloadExcel`, {
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
          link.download = 'master_product_series.xlsx'
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
    clear () {
      this.formData = {
        pid: 'AUTO GENERATE',
        description: '',
        manufacturerId: '',
        brand: '',
        productTypeSubType: '',
        mode: 'create'
      }
    },
    doRefresh () {
      this.clear()
      this.doInitPage()
    }
  }
}
