export default {
  data (file) {
    return {
      URL: '',
      input: '',
      pageIndex: 1,
      maxPage: 0,
      pageSize: '',
      searchVal: {
        assetCategory: 'All',
        productType: 'All',
        subType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All'
      },
      add: {
        assetCategory: null,
        assetId: null,
        assetName: null,
        description: null,
        productType: null,
        subType: null,
        productSeries: null,
        manufacturer: null,
        brand: null,
        serialNumberDevice: null,
        serialNumberInternal: null,
        quantity: null,
        rack: null,
        chassis: null,
        slot: null,
        hubCode: null,
        hubAddress: null,
        bdfCode: null,
        service: null,
        capacity: null,
        capacityUnits: null,
        installationDate: null,
        division: null,
        departement: null,
        propertyOf: null,
        assetStatus: null,
        remarks: null,
        prodecesor: null,
        buildingName: null,
        tower: null,
        floor: null,
        complexName: null,
        streetName: null,
        streetNumber: null,
        kelurahan: null,
        postalCode: null,
        direction: null,
        cascades: null,
        amplifierNotes: null,
        memoActiveDate: null,
        modifiedDate: null,
        electricalStatus: null
      },
      selection: 'multiple',
      dataList: [],
      selected: [],
      resultList: [],
      assetCategoryList: [],
      productTypeList: [],
      subTypeList: [],
      productSeriesList: [],
      hubCodeList: [],
      bdfCodeList: [],
      DataMessages: [],
      buttonHide: true,
      buttonAdd: false,
      buttonUpload: true,
      ModalUpload: false,
      ModalListMessage: false,
      ModalAdd: false,
      ModalDelete: false,
      ModalSucces: false,
      ModalFailed: false,
      FormAsset: '',
      currentStep: 'first',
      messageSucces: '',
      messageFailed: '',
      pagination: {
        rowsPerPage: 50
      },
      ColumnMessage: [
        {
          name: 'location',
          field: 'location',
          align: 'left'
        },
        {
          name: 'message',
          field: 'message',
          align: 'left'
        }
      ],
      deletecolumn: [
        {
          name: 'assetId',
          label: 'Asset Id',
          field: 'assetId',
          align: 'left'
        },
        {
          name: 'assetCategory',
          label: 'Asset Category',
          field: 'assetCategory',
          align: 'left'
        },
        {
          name: 'assetName',
          label: 'Asset Name',
          field: 'assetName',
          align: 'left'
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left'
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          sortable: true
        }
      ],
      column: [
        {
          name: 'assetId',
          label: 'Asset Id',
          field: 'assetId',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'assetCategory',
          label: 'Asset Category',
          field: 'assetCategory',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'assetName',
          label: 'Asset Name',
          field: 'assetName',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'subType',
          label: 'Product Sub Type',
          field: 'subType',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'brand',
          label: 'Brand',
          field: 'brand',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'bdfCode',
          label: 'BDF Code',
          field: 'bdfCode',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        },
        {
          name: 'assetStatus',
          label: 'Asset Status',
          field: 'assetStatus',
          align: 'left',
          style: {color: '#ffffff'},
          classes: 'bg-primary',
          sortable: true
        }
      ]
    }
  },
  watch: {
    selected: function (selected) {
      if (this.selected.length !== 0) {
        this.buttonHide = false
        this.buttonAdd = true
      } else if (this.selected.length === 0) {
        this.buttonHide = true
        this.buttonAdd = false
      }
    },
    ModalAdd: function (ModalAdd) {
      if (ModalAdd === false) {
        this.Reset()
      }
    },
    ModalDelete: function (ModalDelete) {
      if (ModalDelete === false) {
        this.Reset()
      }
    },
    ModalUpload: function (ModalUpload) {
      if (ModalUpload === false) {
        this.Reset()
      }
    }
  },

  beforeMount () {
    this.getContent()
  },

  methods: {
    getContent () {
      this.currentStep = 'satu'
      this.getlistAseetCateory()
      this.getProductType()
      this.getSubType('')
      this.getBdfCode()
      this.getHubCode()
      this.$axios.post(`${process.env.urlPrefix}getListAsset/`, {
      })
        .then((response) => {
          this.dataList = response.data
          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    getContentByFilter (filter) {
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}getListAssetByFilter/`, {
        'assetCategory': filter.assetCategory,
        'productType': filter.productType,
        'subType': filter.subType,
        'productSeries': filter.productSeries,
        'hubCode': filter.hubCode,
        'bdfCode': filter.bdfCode
      })
        .then((response) => {
          this.dataList = response.data
          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    Add () {
      this.FormAsset = 'Add Data Asset'
      this.ModalAdd = true
    },
    Edit () {
      if (this.selected.length === 0) {
        this.$q.notify({
          icon: 'error',
          position: 'bottom-right',
          message: 'select data before edit',
          color: 'negative'
        })
      } else if (this.selected.length === 1) {
        this.FormAsset = 'Edit Data Asset'
        this.add = this.selected[0]
        this.ModalAdd = true
      } else {
        this.FormAsset = 'Edit Data Asset'
        this.ModalAdd = true
      }
    },
    DeleteInfo () {
      if (this.selected.length === 0) {
        this.$q.notify({
          icon: 'error',
          position: 'bottom-right',
          message: 'select data before delete',
          color: 'negative'
        })
      } else {
        this.FormAsset = 'Remove Data Asset'
        this.ModalDelete = true
      }
    },
    Delete () {
      this.$axios.post(`${process.env.urlPrefix}Inactive`, this.selected)
        .then((response) => {
          this.$q.loading.hide()
          if (response.data.status === 'succes') {
            this.ModalDelete = false
            this.selected = []
            this.getContent()
            this.$q.notify({
              icon: 'done',
              position: 'bottom-right',
              message: response.data.message,
              color: 'positive'
            })
          } else {
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative'
            })
          }
        })
        .catch((error) => {
          this.$q.loading.hide()
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    Save (add) {
      this.$q.loading.show()
      if (this.selected.length === 0) {
        if (this.add.assetCategory === null || this.add.assetCategory === undefined) {
          this.$q.loading.hide()
          this.ModalAdd = false
          this.$q.notify({
            icon: 'error',
            position: 'bottom-right',
            message: 'Cannot Insert Null Data',
            color: 'negative'
          })
        } else {
          this.$axios.post(`${process.env.urlPrefix}Add`, this.add)
            .then((response) => {
              this.$q.loading.hide()
              if (response.data.status === 'succes') {
                this.ModalAdd = false
                this.Reset()
                this.getContent()
                this.$q.notify({
                  icon: 'done',
                  position: 'bottom-right',
                  message: response.data.message,
                  color: 'positive'
                })
              } else {
                this.$q.notify({
                  icon: 'error',
                  position: 'bottom-right',
                  message: response.data.message,
                  color: 'negative'
                })
              }
            })
            .catch((error) => {
              this.$q.loading.hide()
              this.$q.notify({
                message: error.response.data.message
              })
            })
        }
      } else {
        this.constructAsset(add)
        this.$axios.post(`${process.env.urlPrefix}Update`, this.resultList)
          .then((response) => {
            this.$q.loading.hide()
            if (response.data.status === 'succes') {
              this.ModalAdd = false
              this.Reset()
              this.getContent()
              this.$q.notify({
                icon: 'done',
                position: 'bottom-right',
                message: response.data.message,
                color: 'positive'
              })
            } else {
              this.Reset()
              this.getContent()
              this.$q.notify({
                icon: 'error',
                position: 'bottom-right',
                message: response.data.message,
                color: 'negative'
              })
            }
          })
          .catch((error) => {
            this.$q.loading.hide()
            this.$q.notify({
              message: error.response.data.message
            })
          })
      }
    },
    Reset () {
      this.selected = []
      this.add = new this.Add()
      this.currentStep = 'satu'
      this.buttonAdd = false
      this.buttonHide = true
      this.buttonUpload = true
      this.ModalUpload = false
      this.ModalAdd = false
      this.ModalDelete = false
      this.ModalListMessage = false
      this.ModalFailed = false
      this.searchVal.assetCategory = 'All'
      this.searchVal.productType = 'All'
      this.searchVal.subType = 'All'
      this.searchVal.productSeries = ''
      this.searchVal.hubCode = 'All'
      this.searchVal.bdfCode = 'All'
      this.input = ''
    },
    cancel () {
      this.Reset()
      this.getContent()
    },
    downloadExcel () {
      this.$q.loading.show()
      this.$axios.get(`${process.env.urlPrefix}DowloadExcel/`, {
        responseType: 'arraybuffer',
        params: {
          assetCategory: this.searchVal.assetCategory,
          productType: this.searchVal.productType,
          subType: this.searchVal.subType,
          productSeries: this.searchVal.productSeries,
          hubCode: this.searchVal.hubCode,
          bdfCode: this.searchVal.bdfCode
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'DCS-New.xlsx'
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    onFileChanged () {
      var file = document.querySelector('input[type=file]').files[0]
      var reader = new FileReader()
      reader.onload = function (evt) {
        document.getElementById('byte_content').textContent = evt.target.result
      }
      if (file) {
        reader.readAsDataURL(file)
      }
      this.buttonUpload = false
    },
    CheckingFile () {
      this.URL = document.getElementById('byte_content').textContent
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}checkingfile`, {
        'url': this.URL
      })
        .then((response) => {
          this.input = ''
          this.$q.loading.hide()
          if (response.data[0].status === 'succes') {
            this.currentStep = 'empat'
            this.messageSucces = response.data[0].message
          } else if (response.data[0].status === 'failed') {
            this.messageFailed = response.data[0].message
            this.currentStep = 'tiga'
          } else {
            this.DataMessages = response.data
            this.currentStep = 'dua'
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
          this.$q.loading.hide()
        })
    },
    uploadFile () {
      this.URL = document.getElementById('byte_content').textContent
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}uploadfile`, {
        'url': this.URL
      })
        .then((response) => {
          this.$q.loading.hide()
          this.ModalSucces = false
          this.ModalListMessage = false
          this.ModalUpload = false
          this.input = ''
          this.buttonUpload = true
          if (response.data.status === 'succes') {
            this.getContent()
            this.$q.notify({
              icon: 'done',
              position: 'bottom-right',
              message: response.data.message,
              color: 'positive'
            })
          } else {
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative'
            })
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
          this.$q.loading.hide()
        })
    },
    getlistAseetCateory () {
      this.$axios.post(`${process.env.urlPrefix}getlistAseetCateory/`, {
      })
        .then((response) => {
          this.constructListAssetCategory(response.data)
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    constructListAssetCategory (assetCategoryList) {
      this.assetCategoryList = assetCategoryList.map(asset => ({
        label: asset,
        value: asset
      }))
    },
    getProductType (assetCat) {
      this.$axios.post(`${process.env.urlPrefix}getProductType/`, {
        'assetCategory': assetCat
      })
        .then((response) => {
          this.constructListProductType(response.data)
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    constructListProductType (productTypeList) {
      this.productTypeList = productTypeList.map(productType => ({
        label: productType,
        value: productType
      }))
    },
    getSubType (productType) {
      this.$axios.post(`${process.env.urlPrefix}getSubType/`, {
        'productType': productType
      })
        .then((response) => {
          this.constructListSubType(response.data)
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    constructListSubType (subTypeList) {
      this.subTypeList = subTypeList.map(subType => ({
        label: subType,
        value: subType
      }))
    },
    getHubCode () {
      this.$axios.post(`${process.env.urlPrefix}getHubCode/`, {
      })
        .then((response) => {
          this.constructHubCode(response.data)
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    constructHubCode (hubCodeList) {
      this.hubCodeList = hubCodeList.map(hubCode => ({
        label: hubCode,
        value: hubCode
      }))
    },
    getBdfCode () {
      this.$axios.post(`${process.env.urlPrefix}getBdfCode/`, {
      })
        .then((response) => {
          this.constructBdfCode(response.data)
        })
        .catch((error) => {
          this.$q.notify({
            message: error.response.data.message
          })
        })
    },
    constructBdfCode (bdfCodeList) {
      this.bdfCodeList = bdfCodeList.map(bdfCode => ({
        label: bdfCode,
        value: bdfCode
      }))
    },
    activeButton () {
      if (this.selected.length !== 0) {
        this.buttonHide = false
        this.buttonAdd = true
        console.log(this.resultList)
      } else if (this.selected.length === 0) {
        this.buttonHide = true
        this.buttonAdd = false
      }
    },
    constructAsset (value) {
      this.resultList = this.selected.map(select => ({
        id: select.id,
        assetCategory: value.assetCategory,
        assetId: value.assetId,
        assetName: value.assetName,
        description: value.description,
        productType: value.productType,
        subType: value.subType,
        productSeries: value.productSeries,
        manufacturer: value.manufacturer,
        brand: value.brand,
        serialNumberDevice: value.serialNumberDevice,
        serialNumberInternal: value.serialNumberInternal,
        quantity: value.quantity,
        rack: value.rack,
        chassis: value.chassis,
        slot: value.slot,
        hubCode: value.hubCode,
        hubAddress: value.hubAddress,
        bdfCode: value.bdfCode,
        service: value.service,
        capacity: value.capacity,
        capacityUnits: value.capacityUnits,
        installationDate: value.installationDate,
        division: value.division,
        departement: value.departement,
        propertyOf: value.propertyOf,
        assetStatus: value.assetStatus,
        remarks: value.remarks,
        prodecesor: value.prodecesor,
        buildingName: value.buildingName,
        tower: value.tower,
        floor: value.floor,
        complexName: value.complexName,
        streetName: value.streetName,
        streetNumber: value.streetNumber,
        kelurahan: value.kelurahan,
        postalCode: value.postalCode,
        direction: value.direction,
        cascades: value.cascades,
        amplifierNotes: value.amplifierNotes,
        memoActiveDate: value.memoActiveDate,
        modifiedDate: value.modifiedDate,
        electricalStatus: value.electricalStatus
      }))
    }
  }
}
