<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Latihan</h1> 
            </div>
            <v-spacer></v-spacer>
            <div style="display: flex; justify-content: end;">
              <v-btn color="purple darken-4" dark @click="dialog = true"> Tambah </v-btn>
            </div>
              
            <hr>
            
            <v-row>
                <v-data-table :headers="headers" :items="jadwals" :search="search" :key="id">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon color="green" class="mr-2" @click="editData(item)">bx bx-edit</v-icon>
                      <v-icon color="red" class="mr-2" @click="deleteData(item.id)">bx bxs-trash</v-icon>
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
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user" v-model="newDivisi.judul" label="Judul" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user-pin" v-model="newDivisi.tgl_mulai" label="Tanggal mulai" type="date" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user-pin" v-model="newDivisi.tgl_selesai" label="Tanggal selesai" type="date" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user-pin" v-model="newDivisi.tempat" label="Tempat" type="text" required></v-text-field>
                                <v-file-input v-model="newDivisi.poster" accept="image/*" color="grey" counter label="Masukkan Poster" placeholder="Masukkan Poster" solo :show-size="1000">
                                    <template v-slot:selection="{ index, text }">
                                        <v-chip v-if="index < 2" color="grey lighten-3" label>
                                            {{ text }}
                                        </v-chip>
                                        <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2"> +{{ poster.length - 2 }} File(s)</span>
                                    </template>
                                </v-file-input>
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

      const newDivisi = reactive({
        judul: '',
        tgl_mulai: '',
        tgl_selesai: '',
        tempat: '',
        poster: '',
        biaya: 0,
        deskripsi: '',
        jenis_kegiatan: 'Latihan'
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
          judul: newDivisi.judul,
          tgl_mulai: newDivisi.tgl_mulai,
          tgl_selesai: newDivisi.tgl_selesai,
          tempat: newDivisi.tempat,
          poster: newDivisi.poster,
          biaya: newDivisi.biaya,
          deskripsi: newDivisi.deskripsi,
          jenis_kegiatan: newDivisi.jenis_kegiatan
        }, {
          headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token"),
              'Content-Type' : 'multipart/form-data'
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
          judul: newDivisi.judul,
          tgl_mulai: newDivisi.tgl_mulai,
          tgl_selesai: newDivisi.tgl_selesai,
          tempat: newDivisi.tempat,
          poster: newDivisi.poster,
          biaya: newDivisi.biaya,
          deskripsi: newDivisi.deskripsi,
          jenis_kegiatan: newDivisi.jenis_kegiatan
        }, {
          headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token"),
              'Content-Type' : 'multipart/form-data'
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
        newDivisi,
        dialog,
        editedIndex: 'Tambah',
        headers: [
          {text: "Judul", value: "judul"},
          {text: "Tanggal Mulai", value: "tgl_mulai"},
          {text: "Tanggal Selesai", value: "tgl_selesai"},
          {text: "Tempat", value: "tempat"},
          {text: "Poster", value: "poster"},
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
      this.newDivisi.judul = null;
      this.newDivisi.tgl_mulai = null;
      this.newDivisi.tgl_selesai = null;
      this.newDivisi.tempat = null;
      this.newDivisi.poster = null;
    },
      //make method for show data
      editData(item) {
        this.editedIndex = 'Edit';
        this.dialog = true;
        this.editId = item.id;
        this.newDivisi.judul = item.judul;
        this.newDivisi.tgl_mulai = item.tgl_mulai;
        this.newDivisi.tgl_selesai = item.tgl_selesai;
        this.newDivisi.tempat = item.tempat;
        this.newDivisi.poster = item.poster;
        this.newDivisi.biaya = item.biaya;
        this.newDivisi.deskripsi = item.deskripsi;
        this.newDivisi.jenis_kegiatan = item.jenis_kegiatan;
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