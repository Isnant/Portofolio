export default {
  data () {
    return {
      file: undefined,
      productTypeList: [],
      subTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      searchVal: {
        equipmentCategory: 'Hub',
        productType: 'All',
        subType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All'
      },
      equipmentListColumns: [
        {
          name: 'id',
          label: 'Equipment Id',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'equipmentName',
          label: 'Equipment Name',
          field: 'equipmentName',
          align: 'left',
          sortable: true
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          sortable: true
        },
        {
          name: 'productSubType',
          label: 'Product Sub Type',
          field: 'productSubType',
          align: 'left',
          sortable: true
        },
        {
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          sortable: true
        },
        {
          name: 'brand',
          label: 'Brand',
          field: 'brand',
          align: 'left',
          sortable: true
        },
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'bdfCode',
          label: 'BDF Code',
          field: 'bdfCode',
          align: 'left',
          sortable: true
        },
        {
          name: 'equipmentStatus',
          label: 'Equipment Status',
          field: 'equipmentStatus',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center'
        }
      ],
      equipmentPagination: {
        sortBy: 'equipmentName',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      listOfEquipment: [],
      modalUpload: false
    }
  },

  methods: {
    doMainFillTableResult (pagedEquipment) {
      this.listOfEquipment = pagedEquipment.content
      this.equipmentPagination.rowsNumber = pagedEquipment.totalElements
      this.equipmentPagination.page = pagedEquipment.number + 1
    },
    doMainInitPage () {
      this.$axios.post(`${process.env.urlPrefix}getIndoorInitPage/`, {
      })
        .then((response) => {
          this.doMainFillTableResult(response.data.listOfEquipment)

          this.assetCategoryList = response.data.listOfAssetCategory
          this.productTypeList = response.data.listOfProductType
          this.subTypeList = response.data.listOfProductSubType
          this.hubCodeList = response.data.listOfHub.map(hubCode => hubCode.value)
          this.bdfCodeList = response.data.listOfBdf

          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    },
    doMainRefresh (params) {
      this.$q.loading.show()

      this.$axios.get(`${process.env.urlPrefix}getIndoorPagedEquipment/`, {
        params: params
      })
        .then((response) => {
          this.doMainFillTableResult(response.data)
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
    doMainEquipmentRefreshList () {
      const params = {
        pageIndex: 0,
        pageSize: this.equipmentPagination.rowsPerPage,
        searchVal: this.searchVal,
        sortBy: this.equipmentPagination.sortBy,
        descending: this.equipmentPagination.descending
      }

      this.doMainRefresh(params)
    },
    doMainEquipmentChangePage (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const params = {
        pageIndex: page - 1,
        pageSize: rowsPerPage,
        searchVal: this.searchVal,
        sortBy: sortBy,
        descending: descending
      }

      this.doMainRefresh(params)
    },
    doUploadFile () {
      this.$q.loading.show()

      let fr = new FileReader()
      fr.onload = (e) => {
        this.$axios.post(`${process.env.urlPrefix}uploadIndoor`, { file64: e.target.result })
          .then((response) => {
            this.$q.loading.hide()

            this.$q.notify({
              color: 'positive',
              icon: 'info',
              message: 'File successfully uploaded'
            })

            this.doMainInitPage()
          })
          .catch((error) => {
            this.$q.loading.hide()

            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: error
            })
          })
      }
      fr.readAsDataURL(this.$refs.excelFile.files[0])
    }
  },
  beforeMount () {
    this.doMainInitPage()
  }
}
