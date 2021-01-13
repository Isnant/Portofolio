import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      listOfBrand: [],
      listOfManufacturer: [],
      manufacturerCodeList: [],
      productTypeList: [],
      filteredBrandList: [],
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
          name: 'productTypeSubType',
          label: 'Product Type',
          field: 'productTypeSubType',
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
      brandColumns: [
        {
          name: 'id',
          label: 'Brand Id',
          field: 'id',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'brand',
          label: 'Brand Name',
          field: 'brand',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'recordStatus',
          label: 'Status',
          field: 'recordStatus',
          align: 'left',
          style: 'width: 200px',
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
        pid: '',
        description: '',
        manufacturer: '',
        brand: '',
        productTypeSubType: '',
        mode: 'create'
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
          this.productTypeList = response.data.listOfProductTypeDropdown
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
    getBrandValue () {
      this.formData.brand = this.formData.brand.value
    },
    getProductTypeValue () {
      this.formData.productTypeSubType = this.formData.productTypeSubType.value
    },
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = cell.row
      this.formData.mode = 'update'
      this.doSave()
    },
    clear () {
      this.formData = {
        pid: '',
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
