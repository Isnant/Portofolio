import showLoading from '../../js/loading.js'
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
      modalUploadExcel: false,
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Network'
      },
      tableColumns: [
        {
          name: 'hubRoomId',
          label: 'Hub Room Id ',
          field: 'hubRoomId',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'hubCodeRoom',
          label: 'Hub Room Code ',
          field: 'hubCodeRoom',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'room',
          label: 'Room',
          field: 'room',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'floor',
          label: 'Floor',
          field: 'floor',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'hubName',
          label: 'Hub Name',
          field: 'hubName',
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
        sortBy: 'hubCodeRoom',
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
        hubName: '',
        area: ''
      },
      showForm: false,
      formData: {
        hubRoomId: 'AUTO GENERATE',
        hubCodeRoom: '',
        hubName: '',
        floor: '',
        room: ''
      }
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHubRoomInitPage`, {
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
    getHubRoomList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHubRoomList`, {
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
        hubName: this.searchVal.hubName
      }
      this.getHubRoomList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        hubName: this.searchVal.hubName
      }
      this.getHubRoomList(params)
    },
    doOpenForm (cell) {
      if (cell !== undefined) {
        this.formData = JSON.parse(JSON.stringify(cell.row))
        this.vDisable = true
      } else {
        this.clear()
        this.vDisable = false
      }
      this.showForm = true
    },
    doSave () {
      // this.$q.loading.show()
      this.showLoading()
      if (this.formData.hubRoomId === 'AUTO GENERATE') {
        this.formData.hubRoomId = ''
      }
      this.$axios.post(`${process.env.urlPrefix}saveHubRoom`, this.formData)
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
      this.$axios.post(`${process.env.urlPrefix}uploadHubRoom`, this.fileAttach)
        .then((response) => {
          this.modalUploadExcel = false
          this.$q.loading.hide()
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
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}hubRoomExcelDownload`, {
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
          link.download = 'master_hub_room.xlsx'
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
        hubRoomId: 'AUTO GENERATE',
        hubCodeRoom: '',
        hubName: '',
        floor: '',
        room: ''
      }
      this.vDisable = false
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
