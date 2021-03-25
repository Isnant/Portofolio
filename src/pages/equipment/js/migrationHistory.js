import showLoading from './loading.js'
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
      productTypeListSearch: '',
      migrationTypeList: ['ALL', 'Change Service', 'Change Code', 'Split Node', 'Reroute', 'Revision'],
      tableColumns: [
        {
          name: 'assetId',
          label: 'Equipment Id',
          field: 'assetId',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'newProductType',
          label: 'Product Type',
          field: 'newProductType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'originalCode',
          label: 'Source Code',
          field: 'originalCode',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'newCode',
          label: 'New Code',
          field: 'newCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'originalHub',
          label: 'Source Hub',
          field: 'originalHub',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'newHub',
          label: 'New Hub',
          field: 'newHub',
          align: 'left',
          sortable: true
        },
        {
          name: 'assetStatus',
          label: 'Equipment Status',
          field: 'assetStatus',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'historyDate',
          label: 'Migration Date',
          field: 'historyDate',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'createdDate',
          label: 'Created Date',
          field: 'createdDate',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'createdBy',
          label: 'Created By',
          field: 'createdBy',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'migrationType',
          label: 'Migration Type',
          field: 'migrationType',
          align: 'left',
          style: 'width: 200px',
          sortable: true
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
        reqStartDate: '',
        reqEndDate: '',
        createdBy: '',
        sourceCode: '',
        newCode: '',
        migrationType: 'ALL',
        productType: 'ALL'
      },
      showForm: false,
      formData: {
        pid: '',
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
      // this.$q.loading.show()
      this.showLoading()
      const userToken = localStorage.getItem('user-token')
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_06') === -1) {
        this.$router.push('/')
      }
      this.$axios.get(`${process.env.urlPrefix}getMigrationHistoryInitData`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          startDate: this.searchVal.reqStartDate,
          endDate: this.searchVal.reqEndDate,
          createdBy: this.searchVal.createdBy,
          sourceCode: this.searchVal.sourceCode,
          newCode: this.searchVal.newCode,
          migrationType: this.searchVal.migrationType,
          productType: this.searchVal.productType
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data.listOfMigrationHistory)
          this.productTypeListSearch = response.data.listOfProductTypeSearch.filter(a => a.cascadeValue === 'Field')
          this.productTypeListSearch.unshift({ label: 'ALL', value: 'ALL' })
          // this.searchVal.reqStartDate = this.getFirstDate()
          // this.searchVal.reqEndDate = this.getCurrentDate()
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
    getMigrationHistoryList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getMigrationHistoryList`, {
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
        startDate: this.searchVal.reqStartDate,
        endDate: this.searchVal.reqEndDate,
        createdBy: this.searchVal.createdBy,
        sourceCode: this.searchVal.sourceCode,
        newCode: this.searchVal.newCode,
        migrationType: this.searchVal.migrationType,
        productType: this.searchVal.productType
      }
      this.getMigrationHistoryList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        startDate: this.searchVal.reqStartDate,
        endDate: this.searchVal.reqEndDate,
        createdBy: this.searchVal.createdBy,
        sourceCode: this.searchVal.sourceCode,
        newCode: this.searchVal.newCode,
        migrationType: this.searchVal.migrationType,
        productType: this.searchVal.productType
      }
      this.getMigrationHistoryList(params)
    },
    doClearSearchVal (type) {
      if (type === 'start') {
        if (this.searchVal.reqStartDate === null) {
          this.searchVal.reqStartDate = ''
          this.doSearchByFilter()
        }
      } else if (type === 'createdBy') {
        if (this.searchVal.createdBy === null) {
          this.searchVal.createdBy = ''
          this.doSearchByFilter()
        }
      } else {
        if (this.searchVal.reqEndDate === null) {
          this.searchVal.reqEndDate = ''
          this.doSearchByFilter()
        }
      }
    },
    getDropdownValue (type) {
      // search bar
      if (type === 'productTypeSearch') {
        this.searchVal.productType = this.searchVal.productType.value
      }
    },
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}migrationHistoryExcelDownload`, {
        responseType: 'arraybuffer',
        params: {
          startDate: this.searchVal.reqStartDate,
          endDate: this.searchVal.reqEndDate,
          createdBy: this.searchVal.createdBy,
          sourceCode: this.searchVal.sourceCode,
          newCode: this.searchVal.newCode,
          migrationType: this.searchVal.migrationType,
          productType: this.searchVal.productType
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'migration_history.xlsx'
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
