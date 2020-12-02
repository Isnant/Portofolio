export default {
  beforeMount () {
    this.getInitPage()
  },
  data () {
    return {
      dataList: [],
      columns: [
        {
          name: 'name',
          label: 'Role Name',
          field: 'name',
          align: 'center',
          sortable: true
        },
        {
          name: 'lastModified',
          label: 'Modified Date',
          field: 'lastModified',
          align: 'center',
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
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 20
      },
      isFormVisible: false,
      instance: {
        name: [],
        rights: [],
        createBy: undefined
      },
      rights: []
    }
  },
  methods: {
    getInitPage () {
      const userToken = localStorage.getItem('user-token')
      // const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if ((userToken === undefined) || (userToken === null)) {
        this.$q.loading.hide()
        this.$router.push('/login')
      }
      // if (authorities.findIndex(x => x === 'ROLE_10') === -1) {
      //   this.$router.push('/')
      // }

      this.$q.loading.show()

      this.$axios.get(`${process.env.urlPrefix}getRoleListInitData`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.dataList = response.data.listOfRoles.content
          this.pagination.rowsNumber = response.data.listOfRoles.totalElements
          this.pagination.page = response.data.listOfRoles.number + 1

          this.rights = response.data.listOfRights
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
    getContent () {
      this.$q.loading.show()

      this.$axios.get(`${process.env.urlPrefix}getRoleList`, {
        params: {
          pageIndex: this.pagination.page - 1,
          pageSize: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          descending: this.pagination.descending
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.dataList = response.data.content
          this.pagination.rowsNumber = response.data.totalElements
          this.pagination.page = response.data.number + 1
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
        this.$axios.get(`${process.env.urlPrefix}getRoleForm`, {
          params: {
            id: id
          }
        })
          .then((response) => {
            this.$q.loading.hide()
            this.instance = response.data
            this.instance.rights = this.instance.rights.substr(1, this.instance.rights.length - 2).split(';')

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
    doBeforeFormClose () {
      if (this.instance !== undefined) {
        delete this.instance.id
        this.instance.name = ''
        this.instance.rights = []
        this.instance.createdDate = undefined
        this.instance.createdBy = undefined
        this.lastModified = undefined
        this.modifiedBy = undefined
        this.recordStatus = undefined
      }
    },
    doSave () {
      this.$q.loading.show()

      if (this.instance.rights.length === 0) {
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: 'Rights is required. Please assign at least one rights.'
        })

        this.$q.loading.hide()
        return
      }

      this.instance.rights = ';' + this.instance.rights.join(';') + ';'

      this.$axios.post(`${process.env.urlPrefix}doSaveRole`, this.instance)
        .then((response) => {
          this.$q.loading.hide()

          this.$q.notify({
            color: 'positive',
            icon: 'report_problem',
            message: 'Role ' + this.instance.name + ' saved'
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
    }
  }
}
