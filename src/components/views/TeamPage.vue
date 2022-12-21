<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Team</h1> 
            </div>
            <v-spacer></v-spacer>
            <div style="display: flex; justify-content: end;">
              <v-btn color="purple darken-4" dark @click="dialog = true"> Tambah </v-btn>
            </div>
            <hr>
            <v-row>
                <v-data-table :headers="headers" :items="tims" :search="search" :key="id">
                    <!-- actions -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <!-- <span v-if="role == user"> -->
                        <v-icon color="green" class="mr-2" @click="editData(item)">bx bx-edit</v-icon>
                      <v-icon color="red" class="mr-2" @click="deleteData(item.id)">bx bxs-trash</v-icon>
                    </template>
                </v-data-table>
            </v-row>
            <v-dialog transition="dialog-top-transition" max-width="700" v-model="dialog" style="border-radius: 10px;" persistent>
              <v-card style="border-radius: 10px;">
                <v-card-title class="pa-0">
                  <v-toolbar color="purple darken-4" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                    <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">{{ formTitle }} Team</span>   
                  </v-toolbar>
                </v-card-title> 
                <v-card-text class="pb-0">
                  <v-container> 
                    <v-text-field class="textfield mt-3" prepend-icon="bx bx-group" v-model="newTim.nama_tim" label="Nama Tim" type="text" required></v-text-field>
                    <v-text-field class="textfield mt-3" prepend-icon="bx bx-notepad" v-model="newTim.deskripsi_tim" label="Deskripsi" type="text" required></v-text-field>
                  </v-container> 
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                  <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:gray;" @click="closeDialog()">Cancel</v-btn>
                  <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:purple;" @click="setForm">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </section>
  </div>
</template>

<script>
import VueSidebarMenu from "../MenuSidebar";
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import * as deleteCookies from "@/deleteCookies";
import { useToastr } from '@/../toastr';
// import { useRoute } from 'vue2-helpers/vue-router'

const toastr = useToastr();
  
  const route = "https://store.ksaduajy.com/laravel_esport/api/";
  
  export default {
    components: {VueSidebarMenu},

    setup() {
        const dialog = ref(false)
        const tims = ref([])

        const newTim = reactive({
            nama_tim: '',
            deskripsi_tim: '',
            // lambang: '',
        })

        function getData() {
            axios.get(route + 'tims', {
              headers: {
                  'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
              }
            })
            .then(response => {
                tims.value = response.data.data;
            }).catch(error => {
                console.log(error);            
            })
        }

        function save() {
          // create member
          axios.post(route + 'tims', {
            nama_tim: newTim.nama_tim,
            deskripsi_tim: newTim.deskripsi_tim,
            // lambang: newTim.lambang,
          }, 
          {
            headers: {
                'Authorization': 'Bearer ' + deleteCookies.getCookies("token"),
              }
          })
          .then(() => {
              dialog.value = false
              getData();
              this.resetForm();
          }).catch(error => {
            console.log(error);            
          })
            toastr.success('Berhasil Tambah Tim!');
          // (link, body, headers)
        }

        function update() {
          axios.put(route + 'tims/' + this.editId, {
            nama_tim: newTim.nama_tim,
            deskripsi_tim: newTim.deskripsi_tim,
            // lambang: newTim.lambang,
          }, 
          {
            headers: {
                'Authorization': 'Bearer ' + deleteCookies.getCookies("token"),
              }
          })
          .then(() => {
            toastr.success('Berhasil Edit Tim!');
            dialog.value = false
            this.editedIndex = 'Tambah';
            this.resetForm();
            getData();
          }).catch(error => {
              console.log(error);            
          })
        }

        function deleteData(id) {
          axios.delete(route + 'tims/' + id, {
            headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
            }
          }).then(() => {
            toastr.success('Berhasil Delete Tim!');
            // dialogDelete.value = false
            getData();
            this.editedIndex = "Tambah";
            this.resetForm();
            }).catch(error => {
              console.log(error.response.data);            
            })
        }

        onMounted(() => {
            getData();
        })

        return {
            newTim,
            tims,
            dialog,
            editedIndex: 'Tambah',
            headers: [
                {text: "Nama", value: "nama_tim"},
                {text: "Deskripsi", value: "deskripsi_tim"},
                // {text: "Lambang", value: "lambang"},
                {text: "", value: "actions"},
            ],
            save,
            deleteData,
            update,
            editId: ''
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex
        },
    },
    methods: {
      setForm(){
        if(this.editedIndex !== 'Tambah'){
          this.update();
        }
        else{
          this.save();
        }
      },
      resetForm() {
        this.newTim.nama_tim = null;
        this.newTim.deskripsi_tim = null;
        // this.newTim.lambang = null;
      },
      editData(item) {
        this.editedIndex = 'Edit';
        this.dialog = true;
        this.editId = item.id;

        this.newTim.nama_tim = item.nama_tim;
        this.newTim.deskripsi_tim = item.deskripsi_tim;
        // this.newTim.lambang = item.lambang;
        // this.no_hp = item.no_hp;
        // this.email = item.email;
        // this.divisi = item.divisi;
      },
      closeDialog() {
        this.dialog = false;
        this.resetForm();
        this.editedIndex = 'Tambah';
      },
      deleteItem (item) {
          this.formTodo = Object.assign({}, item)
          this.dialogDelete = true
      },
      deleteItemConfirm () {
          this.todos.splice(this.editedIndex, 1)
          this.closeDelete()
      },
      closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
              this.formTodo = Object.assign({}, this.resetForm)
              this.editedIndex = -1
          })
      },
    },
  }
</script>