import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      data: '',
      areaList: [],
      regionList: [],
      filteredRegionList: [],
      listOfRegion: [],
      listOfAreaForRegion: [],
      hubCodeList: [],
      searchVal: {
        hubCode: 'All',
        nodeCode: ''
      },
      tableColumns: [
        {
          name: 'equipmentName',
          label: 'Node Name',
          field: 'equipmentName',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'description',
          label: 'description',
          field: 'description',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'itCode',
          label: 'Node IT Code',
          field: 'itCode',
          align: 'left',
          style: 'width: 200px',
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
      formData: {
        id: '',
        equipmentCategory: 'Field',
        equipmentName: '',
        description: '',
        productType: '',
        productSubType: '',
        productSeries: '',
        manufacturer: '',
        brand: '',
        serialNumberDevice: '',
        serialNumberInternal: '',
        quantity: '',
        rack: '',
        chassis: '',
        slot: '',
        hubCode: '',
        hubAddress: '',
        bdfCode: '',
        nodeCode: '',
        psCode: '',
        amplifierCode: '',
        fatCode: '',
        service: '',
        technology: '',
        ipAddress: '',
        macAddress: '',
        capacity: '',
        capacityUnits: '',
        usedCapacity: '',
        capacity1: '',
        capacity2: '',
        capacity3: '',
        noOfPortFront: '',
        noOfPortRear: '',
        productionYear: '',
        assetLifetime: '',
        purchasedDate: '',
        installationDate: '',
        installedBy: '',
        pic: '',
        division: '',
        department: '',
        propertyOf: '',
        equipmentStatus: '',
        predecessor: '',
        itCode: '',
        buildingName: '',
        tower: '',
        floor: '',
        complexName: '',
        streetName: '',
        streetNumber: '',
        kelurahan: '',
        postalCode: '',
        direction: '',
        normalDistance: '',
        updateDistanceDate: '',
        remarks: '',
        cascades: '',
        amplifierNotes: '',
        homepassed: '',
        internetAccount: '',
        customerType: '',
        memoActiveDate: '',
        electricalStatus: '',
        lastModifiedByExcel: '',
        isComplete: ''
      }
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getNodeInitPage`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          hubCode: this.searchVal.hubCode,
          nodeCode: this.searchVal.nodeCode
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
    getNodeCodeList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getNodeList`, {
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
        nodeCode: this.searchVal.nodeCode
      }
      this.getNodeCodeList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        hubCode: this.searchVal.hubCode,
        nodeCode: this.searchVal.nodeCode
      }
      this.getNodeCodeList(params)
    },
    doOpenForm (cell) {
      this.formData = JSON.parse(JSON.stringify(cell.row))
      this.showForm = true
    },
    getValueSelect () {
      this.searchVal.hubCode = this.searchVal.hubCode.value
    },
    doToggleStatus (cell) {
      cell.row.recordStatus = cell.row.recordStatus === 'I' ? 'A' : 'I'
      this.formData = cell.row
      this.doSave()
    },
    getRegion () {
      this.formData.area = this.formData.area.value
      var region = this.listOfAreaForRegion.filter(v => v.areaName.toUpperCase().indexOf(this.formData.area.toUpperCase()) > -1)[0].region
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
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}nodeCodeExcelDownload`, {
        responseType: 'arraybuffer',
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          hubCode: this.searchVal.hubCode,
          nodeCode: this.searchVal.nodeCode
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'node_excel_download.xlsx'
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
        fax: '',
        mode: 'create'
      }
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
