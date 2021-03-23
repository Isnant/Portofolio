import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      list: [],
      listOfRegion: [],
      modalUploadExcel: false,
      modalDownloadExcel: false,
      downloadType: 'area',
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'area'
      },
      tableColumns: [
        {
          name: 'id',
          label: 'Area Id',
          field: 'id',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'areaName',
          label: 'Area Name',
          field: 'areaName',
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
      regionColumns: [
        {
          name: 'region',
          label: 'Region Name',
          field: 'region',
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
        sortBy: 'areaName',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      regionPagination: {
        sortBy: 'region',
        descending: false,
        rowsPerPage: 0
      },
      searchVal: {
        id: '',
        areaName: ''
      },
      showForm: false,
      formData: { id: 'AUTO GENERATE', areaName: '' }
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        searchVal: this.searchVal,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending
      }

      this.$axios.get(`${process.env.urlPrefix}getPagedArea/`, {
        params: params
      })
        .then((response) => {
          this.list = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
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
    doOpenForm (cell) {
      if (cell !== undefined) {
        this.formData = JSON.parse(JSON.stringify(cell.row))
        if (this.formData.region !== null) {
          this.listOfRegion = JSON.parse(this.formData.region)
        } else {
          this.listOfRegion = []
        }
        // this.$axios.get(`${process.env.urlPrefix}getRegionByArea/`, {
        //   params: { areaId: cell.row.id }
        // })
        //   .then((response) => {
        //     this.formData = response.data
        //     this.listOfRegion = JSON.parse(this.formData.region)
        //     this.$q.loading.hide()
        //   })
        //   .catch((error) => {
        //     this.$q.loading.hide()
        //     this.$q.notify({
        //       color: 'negative',
        //       icon: 'report_problem',
        //       message: error
        //     })
        //   })
      } else {
        this.formData = {
          id: 'AUTO GENERATE',
          areaName: ''
        }
      }

      this.showForm = true
    },
    doAddNewRegion () {
      let newRegion = {}

      this.$set(newRegion, 'region', '')
      this.$set(newRegion, 'recordStatus', 'A')

      this.listOfRegion.push(newRegion)
    },
    doSave (dactivate) {
      // this.$q.loading.show()
      this.showLoading()
      if (!dactivate) {
        this.formData.region = JSON.stringify(this.listOfRegion)
      }
      if (this.formData.id === 'AUTO GENERATE') {
        this.formData.id = ''
      }
      this.$axios.post(`${process.env.urlPrefix}doSaveArea`, this.formData)
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
        })
    },
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = cell.row
      this.doSave(true)
    },
    doToggleRegionStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.listOfRegion[cell] = cell.row
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
      this.$axios.post(`${process.env.urlPrefix}uploadArea`, this.fileAttach)
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
    downloadExcel () {
      if (this.downloadType === 'area') {
        this.areaExcelDownload()
      } else {
        this.regionExcelDownload()
      }
    },
    areaExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}areaExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'master_area.xlsx'
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
    regionExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}regionExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'master_region.xlsx'
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
        id: '',
        areaName: '',
        region: ''
      }
      this.listOfRegion = []
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
