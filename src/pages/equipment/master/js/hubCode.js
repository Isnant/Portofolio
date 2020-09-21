export default {
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
        id: '',
        area: ''
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
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getHubCodeInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.listOfHubCode.content
          this.pagination.rowsNumber = response.data.listOfHubCode.totalElements
          this.pagination.page = response.data.listOfHubCode.number + 1
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
    getBuildingList (props) {
      this.$q.loading.show()
      this.pagination.sortBy = props.pagination.sortBy
      this.pagination.descending = props.pagination.descending

      this.$axios.get(`${process.env.urlPrefix}getBuildingList`, {
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
      this.$q.loading.show()

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
