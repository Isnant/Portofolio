export default {
  data () {
    return {
      list: [],
      listOfRegion: [],
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
          name: 'area',
          label: 'Area Name',
          field: 'area',
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
        sortBy: 'area',
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
        area: ''
      },
      showForm: false,
      formData: { id: '', area: '' }
    }
  },

  methods: {
    doInitPage () {
      this.doRefresh()
    },
    doRefresh () {
      this.$q.loading.show()

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
      console.log(cell)
      if (cell !== undefined) {
        this.formData = JSON.parse(JSON.stringify(cell.row))

        this.$q.loading.show()

        this.$axios.get(`${process.env.urlPrefix}getRegionByArea/`, {
          params: { areaId: cell.row.id }
        })
          .then((response) => {
            this.listOfRegion = response.data
            console.log(JSON.parse(JSON.stringify(this.listOfRegion)))
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
      } else {
        this.formData = {
          id: '',
          area: ''
        }
      }

      this.showForm = true
    },
    doAddNewRegion () {
      let newRegion = {}

      this.$set(newRegion, 'id', '')
      this.$set(newRegion, 'region', '')
      this.$set(newRegion, 'recordStatus', 'A')

      this.listOfRegion.push(newRegion)
    },
    doSave () {
      this.$q.loading.show()

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

      this.doSave()
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
