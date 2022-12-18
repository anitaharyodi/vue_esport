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
                <v-text-field v-model="this.name" readonly label="Name" type="text" prepend-icon="bx bx-user"></v-text-field>
                <v-text-field v-model="this.nickname" readonly type="text" label="Nickname" prepend-icon="bx bx-user-pin"></v-text-field>
                <v-text-field v-model="this.no_hp" readonly type="text" label="No HP" prepend-icon="bx bx-phone"></v-text-field>
                <v-text-field v-model="this.email" readonly type="numeric" label="Email" prepend-icon="bx bx-envelope"></v-text-field>
                <v-select v-model="this.divisi" :items="[ 
                    { text: 'Mobile Legend', value: 0 }, 
                    { text: 'Pubg Mobile', value: 1 }, 
                    { text: 'Dota 2', value: 2 }, 
                    { text: 'Valorant', value: 3 }, 
                  ]" label="Divisi" readonly prepend-icon="bx bx-selection">
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="text-center">
                  <img :src="this.photo" 
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
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user" v-model="this.name" label="Name" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user-pin" v-model="this.nickname" label="Nickname" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-phone"  v-model="this.no_hp" label="No HP" type="numeric" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-envelope" v-model="this.email" label="Email" type="text" required></v-text-field>
                                <v-select v-model="this.divisi" :items="[ 
                                    { text: 'Mobile Legend', value: 0 }, 
                                    { text: 'Pubg Mobile', value: 1 }, 
                                    { text: 'Dota 2', value: 2 }, 
                                    { text: 'Valorant', value: 3 }, 
                                  ]" label="Divisi" prepend-icon="bx bx-selection">
                                </v-select>
                                <v-file-input prepend-icon="bx bx-upload" class="textfield mt-3" v-model="this.photo" accept=".jpeg" label="Upload Foto" required></v-file-input>
                                <!-- <v-input class="textfield mt-3" prepend-icon="bx bx-upload" v-model="photo" label="Upload Foto" type="file" required> -->
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-lock" v-model="this.password" label="Password" type="password" required></v-text-field>
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

export default {
  components: {VueSidebarMenu},
  data() {
    return {
      dialogEdit: false,
      dialogConfirm: false,
    // search: null,  
      name: "Patrick",
      nickname: "Kaiden",
      no_hp: "08123456789",
      email: "patrick@gmail.com",
      divisi: 0,
      photo: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      password: "anjaymabar",
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