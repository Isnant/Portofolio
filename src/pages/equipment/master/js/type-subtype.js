import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      listOfSubType: [],
      modalUploadExcel: false,
      modalDownloadExcel: false,
      downloadType: 'productType',
      categoryList: ['Field', 'Indoor', 'Network'],
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'productType'
      },
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
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'equipmentCategory',
          label: 'Equipment Category',
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
        productType: '',
        category: 'ALL'
      },
      categorySearchList: ['ALL', 'Field', 'Indoor', 'Network'],
      showForm: false,
      formData: {
        pid: 'AUTO GENERATE',
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
    getProductTypeSubTypeList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getProductTypeSubTypeList`, {
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
        productType: this.searchVal.productType,
        category: this.searchVal.category
      }
      this.getProductTypeSubTypeList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        productType: this.searchVal.productType,
        category: this.searchVal.category
      }
      this.getProductTypeSubTypeList(params)
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
      if (this.formData.pid === 'AUTO GENERATE') {
        this.formData.pid = ''
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
    doAttachFile (file) {
      let fr = new FileReader()
      this.uploadButton = true
      fr.onload = (e) => {
        this.fileAttach.fileName = file.name
        this.fileAttach.file64 = e.target.result
      }
      fr.readAsDataURL(file)
    },
    uploadProductType (file) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.post(`${process.env.urlPrefix}uploadProductType`, this.fileAttach)
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
      if (this.downloadType === 'productType') {
        this.productTypeExcelDownload()
      } else {
        this.subTypeExcelDownload()
      }
    },
    productTypeExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}productTypeExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'master_product_type.xlsx'
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
    subTypeExcelDownload (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}subTypeExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'master_sub_type.xlsx'
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
    doAddNewSubType () {
      let newSubType = {}

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
        pid: 'AUTO GENERATE',
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
