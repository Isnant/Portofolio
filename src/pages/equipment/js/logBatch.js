import showLoading from './loading.js'
import moment from 'moment'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      areaList: [],
      regionList: [],
      filteredRegionList: [],
      listOfRegion: [],
      listOfAreaForRegion: [],
      equipmentCategoryList: ['Field', 'Hub', 'Network'],
      tableColumns: [
        {
          name: 'id',
          label: 'Batch',
          field: 'id',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'fileName',
          label: 'File Name',
          field: 'fileName',
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
          name: 'createdDate',
          label: 'Upload Date',
          field: 'createdDate',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'createdBy',
          label: 'Upload By',
          field: 'createdBy',
          align: 'left',
          style: 'width: 200px',
          sortable: true
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
        sortBy: 'createdDate',
        descending: true,
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
        id: '',
        fileName: '',
        equipmentCategory: '',
        startDate: '',
        endDate: ''

      },
      showForm: false,
      formData: {
        hubCode: '',
        hubName: '',
        hubCodeIt: '',
        areaName: '',
        regionName: '',
        city: '',
        address: '',
        postalCode: '',
        phone: '',
        remarks: ''
      }
    }
  },

  methods: {
    doInitPage () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        id: this.searchVal.id,
        equipmentCategory: this.searchVal.equipmentCategory,
        fileName: this.searchVal.fileName,
        startDate: this.searchVal.startDate,
        endDate: this.searchVal.endDate
      }
      this.getLogBatchList(params)
    },
    doMainFillTableResult (pagedEquipment) {
      this.dataList = pagedEquipment.content
      this.pagination.rowsNumber = pagedEquipment.totalElements
      this.pagination.rowsPerPage = pagedEquipment.pageable.pageSize
      this.pagination.page = pagedEquipment.number + 1
    },
    getLogBatchList (params) {
      // this.$q.loading.show()
      this.showLoading()
      const userToken = localStorage.getItem('user-token')
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_08') === -1) {
        this.$router.push('/')
      }
      this.$axios.get(`${process.env.urlPrefix}getLogBatchList`, {
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
    doMainEquipmentChangePage (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const params = {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        descending: descending,
        id: this.searchVal.id,
        equipmentCategory: this.searchVal.equipmentCategory,
        fileName: this.searchVal.fileName,
        startDate: this.searchVal.startDate,
        endDate: this.searchVal.endDate
      }
      this.getLogBatchList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        id: this.searchVal.id,
        equipmentCategory: this.searchVal.equipmentCategory,
        fileName: this.searchVal.fileName,
        startDate: this.searchVal.startDate,
        endDate: this.searchVal.endDate
      }
      this.getLogBatchList(params)
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

      this.$axios.post(`${process.env.urlPrefix}saveHubCode`, this.formData)
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
    getRegion () {
      this.formData.areaName = this.formData.areaName.value
      var region = this.listOfAreaForRegion.filter(v => v.areaName.indexOf(this.formData.areaName) > -1)[0].region
      if (region !== null) {
        var RegionList = JSON.parse(region)
        this.filteredRegionList = RegionList.map(data => ({
          label: data.region.toUpperCase(),
          value: data.region.toUpperCase()
        }))
      } else {
        this.filteredRegionList = []
        this.formData.region = ''
      }
    },
    doRegion () {
      this.formData.regionName = this.formData.regionName.value
    },
    doRefresh () {
      this.clear()
      this.doInitPage()
    },
    doDownload (props) {
      var element = document.createElement('a')
      element.setAttribute('href', props.row.fileContent)
      element.setAttribute('download', props.row.fileName)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getLogBatch`, {
        params: {
          id: props.row.id
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          var element = document.createElement('a')
          element.setAttribute('href', response.data.fileContent)
          element.setAttribute('download', response.data.fileName)
          element.style.display = 'none'
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
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
    downloadExcelButtom (props) {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}logBatchExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'Log Batch - Excel Download.xlsx'
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
    doStartDate () {
      this.$refs.qStartDate.hide()
      // this.searchVal.endDate = this.searchVal.startDate
    },
    optionsEndDate (date) {
      return date >= moment(this.searchVal.startDate).format('YYYY/MM/DD')
    },
    clear () {
      this.formData = {
        hubCode: '',
        hubName: '',
        hubCodeIt: '',
        areaName: '',
        regionName: '',
        city: '',
        address: '',
        postalCode: '',
        phone: '',
        remarks: ''
      }
      this.vDisable = false
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
