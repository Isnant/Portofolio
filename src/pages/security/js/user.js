export default {
  beforeMount () {
    this.getInitPage()
  },
  data () {
    return {
      dataList: [],
      columns: [
        {
          name: 'username',
          label: 'User Name',
          field: 'username',
          align: 'left',
          sortable: true
        },
        {
          name: 'fullName',
          label: 'Full Name',
          field: 'fullName',
          align: 'left',
          sortable: true
        },
        {
          name: 'department',
          label: 'Department',
          field: 'department',
          align: 'left',
          sortable: true
        },
        {
          name: 'createdDate',
          label: 'Created Date',
          field: 'createdDate',
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
          field: 'action',
          align: 'center',
          sortable: true
        }
      ],
      pagination: {
        sortBy: 'fullName',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      formSearch: {
        username: '',
        branch: 'All',
        roles: 'All',
        roless: 'All'
      },
      isFormVisible: false,
      instance: {
        username: '',
        fidManager: '',
        fullName: '',
        email: '',
        department: '',
        branch: '',
        roles: []
      },
      roles: [],
      rolesList: [],
      branch: [],
      branchList: [],
      branchesRequestor: [],
      branchesInspector: [],
      branchesHPA: [],
      branchesTMSales: [],
      filteredBranchList: [],
      branchSelect: true
    }
  },
  methods: {
    getInitPage () {
      this.$q.loading.show()
      const userToken = localStorage.getItem('user-token')
      // const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if ((userToken === undefined) || (userToken === null)) {
        this.$q.loading.hide()
        this.$router.push('/login')
      }
      // if (authorities.findIndex(x => x === 'ROLE_10') === -1) {
      //   this.$router.push('/')
      // }

      this.$axios.get(`${process.env.urlPrefix}getUserListInitData`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.listOfUser.content
          this.pagination.rowsNumber = response.data.listOfUser.totalElements
          this.pagination.page = response.data.listOfUser.number + 1

          this.roles = response.data.listOfRole
          this.rolesList = this.roles
          this.rolesList.sort(this.compare)
          // this.rolesList.unshift({ label: 'All', value: 'All' })
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
    getContent (props) {
      this.$q.loading.show()
      var pageIndex = ''
      var pageSize = ''
      var sortBy = ''
      var descending = ''
      if (typeof props === 'undefined') {
        pageIndex = this.pagination.page - 1
        pageSize = this.pagination.rowsPerPage
        sortBy = this.pagination.sortBy
        descending = this.pagination.descending
      } else {
        pageIndex = props.pagination.page - 1
        pageSize = props.pagination.rowsPerPage
        sortBy = props.pagination.sortBy
        descending = props.pagination.descending
        this.pagination.sortBy = props.pagination.sortBy
        this.pagination.descending = props.pagination.descending
      }

      this.$axios.get(`${process.env.urlPrefix}getListOfUser`, {
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          sortBy: sortBy,
          descending: descending,
          username: this.formSearch.username,
          branch: this.formSearch.branch,
          roles: this.formSearch.roless
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          this.dataList = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
          this.pagination.rowsPerPage = response.data.pageable.pageSize
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
    showForm (id) {
      this.$q.loading.show()

      if (id !== undefined) {
        this.$axios.get(`${process.env.urlPrefix}getUserForm`, {
          params: {
            id: id
          }
        })
          .then((response) => {
            this.$q.loading.hide()

            this.instance = response.data
            this.instance.roles = this.instance.roles.substr(1, this.instance.roles.length - 2).split(';')
            if (this.instance.branch === '') {
              this.branch = []
            } else {
              this.branch = JSON.parse(this.instance.branch)
            }
            this.doRoles()

            this.isFormVisible = true
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
        this.$q.loading.hide()
        this.isFormVisible = true
      }
    },
    constructBranchList (list) {
      let arrBranch = []
      for (let i = 0; i < list.length; i++) {
        arrBranch.push(list[i].value)
      }
      this.filteredBranchList = arrBranch
    },
    doRoles () {
      if (this.instance.roles.findIndex(x => x === '92') !== -1) { // inspector
        this.constructBranchList(this.branchesInspector)
        this.branchSelect = false
      } else if (this.instance.roles.findIndex(x => x === '93') !== -1 || this.instance.roles.findIndex(x => x === '192') !== -1) {
        this.constructBranchList(this.branchList)
        this.branchSelect = false
      } else if (this.instance.roles.findIndex(x => x === '1') !== -1) { // Requestor
        this.constructBranchList(this.branchesRequestor)
        this.branchSelect = false
      } else if (this.instance.roles.findIndex(x => x === '2') !== -1) { // RH Sales
        this.constructBranchList(this.branchesRequestor)
        this.branchSelect = false
      } else if (this.instance.roles.findIndex(x => x === '3') !== -1) { // TM Sales
        this.constructBranchList(this.branchesTMSales)
        this.branchSelect = false
      } else if (this.instance.roles.findIndex(x => x === '4') !== -1) { // HPA
        this.constructBranchList(this.branchesHPA)
        this.branchSelect = false
      } else if (this.instance.roles.length === 0) {
        this.filteredBranchList = []
        this.branchSelect = true
        this.branch = []
      } else {
        this.constructBranchList(this.branchList)
        this.branchSelect = false
      }
    },
    doBranchAdminListFilter (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredBranchList = this.branchList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    doBranchValue () {
      this.formSearch.branch = this.formSearch.branch.value
    },
    doRolesValue () {
      this.formSearch.roless = this.formSearch.roles.value
      if (this.formSearch.roless !== 'All') {
        this.formSearch.roless = ';' + this.formSearch.roless + ';'
      }
    },

    doBeforeFormClose () {
      if (this.instance !== undefined) {
        delete this.instance.username

        this.instance.fullName = ''
        this.instance.fidManager = ''
        this.instance.email = ''
        this.instance.department = ''
        this.instance.branch = []
        this.instance.roles = []
        this.instance.createdDate = undefined
        this.instance.createdBy = undefined
        this.lastModified = undefined
        this.modifiedBy = undefined
        this.recordStatus = undefined
        this.branchSelect = true
        this.branch = []
      }
    },
    doSave () {
      this.$q.loading.show()

      if (this.instance.roles.length === 0) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: 'Rights is required. Please assign at least one rights.'
        })

        this.$q.loading.hide()
        return
      }

      // if (this.instance.branch === null) {
      //   this.instance.branch = ''
      // }
      // if (typeof this.instance.branch === 'object') {
      //   this.instance.branch = this.instance.branch.value
      // }
      this.instance.roles = ';' + this.instance.roles.join(';') + ';'
      this.instance.branch = JSON.stringify(this.branch)

      this.$axios.post(`${process.env.urlPrefix}doSaveUser`, this.instance)
        .then((response) => {
          this.$q.loading.hide()

          this.$q.notify({
            color: 'positive',
            icon: 'done',
            message: 'User ' + this.instance.username + ' saved'
          })

          this.doBeforeFormClose()
          this.isFormVisible = false
          this.getContent()
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
    compare (a, b) {
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
  }
}
