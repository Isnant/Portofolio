import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      listOfSubType: [],
      tableColumns: [
        {
          name: 'pid',
          label: 'Type Code',
          field: 'pid',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'equipmentCategory',
          label: 'Type Name',
          field: 'equipmentCategory',
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
      subTypeColumns: [
        {
          name: 'id',
          label: 'Sub Type Id',
          field: 'id',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'subtype',
          label: 'Subtype Name',
          field: 'subtype',
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
        descending: false
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
        equipmentCategory: '',
        mode: 'create'
      }
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getProductTypeSubTypeInitPage`, {
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
    getProductTypeSubTypeList (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.pagination.sortBy = props.pagination.sortBy
      this.pagination.descending = props.pagination.descending

      this.$axios.get(`${process.env.urlPrefix}getProductTypeSubTypeList`, {
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
        // this.$q.loading.show()
        this.showLoading()
        this.$axios.get(`${process.env.urlPrefix}getProductTypeSubTypeDetail`, {
          params: {
            pid: pid
          }
        })
          .then((response) => {
            this.formData = response.data
            this.listOfSubType = JSON.parse(this.formData.subType)
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
    doSave (deactivate) {
      // this.$q.loading.show()
      this.showLoading()
      if (!deactivate) {
        this.formData.subType = JSON.stringify(this.listOfSubType)
      }
      this.$axios.post(`${process.env.urlPrefix}saveProductTypeSubType`, this.formData)
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
          this.showForm = false
          this.doRefresh()
        })
    },
    doAddNewRegion () {
      let newSubType = {}

      this.$set(newSubType, 'id', '')
      this.$set(newSubType, 'subtype', '')
      this.$set(newSubType, 'recordStatus', 'A')

      this.listOfSubType.push(newSubType)
    },
    doToggleStatus (props) {
      props.row.recordStatus = props.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = props.row
      this.formData.mode = 'update'
      this.doSave(true)
    },
    doToggleSubTypeStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.listOfSubType[cell] = cell.row
    },
    doRefresh () {
      this.clear()
      this.doInitPage()
    },
    clear () {
      this.formData = {
        pid: '',
        equipmentCategory: '',
        mode: 'create'
      }
      this.listOfSubType = []
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
