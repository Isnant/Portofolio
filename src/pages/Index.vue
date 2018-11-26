<template>
<div id="main" class="layout-padding" style="text-align:center;">
  <q-card inline style="width: 50%; margin: 0 15px 15px 15px">
    <h6 class="text-secondary" style="text-align: center; margin: 15px 0 15px 0">
     <q-icon name="far fa-file-excel"/>  UPLOAD FILE
    </h6>
    <q-card-separator/>
    <q-card-main>
      <div class="row">
      <div class="auto" style="width: 65%; margin: 0 15px 0 0">
       <q-input
          id="inputexcel"
          type="file"
          v-model="input"
          accept=".xlsx"
          @input="onFileChanged()"
        />
        </div>
        <div class="35%">
       <q-btn color="secondary" icon="backup" label="Upload" :hidden="buttonUpload" @click="CheckingFile()" style="text-align: left; margin: 0 0 10px 0"/>
       </div>
       <div id="byte_content" hidden="true"></div>
      </div>
    </q-card-main>
    </q-card>
    <q-modal v-model="ModalListMessage" minimized ref="modalRef" :content-css="{padding: '50px', minWidth: '50vw'}">
    <div class="text-negative" style="margin: 0 0 10px 0 ">
    <q-icon name="warning"/> Warning Messages : </div>
     <q-table
      :data="DataMessages"
      :columns="ColumnMessage"
      row-key="name"
      dense>
      <q-tr slot="body" slot-scope="props">
          <q-td key="line" :props="props">{{ props.row.line}}
          </q-td>
          <q-td key="column" :props="props">{{ props.row.column }}
          </q-td>
          <q-td class="text-negative" key="message" :props="props">{{ props.row.message }}
          </q-td>
      </q-tr>
      </q-table>
      <div style="width: 100%; text-align: center;">
      <q-btn color="secondary" icon="backup" label="Upload" @click="uploadFile()" style="margin: 15px 10px 0 0"/>
       <q-btn color="negative" icon="close" label="cancel" v-close-overlay style="margin: 15px 0 0 0"/>
      </div>
    </q-modal>
    <q-modal v-model="ModalSucces" minimized ref="modalRef" :content-css="{padding: '50px', minWidth: '50vw'}">
      <h6><p style="text-align: center;" class="text-primary"><q-icon name="done_all"/> {{messageSucces}}</p></h6>
      <div style="width: 100%; text-align: center;">
      <q-btn color="secondary" icon="backup" label="upload" @click="uploadFile()" style="margin: 15px 10px 10px 0"/>
      <q-btn color="negative" icon="close" label="cancel" v-close-overlay style="margin: 15px 0 10px 0"/>
      </div>
    </q-modal>
     <q-modal v-model="ModalFailed" minimized ref="modalRef" :content-css="{padding: '50px', minWidth: '50vw'}">
      <h6><p style="text-align: center;" class="text-negative"><q-icon name="warning"/> {{messageFailed}}</p></h6>
      <div style="width: 100%; text-align: center;">
      <q-btn color="negative" icon="close" label="cancel" v-close-overlay style="margin: 15px 0 10px 0"/>
      </div>
    </q-modal>
  </div>
</template>

<script>
export default {
  data (file) {
    return {
      URL: '',
      ID: '',
      input: '',
      DataMessages: [],
      selectedFile: null,
      buttonUpload: true,
      ModalListMessage: false,
      ModalSucces: false,
      ModalFailed: false,
      status: '',
      messageSucces: '',
      messageFailed: '',
      ColumnMessage: [
        {
          name: 'line',
          field: 'line',
          align: 'left'
        },
        {
          name: 'column',
          field: 'column',
          align: 'left'
        },
        {
          name: 'message',
          field: 'message',
          align: 'left'
        }
      ]
    }
  },

  beforeMount () {
    this.getContent()
  },

  methods: {
    initPage () {
      this.getContent()

      setInterval(() => {
        this.getContent()
      }, 180000)
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
      console.log(this.URL)
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}checkingfile`, {
        'url': this.URL
      })
        .then((response) => {
          this.$q.loading.hide()
          this.ID = response.data
          if (response.data[0].status === 'succes') {
            this.messageSucces = response.data[0].message
            this.ModalSucces = true
          } else if (response.data[0].status === 'failed') {
            this.messageFailed = response.data[0].message
            this.ModalFailed = true
          } else {
            this.DataMessages = response.data
            this.ModalListMessage = true
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
      console.log(this.URL)
      this.$q.loading.show()
      this.$axios.post(`${process.env.urlPrefix}uploadfile`, {
        'url': this.URL
      })
        .then((response) => {
          this.$q.loading.hide()
          this.ModalSucces = false
          this.ModalListMessage = false
          this.input = ''
          this.buttonUpload = true
          this.ID = response.data
          if (response.data.status === 'succes') {
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
    }
  }
}
</script>
