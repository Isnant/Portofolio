export default {
  data () {
    return {
      dataList: [],
      listOfRegion: [],
      tableColumns: [
        {
          name: 'bid',
          label: 'Building Id',
          field: 'bid',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'buildingName',
          label: 'Building Name',
          field: 'buildingName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'itCode',
          label: 'IT Code',
          field: 'itCode',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'area',
          label: 'Area',
          field: 'area',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'region',
          label: 'Region',
          field: 'region',
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
          name: 'region',
          label: 'Region Name',
          field: 'region',
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
        bid: '',
        fidRegion: '',
        buildingType: '',
        buildingName: '',
        itCode: '',
        area: '',
        region: '',
        city: '',
        locationName: '',
        complexName: '',
        streetName: '',
        streetNumber: '',
        postalCode: '',
        phone: '',
        fax: ''
      }
    }
  },

  methods: {
    doInitPage () {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}getBuildingInitPage`, {
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
          console.log(this.dataList)
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
          this.dataList.forEach((element, index) => {
            if (element.statusEvent === 1) {
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
    doRefresh (props) {
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

          this.dataList.forEach((element, index) => {
            if (element.statusEvent === 1) {
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
    doOpenForm (cell) {
      if (cell !== undefined) {
        this.formData = JSON.parse(JSON.stringify(cell.row))
      } else {
        this.formData = {
          bid: '',
          fidRegion: '',
          buildingType: '',
          buildingName: '',
          itCode: '',
          area: '',
          region: '',
          city: '',
          locationName: '',
          complexName: '',
          streetName: '',
          streetNumber: '',
          postalCode: '',
          phone: '',
          fax: ''
        }
      }

      this.showForm = true
    },
    doSave () {
      this.$q.loading.show()

      this.$axios.post(`${process.env.urlPrefix}saveBuilding`, this.formData)
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

      this.doSave()
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
