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
      bdfTypeList: [],
      modalUploadExcel: false,
      fileAttach: {
        fileName: '',
        file64: '',
        equipmentCategory: 'Network'
      },
      tableColumns: [
        {
          name: 'bdfId',
          label: 'BDF Id',
          field: 'bdfId',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'bdfCode',
          label: 'BDF Code',
          field: 'bdfCode',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'bdfName',
          label: 'BDF Name',
          field: 'bdfName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'bdfType',
          label: 'BDF Type',
          field: 'bdfType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'areaName',
          label: 'Area',
          field: 'areaName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'regionName',
          label: 'Region',
          field: 'regionName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'city',
          label: 'City',
          field: 'city',
          align: 'left',
          sortable: true
        },
        {
          name: 'address',
          label: 'Address',
          field: 'address',
          align: 'left',
          sortable: true
        },
        {
          name: 'postalCode',
          label: 'Postal Code',
          field: 'postalCode',
          align: 'left',
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
        sortBy: 'bdfCode',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      showForm: false,
      searchVal: {
        bdfCode: '',
        bdfName: ''
      },
      formData: {
        bdfId: 'AUTO GENERATE',
        bdfCode: '',
        bdfName: '',
        bdfType: '',
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
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getBdfInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          bdfCode: this.searchVal.bdfCode,
          bdfName: this.searchVal.bdfName
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data.listOfBDF)
          this.areaList = response.data.listOfAreaDropdown
          this.bdfTypeList = response.data.listOfBdfType
          this.listOfAreaForRegion = response.data.listOfArea
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
    doMainFillTableResult (pagedEquipment) {
      this.dataList = pagedEquipment.content
      this.pagination.rowsNumber = pagedEquipment.totalElements
      this.pagination.rowsPerPage = pagedEquipment.pageable.pageSize
      this.pagination.page = pagedEquipment.number + 1
    },
    getBdfList (params) {
      // this.$q.loading.show()
      this.showLoading()

      this.$axios.get(`${process.env.urlPrefix}getBdfList`, {
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
        bdfCode: this.searchVal.bdfCode,
        bdfName: this.searchVal.bdfName
      }
      this.getBdfList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        bdfCode: this.searchVal.bdfCode,
        bdfName: this.searchVal.bdfName
      }
      this.getBdfList(params)
    },
    doOpenForm (cell) {
      if (cell !== undefined) {
        this.formData = JSON.parse(JSON.stringify(cell.row))
      } else {
        this.clear()
      }
      this.showForm = true
    },
    doSave () {
      // this.$q.loading.show()
      this.showLoading()
      if (this.formData.bdfId === 'AUTO GENERATE') {
        this.formData.bdfId = ''
      }
      this.$axios.post(`${process.env.urlPrefix}saveBdf`, this.formData)
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
          label: data.region,
          value: data.region
        }))
      } else {
        this.filteredRegionList = []
        this.formData.region = ''
      }
    },
    doRegion () {
      this.formData.regionName = this.formData.regionName.value
    },
    getBdfTypeValue () {
      this.formData.bdfType = this.formData.bdfType.value
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
      this.$axios.post(`${process.env.urlPrefix}uploadBDF`, this.fileAttach)
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
      this.$axios.get(`${process.env.urlPrefix}bdfDownloadExcel`, {
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
          link.download = 'master_bdf.xlsx'
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
        bdfId: 'AUTO GENERATE',
        bdfCode: '',
        bdfName: '',
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
  beforeMount () {
    this.doInitPage()
  }
}
