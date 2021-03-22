import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      listOfBrand: [],
      modalUploadExcel: false,
      modalDownloadExcel: false,
      downloadType: 'manufacturer',
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'manufacturer'
      },
      tableColumns: [
        {
          name: 'Manucaturer Code',
          label: 'Manucaturer Code',
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
        sortBy: 'description',
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
        pid: 'AUTO GENERATE',
        description: '',
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
      // this.$q.loading.show()
      this.showLoading()
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
        // this.$q.loading.show()
        this.showLoading()
        this.$axios.get(`${process.env.urlPrefix}getManufacturerBrandDetail`, {
          params: {
            pid: pid
          }
        })
          .then((response) => {
            this.formData = response.data
            this.formData.mode = 'update'
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
    doSave (dactivate) {
      // this.$q.loading.show()
      this.showLoading()
      if (!dactivate) {
        this.formData.brand = JSON.stringify(this.listOfBrand)
      }
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
      let newBrand = {}
      this.$set(newBrand, 'brand', '')
      this.$set(newBrand, 'recordStatus', 'A')

      this.listOfBrand.push(newBrand)
    },
    doToggleStatus (props) {
      props.row.recordStatus = props.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = props.row
      this.formData.mode = 'update'
      this.doSave(true)
    },
    doToggleSubTypeStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.listOfBrand[cell] = cell.row
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
    uploadManufacturerBrand (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadManufacturerBrand`, this.fileAttach)
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
      if (this.downloadType === 'manufacturer') {
        this.manufacturerExcelDownload()
      } else {
        this.brandExcelDownload()
      }
    },
    brandExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}brandExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'master_brand.xlsx'
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
    manufacturerExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}manufacturerExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'master_manufacturer.xlsx'
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
        pid: 'AUTO GENERATE',
        description: '',
        mode: 'create'
      }
      this.listOfBrand = []
    }
  }
}
