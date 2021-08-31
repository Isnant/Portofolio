import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      eqCategoryList: ['All', 'Field', 'Indoor', 'Network'],
      hubCodeList: [],
      tableColumns: [
        {
          name: 'equipmentCategory',
          label: 'Equipment Category',
          field: 'equipmentCategory',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          style: 'width: 200px',
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
          name: 'equipmentSum',
          label: 'Jumlah',
          field: 'equipmentSum',
          align: 'right',
          sortable: true
        }
      ],
      pagination: {
        sortBy: 'equipmentCategory',
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      searchVal: {
        eqCategory: 'All',
        hubCode: 'All'
      },
      showForm: false
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      if (this.searchVal.eqCategory === 'Indoor') {
        this.searchVal.eqCategory = 'Hub'
      }
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getReportEquipment`, {
        params: {
          eqCategory: this.searchVal.eqCategory,
          hubCode: this.searchVal.hubCode
        }
      })
        .then((response) => {
          this.doMainFillTableResult(response.data.listOfReportEquipment)
          this.hubCodeList = response.data.listOfHubCode.sort(this.compareLabel)
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
    doMainFillTableResult (data) {
      this.dataList = data
      // this.pagination.rowsNumber = pagedEquipment.totalElements
      // this.pagination.rowsPerPage = pagedEquipment.pageable.pageSize
      // this.pagination.page = pagedEquipment.number + 1
    },
    getSelectValue () {
      this.searchVal.hubCode = this.searchVal.hubCode.value
    },
    downloadExcel () {
      this.$axios.get(`${process.env.urlPrefix}reportEquipmentExcelDownload`, {
        responseType: 'arraybuffer'
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'Equipment Report.xlsx'
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
    compareLabel (a, b) {
      const labelA = a.label.toUpperCase()
      const labelB = b.label.toUpperCase()
      let comparison = 0
      if (labelA > labelB) {
        comparison = 1
      } else if (labelA < labelB) {
        comparison = -1
      }
      return comparison
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
