<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Edit Profile</h1>   
            </div>
            <hr>
            <v-row>
              <v-col>
                <v-text-field v-model="user.name" readonly label="Name" type="text" prepend-icon="bx bx-user"></v-text-field>
                <v-text-field v-model="user.nickname" readonly type="text" label="Nickname" prepend-icon="bx bx-user-pin"></v-text-field>
                <v-text-field v-model="user.nohp" readonly type="text" label="No HP" prepend-icon="bx bx-phone"></v-text-field>
                <v-text-field v-model="user.email" readonly type="numeric" label="Email" prepend-icon="bx bx-envelope"></v-text-field>
                <v-select v-model="user.divisi" :items="divisis" label="Divisi" readonly prepend-icon="bx bx-selection">
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="text-center">
                  <img :src="'https://store.ksaduajy.com/laravel_esport/laravel_esport/public/foto/' + user.pasphoto" 
                    style="
                      margin-top: 60px;
                      border-radius: 20px;
                      max-width: 256px;
                      max-height: 256px;
                      min-width: 256px;
                      min-height: 256px;
                      object-fit: cover;"
                  />
                </div>
              </v-col>
            </v-row> 
            <v-btn style="margin-top:10px" color="primary" class="mr-4" @click="editData()">Edit Profile</v-btn>
            <!-- dialog edit -->
            <v-dialog transition="dialog-top-transition" max-width="900" v-model="dialogEdit" style="border-radius: 10px;" persistent>
                <v-card style="border-radius: 10px;">
                    <v-card-title class="pa-0">
                        <v-toolbar color="#93A9D1" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                          <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">Edit Profile</span>   
                        </v-toolbar>
                    </v-card-title> 
                    <v-card-text class="pb-0">
                        <v-container> 
                            <v-form ref="form">
                              <v-text-field v-model="user.name" prepend-icon="bx bx-user" :rules="[rules.required]" label="Nama Lengkap" color="purple" solo required></v-text-field>
                              <v-text-field v-model="user.nickname" prepend-icon="bx bx-user-pin" :rules="[rules.required]" label="Nickname" color="purple" solo required></v-text-field>
                              <v-text-field v-model="user.nohp" prepend-icon="bx bx-phone" :rules="[rules.required, rules.nohp]" label="No Handphone" color="purple" type="tel" solo required></v-text-field>
                              <v-text-field v-model="user.email" prepend-icon="bx bx-envelope" label="Email" color="purple" :rules="[rules.required, rules.email]" solo required></v-text-field>
                              <v-text-field v-model="user.password" prepend-icon="bx bx-lock" type="password" label="Password" color="purple" :rules="[rules.required, rules.password]" solo required></v-text-field>
                              <v-autocomplete v-model="user.divisi" 
                                      :items="divisis" item-text="nama"
                                      item-value="kode_divisi"
                                      return-object
                                      label="Divisi" 
                                      color="purple"
                                      prepend-icon="bx bx-selection"
                                      :rules="[rules.required]" 
                                      solo required>
                              </v-autocomplete>
                              <v-file-input v-model="user.pasphoto" prepend-icon="bx bx-upload" :rules="[rules.required]" accept="image/*" color="grey" counter label="Masukkan Foto Profil" placeholder="Masukkan Foto Profil" solo :show-size="1000">
                                  <template v-slot:selection="{ index, text }">
                                      <v-chip v-if="index < 2" color="grey lighten-3" label>
                                          {{ text }}
                                      </v-chip>
                                      <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2"> +{{ pasphoto.length - 2 }} File(s)</span>
                                  </template>
                              </v-file-input>              
                            </v-form>
                        </v-container> 
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="justify-end">
                        <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:#001D38;" @click="closeDialog()"> Cancel </v-btn>
                        <v-btn color="#93A9D1" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 700; color:white;" @click="saveData()"> Save </v-btn> 
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </section>
  </div>
</template>

<script>
import VueSidebarMenu from "../MenuSidebar";
import axios from "axios";
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
// import { useToastr } from '../../toastr';

// const toastr = useToastr();
const route = "https://store.ksaduajy.com/laravel_esport/api/";

export default {
  components: {VueSidebarMenu},
  data() {
    return {
      dialogEdit: false,
      dialogConfirm: false,

      formHasErrors: false,
      
      rules: {
        required: value => !!value || 'Required!',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid Email!'
        },
        password: value => {
          const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          return pattern.test(value) || 'Minimum Eight Characters, At Least One Letter, One Number And One Special Character!'
        },
        nohp: value => {
          const pattern = /^08[0-9]{10,11}$/
          return pattern.test(value) || 'Invalid No Handphone (12-13 Digits)!'
        },
      },
    }
  },
  setup() {

    const user = reactive({
      name: '',
      nickname: '',
      nohp: '',
      email : '',
      password : '',
      divisi: '',
      pasphoto : '',
    });

    function dataUser(){
      let id = localStorage.getItem('id')
      let token =  localStorage.getItem('token')

      console.log("id :" + id)
      console.log("token :" + token)

      axios.get(route + `user/${id}` ,{
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      },).then((response) => {
          user.name = response.data.data.name
          user.nickname = response.data.data.nickname
          user.nohp = response.data.data.nohp
          user.email = response.data.data.email
          user.password = response.data.data.password
          user.divisi = response.data.data.divisi.kode_divisi
          user.pasphoto = response.data.data.pasphoto
          
          console.log(response)
        })
        .catch((error)=>{
          console.log(error)
        })
    }

    const divisis = ref([])

    onMounted(() => {
        dataUser()

        //get divisi
        axios.get(route + 'divisis')
        .then(response => {
          divisis.value = response.data.data;
        }).catch(error => {
          console.log(error);            
        })
    })

    return {
      user,
      divisis,
    }
  },
  methods: {
    editData(){
      this.dialogEdit = true; 
    },
    closeDialog() {
      this.dialogEdit = false;
    }
  },
}
</script>