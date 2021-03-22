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
      technologyList: ['ALL', 'FTTH', 'HFC'],
      searchVal: {
        hubCode: 'All',
        amplifier: '',
        technology: 'ALL'
      },
      tableColumns: [
        {
          name: 'equipmentName',
          label: 'Amplifier Name',
          field: 'equipmentName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'predecessor',
          label: 'Predecessor',
          field: 'predecessor',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'nodeCode',
          label: 'Node Code',
          field: 'nodeCode',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'psCode',
          label: 'PS Code',
          field: 'psCode',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'hubCode',
          label: 'Hub Name',
          field: 'hubCode',
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
          name: 'technology',
          label: 'Technology',
          field: 'technology',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center'
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
      showForm: false,
      formData: ''
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getAmplifierInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          hubCode: this.searchVal.hubCode,
          amplifier: this.searchVal.amplifier,
          technology: this.searchVal.technology
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data.listOfNode)
          this.hubCodeList = response.data.listOfHub
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
    getAmplifierList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getAmplifierList`, {
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
    doMainFillTableResult (pagedEquipment) {
      this.dataList = pagedEquipment.content
      this.pagination.rowsNumber = pagedEquipment.totalElements
      this.pagination.rowsPerPage = pagedEquipment.pageable.pageSize
      this.pagination.page = pagedEquipment.number + 1
    },
    doMainEquipmentChangePage (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const params = {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        descending: descending,
        hubCode: this.searchVal.hubCode,
        amplifier: this.searchVal.amplifier,
        technology: this.searchVal.technology
      }
      this.getAmplifierList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        hubCode: this.searchVal.hubCode,
        amplifier: this.searchVal.amplifier,
        technology: this.searchVal.technology
      }
      this.getAmplifierList(params)
    },
    getValueSelect () {
      this.searchVal.hubCode = this.searchVal.hubCode.value
    },
    doOpenForm (cell) {
      this.formData = JSON.parse(JSON.stringify(cell.row))
      this.showForm = true
    },
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}amplifierExcelDownload`, {
        responseType: 'arraybuffer',
        params: {
          hubCode: this.searchVal.hubCode,
          amplifier: this.searchVal.amplifier,
          technology: this.searchVal.technology
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'amplifier_excel_download.xlsx'
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
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
