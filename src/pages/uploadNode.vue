<template>
  <div id="main" class="layout-padding" style="text-align:center;">
    <div id="byte_content" hidden="true"></div>
     <div style="text-align:center;">
        <q-card inline style="width: 60%;">
        <h6 class="text-primary" style="margin: 15px 0 15px 0">
            <q-icon name="far fa-file-excel"/>  SELECT FILE
        </h6>
        <q-card-separator/>
        <q-card-main>
            <div class="auto" style="width: 100%; margin: 0 15px 0 0">
            <q-input
                id="inputexcel"
                type="file"
                v-model="input"
                accept=".xlsx"
                @input="onFileChanged()"
                />
            </div>
        </q-card-main>
        </q-card>
        <div id="app">
          <table tyle="width:60%">
            <tr>
              <th>Name</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
            <tr v-for="(input, index) in inputs" :key="index">
              <td><input type="text" v-model="input.one"></td>
              <td><input type="text" v-model="input.two"></td>
              <td><button @click="deleteRow(index)">Delete</button></td>
            </tr>
          </table>
        <button @click="addRow">Add row</button>
    </div>
    </div>
    <q-btn color="primary" icon="fast_forward" label="Next" :hidden="buttonUpload"
          @click="CheckingFile()" style="text-align: left; margin: 20px  0 10px 0"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      add: '',
      buttonUpload: true,
      inputs: [],
    };
  },
  watch: {
    selected: () => {
      if (this.selected.length === 0) {
        this.buttonHide = true;
        this.buttonHides = true;
      } else if (this.selected.length === 1) {
        this.buttonHide = false;
        this.buttonHides = false;
      } else {
        this.buttonHide = true;
        this.buttonHides = false;
      }
    },
    ModalDetail: function UploadModalDetail(ModalDetail) {
      if (ModalDetail === false) {
        this.Reset();
      }
    },
    ModalDelete: function UploadModalDelete(ModalDelete) {
      if (ModalDelete === false) {
        this.Reset();
      }
    },
  },
  beforeMount() {
    this.getContent();
  },

  methods: {
    getContent() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}getListInactiveAsset/`, {
      })
        .then((response) => {
          this.dataList = response.data;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    addRow() {
      this.inputs.push({
        one: '',
        two: '',
      });
    },
    deleteRow(index) {
      this.inputs.splice(index, 1);
    },
    onFileChanged() {
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        document.getElementById('byte_content').textContent = evt.target.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
      this.buttonUpload = false;
    },
    Reset() {
      this.btnActive = true;
      this.btnDelete = true;
      this.ModalDelete = false;
      this.ModalDetail = false;
      this.modalUpload = false;
      this.ModalAdd = true;
      this.buttonHide = true;
      this.buttonAdd = true;
      this.selected = [];
    },
    ActionInfo(mode) {
      if (this.selected.length === 0) {
        if (mode === 'active') {
          this.$q.notify({
            icon: 'error',
            position: 'bottom-right',
            message: 'select data before activation',
            color: 'negative',
          });
        } else {
          this.$q.notify({
            icon: 'error',
            position: 'bottom-right',
            message: 'select data before delete',
            color: 'negative',
          });
        }
      } else {
        if (mode === 'active') {
          this.btnActive = false;
          this.question = 'do yo want to activate this data ?';
        } else {
          this.btnDelete = false;
          this.question = 'do yo want to permanent delete this data ?';
        }
        this.ModalDelete = true;
      }
    },
    Cancel() {
      this.Reset();
      this.getContent();
    },
    Delete() {
      this.$axios.post(`${process.env.urlPrefix}Delete`, this.selected)
        .then((response) => {
          this.$q.loading.hide();
          if (response.data.status === 'succes') {
            this.ModalDelete = false;
            this.selected = [];
            this.Reset();
            this.getContent();
            this.$q.notify({
              icon: 'done',
              position: 'bottom-right',
              message: response.data.message,
              color: 'positive',
            });
          } else {
            this.ModalDelete = false;
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative',
            });
          }
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
    Detail() {
      this.ModalDetail = true;
      this.add = this.selected(0);
    },
    Active() {
      this.$q.loading.show();
      this.$axios.post(`${process.env.urlPrefix}Active`, this.selected)
        .then((response) => {
          this.$q.loading.hide();
          if (response.data.status === 'succes') {
            this.ModalDelete = false;
            this.Reset();
            this.getContent();
            this.$q.notify({
              icon: 'done',
              position: 'bottom-right',
              message: response.data.message,
              color: 'positive',
            });
          } else {
            this.ModalDelete = false;
            this.$q.notify({
              icon: 'error',
              position: 'bottom-right',
              message: response.data.message,
              color: 'negative',
            });
          }
        })
        .catch((error) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.response.data.message,
          });
        });
    },
  },
};
</script>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
   padding: 15px;
}
</style>
