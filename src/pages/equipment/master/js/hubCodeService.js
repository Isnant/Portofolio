import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      hubCodeList: [],
      serviceList: [],
      modalUploadExcel: false,
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Network'
      },
      tableColumns: [
        {
          name: 'hubName',
          label: 'Hub Name',
          field: 'hubName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'hubCode',
          label: 'Hub Code Service',
          field: 'hubCode',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'ftax',
          label: 'Ftax',
          field: 'ftax',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'service',
          label: 'Service',
          field: 'service',
          align: 'left',
          style: 'width: 100px',
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
      regionColumns: [
        {
          name: 'id',
          label: 'Region Id',
          field: 'id',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'regioName',
          label: 'Region Name',
          field: 'regioName',
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
        sortBy: 'hubName',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      regionPagination: {
        sortBy: 'region',
        descending: false,
        rowsPerPage: 0
      },
      searchVal: {
        hubCode: '',
        hubName: '',
        service: 'ALL'
      },
      serviceSearchList: ['ALL', 'Analog', 'Digital', 'FTTH'],
      showForm: false,
      formData: {
        id: 'AUTO GENERATE',
        hubCode: '',
        hubName: '',
        service: '',
        ftax: ''
      }
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHubCodeServiceInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          hubCode: this.searchVal.hubCode,
          hubName: this.searchVal.hubName,
          service: this.searchVal.service
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data.listOfHubCodeService)
          this.serviceList = response.data.listOfService
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
    getHubCodeList (params) {
      // this.$q.loading.show()
      this.showLoading()

      this.$axios.get(`${process.env.urlPrefix}getHubCodeServiceList`, {
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
    doMainFillTableResult (data) {
      this.dataList = data.content
      this.pagination.rowsNumber = data.totalElements
      this.pagination.rowsPerPage = data.pageable.pageSize
      this.pagination.page = data.number + 1
    },
    doMainEquipmentChangePage (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const params = {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        descending: descending,
        hubCode: this.searchVal.hubCode,
        hubName: this.searchVal.hubName,
        service: this.searchVal.service
      }
      this.getHubCodeList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        hubCode: this.searchVal.hubCode,
        hubName: this.searchVal.hubName,
        service: this.searchVal.service
      }
      this.getHubCodeList(params)
    },
    doOpenForm (cell) {
      if (cell !== undefined) {
        this.formData = JSON.parse(JSON.stringify(cell.row))
        this.vDisable = true
      } else {
        this.clear()
      }
      this.showForm = true
    },
    doSave () {
      // this.$q.loading.show()
      this.showLoading()
      if (this.formData.id === 'AUTO GENERATE') {
        this.formData.id = ''
      }
      this.$axios.post(`${process.env.urlPrefix}saveHubCodeService`, this.formData)
        .then((response) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            icon: 'info',
            message: 'Record successfully saved'
          })

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
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = cell.row
      this.doSave()
    },
    getSelectValue () {
      this.formData.service = this.formData.service.value
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
      this.$axios.post(`${process.env.urlPrefix}uploadHubCodeService`, this.fileAttach)
        .then((response) => {
          this.modalUploadExcel = false
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
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}hubServiceDownloadExcel`, {
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
          link.download = 'master_hub_service.xlsx'
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
    doRefresh () {
      this.clear()
      this.doInitPage()
    },
    clear () {
      this.formData = {
        id: 'AUTO GENERATE',
        hubCode: '',
        hubCodeService: ''
      }
      this.vDisable = false
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
