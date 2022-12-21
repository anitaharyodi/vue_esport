<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Member</h1> 
            </div>
            <v-spacer></v-spacer>
            <div style="display: flex; justify-content: end;">
              <v-btn color="purple darken-4" dark @click="dialog = true"> Tambah </v-btn>
            </div>
              
            <hr>
            
            <v-row>
                <v-data-table :headers="headers" :items="members" :search="search" :key="id">
                    <!-- <template v-slot:[`item.division`]="{ item }">
                        <span v-if="item.nama == 0">Mobile Legend</span>
                        <span v-else-if="item.nama == 1">Pubg Mobile</span>
                        <span v-else-if="item.nama == 2">Dota 2</span>
                        <span v-else-if="item.nama == 3">Valorant</span>
                    </template> -->
                    <!-- <template v-slot:[`item.photo`]="{ item }">
                        <v-img
                            :src="item.photo"
                            max-width="100"
                            max-height="100"
                            contain
                        ></v-img>
                    </template> -->
                    <!-- actions -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <!-- <span v-if="role == user"> -->
                        <v-icon color="green" class="mr-2" @click="editData(item)">bx bx-edit</v-icon>
                      <!-- </span> -->
                      <!-- <span v-else> -->
                        <!-- <v-icon  color="green" class="mr-2" @click="showData()">bx bx-edit</v-icon> -->
                        <!-- <v-icon  color="red" class="mr-2"  @click="selectedId = item.id; dialogConfirm = true">mdi-delete</v-icon>
                        <v-icon  color="green" class="mr-2" @click="editData()">mdi-information-outline</v-icon> -->
                      <!-- </span> -->
                      <v-icon color="red" class="mr-2" @click="deleteData(item.id_member)">bx bxs-trash</v-icon>
                    </template>
                </v-data-table>
            </v-row>
            <v-dialog transition="dialog-top-transition" max-width="700" v-model="dialog" style="border-radius: 10px;" persistent>
                <v-card style="border-radius: 10px;">
                    <v-card-title class="pa-0">
                        <v-toolbar color="purple darken-4" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                          <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">{{ formTitle }} Member</span>   
                        </v-toolbar>
                    </v-card-title> 
                    <v-card-text class="pb-0">
                        <v-container> 
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user" v-model="newMember.nama_member" label="Name" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user-pin" v-model="newMember.nickname_member" label="Nickname" type="text" required></v-text-field>
                                <!-- <v-select v-model="newMember.nama_divisi" :items="[ 
                                    { text: 'Mobile Legend', value: 0 }, 
                                    { text: 'Pubg Mobile', value: 1 }, 
                                    { text: 'Dota 2', value: 2 }, 
                                    { text: 'Valorant', value: 3 }, 
                                  ]" label="Divisi" prepend-icon="bx bx-selection">
                                </v-select> -->
                        </v-container> 
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="justify-end">
                        <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:gray;" @click="closeDialog()">Cancel</v-btn>
                        <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:purple;" @click="setForm">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5"><strong>Are you sure to delete?</strong></v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="deleteData(item.id_member)">Yes</v-btn>
                        <v-btn color="red darken-1" text @click="closeDelete">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
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
      // const members
      const members = ref([])

      // const dialogDelete = ref(false)
      const dialog = ref(false)

      const newMember = reactive({
        nama_member: '',
        nickname_member: '',
        nama_divisi: ''
      })

      function getData() {
        axios.get(route + 'members', {
          headers: {
            'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
          }
        })
        .then(response => {
          members.value = response.data.data;
        }).catch(error => {
          console.log(error);            
        })
      }

      onMounted(() => {
        getData();
      })

      function save() {
        // create member
        axios.post(route + 'members', {
          nama_member: newMember.nama_member,
          nickname_member: newMember.nickname_member,
          // nama_divisi: newMember.nama_divisi
        }, {
          headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
            }
        })
        .then(() => {
          toastr.success('Berhasil tambah member!');
          dialog.value = false
          getData();
          this.resetForm();
          }).catch(error => {
            console.log(error);            
          })
        // (link, body, headers)
      }

      function update() {
        axios.put(route + 'members/' + this.editId, {
          nama_member: newMember.nama_member,
          nickname_member: newMember.nickname_member,
          // nama_divisi: newMember.nama_divisi
        }, {
          headers: {
              'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
            }
        })
        .then(() => {
          toastr.success('Berhasil edit member!');
          dialog.value = false
          this.editedIndex = 'Tambah';
          this.resetForm();
          getData();
          }).catch(error => {
            console.log(error);            
          })
      }

      function deleteData(id) {
        axios.delete(route + 'members/' + id, {
          headers: {
            'Authorization': 'Bearer ' + deleteCookies.getCookies("token")
          }
        }).then(() => {
          toastr.success('Berhasil delete member!');
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
        newMember,
        dialog,
        editedIndex: 'Tambah',
        headers: [
          {text: "Nama", value: "nama_member"},
          {text: "Nickname", value: "nickname_member"},
          {text: "Divisi", value: "nama_divisi"},
          {text: "", value: "actions"},
        ],
        formTodo: {
          nama_member: null,
          nickname_member: null,
          nama_divisi: null,
        },
        members,
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
      this.newMember.nama_member = null;
      this.newMember.nickname_member = null;
    },
      //make method for show data
      editData(item) {
        this.editedIndex = 'Edit';
        this.dialog = true;
        this.editId = item.id_member;
        this.newMember.nama_member = item.nama_member;
        this.newMember.nickname_member = item.nickname_member;
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
