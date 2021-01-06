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
      tableColumns: [
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          style: 'width: 100px',
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
          name: 'hubCodeIt',
          label: 'Hub Code It',
          field: 'hubCodeIt',
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
        sortBy: 'hubCode',
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
        hubName: ''
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
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHubCodeInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          hubCode: this.searchVal.hubCode,
          hubName: this.searchVal.hubName
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data.listOfHubCode)
          this.areaList = response.data.listOfAreaDropdown
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
    getHubCodeList (params) {
      // this.$q.loading.show()
      this.showLoading()

      this.$axios.get(`${process.env.urlPrefix}getHubCodeList`, {
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
        hubCode: this.searchVal.hubCode,
        hubName: this.searchVal.hubName
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
        hubName: this.searchVal.hubName
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
