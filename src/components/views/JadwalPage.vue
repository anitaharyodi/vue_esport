<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div style="display: flex; justify-content: end;">
              <v-btn color="purple darken-4" dark @click="dialog = true" style="margin-top: 40px;"> Tambah </v-btn>
            </div>
            <div class="text">
                <h1>Jadwal</h1> 
            </div>
              
            <hr>
            
            <v-row>
                <v-data-table :headers="headers" :items="jadwals" :search="search" :key="id_jadwal">

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon color="green" class="mr-2" @click="editData(item)">bx bx-edit</v-icon>
                      <v-icon color="red" class="mr-2" @click="deleteData(item.id_jadwal)">bx bxs-trash</v-icon>
                    </template>
                </v-data-table>
            </v-row>
            <v-dialog transition="dialog-top-transition" max-width="700" v-model="dialog" style="border-radius: 10px;" persistent>
                <v-card style="border-radius: 10px;">
                    <v-card-title class="pa-0">
                        <v-toolbar color="purple darken-4" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                          <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">{{ formTitle }} Jadwal</span>   
                        </v-toolbar>
                    </v-card-title> 
                    <v-card-text class="pb-0">
                        <v-container> 
                                <v-text-field class="textfield mt-3" prepend-icon="bx bxl-typescript" v-model="newJadwal.judul_jadwal" label="Judul" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-calendar" v-model="newJadwal.mulai" label="Tanggal mulai" type="date" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-calendar" v-model="newJadwal.selesai" label="Tanggal selesai" type="date" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bxs-map-pin" v-model="newJadwal.tempat_jadwal" label="Tempat" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-street-view" v-model="newJadwal.jenis" label="Jenis Kegiatan" type="text" required></v-text-field>
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
  import VueSidebarMenu from "@/components/MenuSidebar";
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
      // const jadwals
      const jadwals = ref([])

      // const dialogDelete = ref(false)
      const dialog = ref(false)

      const newJadwal = reactive({
        judul_jadwal: '',
        mulai: '',
        selesai: '',
        tempat_jadwal: '',
        biaya_jadwal: '',
        deskripsi_jadwal: '',
        jenis: ''
      })

      function getData() {
        axios.get(route + 'jadwals', {
          headers: {
            'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
          }
        })
        .then(response => {
          jadwals.value = response.data.data;
        }).catch(error => {
          console.log(error);            
        })
      }

      onMounted(() => {
        getData();
      })

      function save() {
        // create jadwals
        axios.post(route + 'jadwals', {
          judul_jadwal: newJadwal.judul_jadwal,
          mulai: newJadwal.mulai,
          selesai: newJadwal.selesai,
          tempat_jadwal: newJadwal.tempat_jadwal,
          biaya_jadwal: newJadwal.biaya_jadwal,
          deskripsi_jadwal: newJadwal.deskripsi_jadwal,
          jenis: newJadwal.jenis
        }, {
          headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token"),
            }
        })
        .then(() => {
          toastr.success('Berhasil tambah jadwal!');
          dialog.value = false
          getData();
          this.resetForm();
          }).catch(error => {
            console.log(error);            
          })
        // (link, body, headers)
      }

      function update() {
        axios.put(route + 'jadwals/' + this.editId, {
          judul_jadwal: newJadwal.judul_jadwal,
          mulai: newJadwal.mulai,
          selesai: newJadwal.selesai,
          tempat_jadwal: newJadwal.tempat_jadwal,
          biaya_jadwal: newJadwal.biaya_jadwal,
          deskripsi_jadwal: newJadwal.deskripsi_jadwal,
          jenis: newJadwal.jenis
        }, {
          headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token"),
            }
        })
        .then(() => {
          toastr.success('Berhasil edit jadwal!');
          dialog.value = false
          this.editedIndex = 'Tambah';
          this.resetForm();
          getData();
          }).catch(error => {
            console.log(error);            
          })
      }

      function deleteData(id) {
        axios.delete(route + 'jadwals/' + id, {
          headers: {
            'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
          }
        }).then(() => {
          toastr.success('Berhasil delete jadwal!');
          // dialogDelete.value = false
          getData();
          this.editedIndex = "Tambah";
          this.resetForm();
          }).catch(error => {
            console.log(error.response.data);            
          })
        
      }

      // onmounted
      return {
        newJadwal,
        dialog,
        editedIndex: 'Tambah',
        headers: [
          {text: "Judul", value: "judul_jadwal"},
          {text: "Tanggal Mulai", value: "mulai"},
          {text: "Tanggal Selesai", value: "selesai"},
          {text: "Tempat", value: "tempat_jadwal"},
          {text: "Jenis Kegiatan", value: "jenis"},
          {text: "", value: "actions"},
        ],
        jadwals,
        // dialogDelete,
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
      this.newJadwal.judul_jadwal = null;
      this.newJadwal.mulai = null;
      this.newJadwal.selesai = null;
      this.newJadwal.tempat_jadwal = null;
      this.newJadwal.biaya_jadwal = null;
      this.newJadwal.jenis = null;
    },
      //make method for show data
      editData(item) {
        this.editedIndex = 'Edit';
        this.dialog = true;
        this.editId = item.id_jadwal;
        this.newJadwal.judul_jadwal = item.judul_jadwal;
        this.newJadwal.mulai = item.mulai;
        this.newJadwal.selesai = item.selesai;
        this.newJadwal.tempat_jadwal = item.tempat_jadwal;
        this.newJadwal.biaya_jadwal = item.biaya_jadwal;
        this.newJadwal.deskripsi_jadwal = item.deskripsi_jadwal;
        this.newJadwal.jenis = item.jenis;
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