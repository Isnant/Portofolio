import moment from 'moment'
export default {
  beforeMount () {
    this.getInitPage()
  },
  data () {
    return {
      dataList: [],
      jobStatusType: '',
      masterName: '',
      columnName: '',
      masterFormLabel: '',
      isCreate: false,
      columns: [
        {
          name: 'attributedesc',
          label: 'Division Name',
          field: 'attributedesc',
          align: 'left',
          sortable: true
        },
        {
          name: 'createdDate',
          label: 'Create Date',
          field: 'createdDate',
          align: 'center',
          sortable: true
        },
        {
          name: 'recordStatus',
          label: 'Status',
          field: 'recordStatus',
          align: 'center',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          field: 'action',
          align: 'center'
        }
      ],
      pagination: {
        sortBy: 'attributename',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      formSearch: {
        jobstatusName: ''
      },
      masterForm: false,
      historyForm: false,
      input: {
        attributeid: '',
        attributename: 'division',
        attributedesc: '',
        attributecode: '1',
        attributemap: 'Asset'
      },
      instance: {
        name: '',
        rights: [],
        createBy: undefined
      },
      deactiveTittle: 'Deactivate Special Event',
      deactivateText: 'Are You Sure to Deactivate this ?',
      mode: 'deactivate',
      deactivateError: '',
      deactivateSucces: ''
    }
  },
  methods: {
    getInitPage () {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getStringmapInitPage`, {
        params: {
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          attributename: this.input.attributename,
          attributedesc: this.formSearch.jobstatusName
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.dataList = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
          this.dataList.forEach((element, index) => {
            if (element.recordStatus === 'A') {
              this.dataList[index].activeStatus = true
              this.dataList[index].nonActiveStatus = false
            } else {
              this.dataList[index].activeStatus = false
              this.dataList[index].nonActiveStatus = true
            }
          })
          this.rights = response.data.listOfRights
          this.updateColumn()
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
    getContent (props) {
      this.$q.loading.show()
      var pageIndex = ''
      var pageSize = ''
      var sortBy = ''
      var descending = ''
      if (typeof props === 'undefined') {
        pageIndex = this.pagination.page - 1
        pageSize = this.pagination.rowsPerPage
        sortBy = this.pagination.sortBy
        descending = this.pagination.descending
      } else {
        pageIndex = props.pagination.page - 1
        pageSize = props.pagination.rowsPerPage
        sortBy = props.pagination.sortBy
        descending = props.pagination.descending
        this.pagination.sortBy = props.pagination.sortBy
        this.pagination.descending = props.pagination.descending
      }

      this.$axios.get(`${process.env.urlPrefix}getStringmapList`, {
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          sortBy: sortBy,
          descending: descending,
          attributename: this.input.attributename,
          attributedesc: this.formSearch.jobstatusName
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
          this.pagination.rowsPerPage = response.data.pageable.pageSize

          this.dataList.forEach((element, index) => {
            if (element.recordStatus === 'true') {
              this.dataList[index].activeStatus = true
              this.dataList[index].nonActiveStatus = false
            } else {
              this.dataList[index].activeStatus = false
              this.dataList[index].nonActiveStatus = true
            }
          })
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
    doOpenForm (id) {
      if (id === false) {
        this.masterForm = true
        this.isCreate = true
      } else {
        this.$q.loading.show()
        this.$axios.get(`${process.env.urlPrefix}getDetailStringmap`, {
          params: {
            id: id
          }
        })
          .then((response) => {
            this.input = response.data
            this.masterForm = true
            this.isCreate = false
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
    doSubmit () {
      this.$refs.masterName.validate()
      var vMasterName = this.$refs.masterName.hasError

      if (!vMasterName) {
        this.doSave()
      }
    },
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.input = cell.row
      this.doSave()
    },
    doSave () {
      this.$q.loading.show()
      var vSucces = ''
      if (this.isCreate) {
        vSucces = '" Saved'
      } else {
        vSucces = '" Updated'
      }

      this.$axios.post(`${process.env.urlPrefix}doSaveStringmap`, this.input)
        .then((response) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            icon: 'done',
            message: this.masterName + ': "' + this.input.attributedesc + vSucces
          })

          this.masterForm = false
          this.Reset()
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
    doShowHistory (props) {
      this.input = props.row
      this.input.createdDate = moment(this.input.createdDate).format('DD/MM/YYYY HH:mm')
      this.input.lastModified = moment(this.input.lastModified).format('DD/MM/YYYY HH:mm')
      this.historyForm = true
    },
    Reset () {
      this.getInitPage()
      this.clear()
    },
    clearSearch () {
      if (this.formSearch.jobstatusName === null) {
        this.formSearch.jobstatusName = ''
        this.getInitPage()
      }
    },
    clear () {
      this.input.attributeid = ''
      this.input.attributedesc = ''
      this.input.attributecode = '1'
      this.input.attributemap = 'Asset'
      this.getInitPage()
    },
    updateColumn () {
      if (this.input.attributename === 'division') {
        this.columnName = 'Division Name'
        this.masterName = 'Division'
      } else if (this.input.attributename === 'department') {
        this.columnName = 'Department Name'
        this.masterName = 'Department'
      } else if (this.input.attributename === 'assetCategory') {
        this.columnName = 'Asset Category Name'
        this.masterName = 'Asset Category'
      } else if (this.input.attributename === 'propertyOf') {
        this.columnName = 'PropertyOf Name'
        this.masterName = 'Property Of'
      } else if (this.input.attributename === 'statusReason') {
        this.columnName = 'Status Reason Name'
        this.masterName = 'Status Reason'
      } else if (this.input.attributename === 'technology') {
        this.columnName = 'Technology'
        this.masterName = 'Technology'
      } else if (this.input.attributename === 'service') {
        this.columnName = 'Service Name'
        this.masterName = 'Service'
      } else if (this.input.attributename === 'capacityUnits') {
        this.columnName = 'Capacity Units'
        this.masterName = 'Capacity Units'
      } else if (this.input.attributename === 'assetStatus') {
        this.columnName = 'Asset Status Name'
        this.masterName = 'Asset Status'
      } else if (this.input.attributename === 'hubType') {
        this.columnName = 'Hub Type Name'
        this.masterName = 'Hub Type'
      } else if (this.input.attributename === 'bdfType') {
        this.columnName = 'BDF Type Name'
        this.masterName = 'BDF Type'
      }

      this.masterFormLabel = this.masterName + ' Form'
      this.columns = [
        {
          name: 'attributedesc',
          label: this.columnName,
          field: 'attributedesc',
          align: 'left',
          sortable: true
        },
        {
          name: 'createdDate',
          label: 'Create Date',
          field: 'createdDate',
          align: 'center',
          sortable: true
        },
        {
          name: 'recordStatus',
          label: 'Status',
          field: 'recordStatus',
          align: 'center',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          field: 'action',
          align: 'center'
        }
      ]
    }
  }
}
