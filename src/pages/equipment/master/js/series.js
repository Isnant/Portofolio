export default {
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
          sortable: true,
          headerClasses: 'bg-indigo-8 text-white'
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
          name: 'manufacturerId',
          label: 'Manufacturer',
          field: 'manufacturerId',
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
        id: '',
        area: ''
      },
      showForm: false,
      formData: {
        pid: '',
        description: '',
        manufacturerId: '',
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
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getProductSeriesInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.listOfProductSeries.content
          this.pagination.rowsNumber = response.data.listOfProductSeries.totalElements
          this.pagination.page = response.data.listOfProductSeries.number + 1
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
    getManufacturerBrandList (props) {
      this.$q.loading.show()
      this.pagination.sortBy = props.pagination.sortBy
      this.pagination.descending = props.pagination.descending

      this.$axios.get(`${process.env.urlPrefix}getProductSeriesList`, {
        params: {
          pageIndex: props.pagination.page - 1,
          pageSize: props.pagination.rowsPerPage,
          sortBy: props.pagination.sortBy,
          descending: props.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
          this.pagination.rowsPerPage = response.data.pageable.pageSize
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
    doOpenForm (pid) {
      if (pid === false) {
        this.showForm = true
      } else {
        this.$q.loading.show()
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
      this.$q.loading.show()
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
      this.formData.manufacturerId = this.formData.manufacturerId.value
      var brand = this.listOfManufacturer.filter(v => v.pid.indexOf(this.formData.manufacturerId) > -1)[0].brand
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
