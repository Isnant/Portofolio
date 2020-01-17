export default {
  data () {
    return {
      dataList: [],
      listOfBrand: [],
      tableColumns: [
        {
          name: 'pid',
          label: 'Id',
          field: 'pid',
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
        productTypeSubType: '',
        mode: 'create'
      }
    }
  },

  methods: {
    doInitPage () {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getManufacturerBrandInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
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

      this.$axios.get(`${process.env.urlPrefix}getManufacturerBrandList`, {
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
        this.$axios.get(`${process.env.urlPrefix}getManufacturerBrandDetail`, {
          params: {
            pid: pid
          }
        })
          .then((response) => {
            this.formData = response.data
            this.listOfBrand = JSON.parse(this.formData.brand)
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
      this.formData.brand = JSON.stringify(this.listOfBrand)
      this.$axios.post(`${process.env.urlPrefix}saveManufacturerBrand`, this.formData)
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
        })
        .catch((error) => {
          this.$q.loading.hide()

          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
      this.doRefresh()
    },
    doAddNewRegion () {
      let newBrand = {}
      this.$set(newBrand, 'id', '')
      this.$set(newBrand, 'brand', '')
      this.$set(newBrand, 'recordStatus', 'A')

      this.listOfBrand.push(newBrand)
    },
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = cell.row
      this.doSave()
    },
    doToggleSubTypeStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.listOfBrand[cell] = cell.row
    },
    clear () {
      this.formData = {
        pid: '',
        description: '',
        productTypeSubType: '',
        mode: 'create'
      }
      this.listOfBrand = []
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
