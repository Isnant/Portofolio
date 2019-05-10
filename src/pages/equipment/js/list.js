export default {
  data() {
    return {
      modalUpload: false,
      searchVal: {
        assetCategory: 'All',
        productType: 'All',
        subType: 'All',
        productSeries: '',
        hubCode: 'All',
        bdfCode: 'All',
      },
      filter: '',
      selection: 'multiple',
      dataList: [],
      selected: [],
      resultList: [],
      assetCategoryList: [],
      productTypeList: [],
      subTypeList: [],
      hubCodeList: [],
      bdfCodeList: [],
      pagination: {
        rowsPerPage: 50,
      },
      columns: [
        {
          name: 'id',
          label: 'Equipment Id',
          field: 'id',
          align: 'left',
          sortable: true,
        },
        {
          name: 'equipmentCategory',
          label: 'Equipment Category',
          field: 'equipmentCategory',
          align: 'left',
          sortable: true,
        },
        {
          name: 'equipmentName',
          label: 'Equipment Name',
          field: 'equipmentName',
          align: 'left',
          sortable: true,
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true,
        },
        {
          name: 'productTypeSubType',
          label: 'Sub Type',
          field: 'productTypeSubType',
          align: 'left',
          sortable: true,
        },
        {
          name: 'productSeries',
          label: 'Product Series',
          field: 'productSeries',
          align: 'left',
          sortable: true,
        },
        {
          name: 'brand',
          label: 'Brand',
          field: 'brand',
          align: 'left',
          sortable: true,
        },
        {
          name: 'hubCode',
          label: 'Hub Code',
          field: 'hubCode',
          align: 'left',
          sortable: true,
        },
        {
          name: 'bdfCode',
          label: 'BDF Code',
          field: 'bdfCode',
          align: 'left',
          sortable: true,
        },
        {
          name: 'equipmentStatus',
          label: 'Equipment Status',
          field: 'equipmentStatus',
          align: 'left',
          sortable: true,
        },
      ],
      uploadCategory: 'field',
    };
  },

  beforeMount() {
    this.initPage();
  },

  methods: {
    initPage() {
      this.$axios.post(`${process.env.urlPrefix}getInitPage/`, {
      })
        .then((response) => {
          this.dataList = response.data.listOfEquipment;
          this.assetCategoryList = response.data.listOfAssetCategory;
          this.productTypeList = response.data.listOfProductType;
          this.subTypeList = response.data.listOfProductSubType;
          this.hubCodeList = response.data.listOfHub;
          this.bdfCodeList = response.data.listOfBdf;

          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            message: error,
          });
        });
    },
    getContent() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}getListAssetByFilter/`, this.searchVal)
        .then((response) => {
          this.dataList = response.data.listOfEquipment;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            message: error,
          });
        });
    },
    uploadFile(file, updateProgress) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        this.$axios.post(`${process.env.urlPrefix}uploadField`, formData, {
          headers: { 'Content-Type': undefined },
        })
          .then((response) => {
            updateProgress(1);
            console.log(response);
            resolve(file);
          })
          .catch((error) => {
            this.$q.notify({ message: error });
            reject(error);
          });
      });
    },
  },
};
