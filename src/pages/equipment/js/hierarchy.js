import showLoading from './loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      areaList: [],
      sourcePreview: [],
      statusList: ['All', 'Active', 'Inactive'],
      filteredRegionList: [],
      listOfRegion: [],
      listOfAreaForRegion: [],
      tableColumns: [
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'equipmentId',
          label: 'Equipment Id',
          field: 'equipmentId',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'equipmentName',
          label: 'Equipment Name',
          field: 'equipmentName',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        },
        {
          name: 'parentId',
          label: 'Parent Id',
          field: 'parentId',
          align: 'left',
          sortable: true
        },
        {
          name: 'parentName',
          label: 'Parent Name',
          field: 'parentName',
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
          align: 'center'
        }
      ],
      pagination: {
        sortBy: 'id',
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
        equipmentId: '',
        equipmentName: '',
        equipmentParent: '',
        status: 'Active'
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
      if (authorities.findIndex(x => x === 'ROLE_07') === -1) {
        this.$router.push('/')
      }
      this.$axios.get(`${process.env.urlPrefix}getHierarchyList`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending,
          equipmentName: this.searchVal.equipmentName,
          equipmentParent: this.searchVal.equipmentParent,
          status: this.searchVal.status,
          equipmentId: this.searchVal.equipmentId
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.doMainFillTableResult(response.data)
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
    getHierarchyList (params) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHierarchyList`, {
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
        equipmentName: this.searchVal.equipmentName,
        equipmentParent: this.searchVal.equipmentParent,
        status: this.searchVal.status,
        equipmentId: this.searchVal.equipmentId
      }
      this.getHierarchyList(params)
    },
    doSearchByFilter () {
      const params = {
        pageIndex: this.pagination.page - 1,
        pageSize: this.pagination.rowsPerPage,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        equipmentName: this.searchVal.equipmentName,
        equipmentParent: this.searchVal.equipmentParent,
        status: this.searchVal.status,
        equipmentId: this.searchVal.equipmentId
      }
      this.getHierarchyList(params)
    },
    doClearSearchVal (type) {
      if (type === 'start') {
        if (this.searchVal.reqStartDate === null) {
          this.searchVal.reqStartDate = ''
        }
      } else {
        if (this.searchVal.reqEndDate === null) {
          this.searchVal.reqEndDate = ''
        }
      }
      this.doSearchByFilter()
    },
    doOpenForm (row) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}getHierarchyByParent`, {
        params: {
          equipmentName: row.equipmentName
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.setTreeHierarchy(response.data, row)
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
    setTreeHierarchy (dataList, row) {
      let sourceTree = {
        label: row.equipmentName + '-' + row.equipmentId + ' - [' + row.productType + ']',
        header: 'root',
        children: []
      }
      const child = this.getMigrationPreviewChild(dataList, row.equipmentName)
      sourceTree.children = child
      this.showForm = true
      this.$set(this.sourcePreview, 0, sourceTree)
      // this.$refs.sourcePreview.expandAll()
    },
    getMigrationPreviewChild (dataList, parent) {
      let rawChildren = dataList.filter(f => f.parentName === parent)
      let result = []
      for (let i = 0; i < rawChildren.length; i++) {
        let child = {
          label: rawChildren[i].equipmentName + ' - ' + rawChildren[i].equipmentId + ' - [' + rawChildren[i].productType + ']',
          children: []
        }
        child.children = this.getMigrationPreviewChild(dataList, rawChildren[i].equipmentName)
        result.push(child)
      }
      return result
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
