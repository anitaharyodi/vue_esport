<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Member</h1> 
            </div>
            <hr>
            <v-row>
                <v-data-table :headers="headers" :items="users" :search="search">
                    <template v-slot:[`item.division`]="{ item }">
                        <span v-if="item.divisi == 0">Mobile Legend</span>
                        <span v-else-if="item.divisi == 1">Pubg Mobile</span>
                        <span v-else-if="item.divisi == 2">Dota 2</span>
                        <span v-else-if="item.divisi == 3">Valorant</span>
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                        <v-img
                            :src="item.photo"
                            max-width="100"
                            max-height="100"
                            contain
                        ></v-img>
                    </template>
                    <!-- actions -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <span v-if="role == user">
                        <v-icon color="green" class="mr-2" @click="showData(item)">bx bx-info-square</v-icon>
                      </span>
                      <span v-else>
                        <v-icon  color="green" class="mr-2" @click="showData()">bx bx-info-square</v-icon>
                        <!-- <v-icon  color="red" class="mr-2"  @click="selectedId = item.id; dialogConfirm = true">mdi-delete</v-icon>
                        <v-icon  color="green" class="mr-2" @click="editData()">mdi-information-outline</v-icon> -->
                      </span>
                    </template>
                </v-data-table>
            </v-row>
            <v-dialog transition="dialog-top-transition" max-width="700" v-model="dialogShow" style="border-radius: 10px;" persistent>
                <v-card style="border-radius: 10px;">
                    <v-card-title class="pa-0">
                        <v-toolbar color="green" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                          <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">Show Profile</span>   
                        </v-toolbar>
                    </v-card-title> 
                    <v-card-text class="pb-0">
                        <v-container> 
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user" readonly v-model="this.name" label="Name" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-user-pin" readonly v-model="this.nickname" label="Nickname" type="text" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-phone" readonly v-model="this.no_hp" label="No HP" type="numeric" required></v-text-field>
                                <v-text-field class="textfield mt-3" prepend-icon="bx bx-envelope" readonly v-model="this.email" label="Email" type="text" required></v-text-field>
                                <v-select v-model="this.divisi" :items="[ 
                                    { text: 'Mobile Legend', value: 0 }, 
                                    { text: 'Pubg Mobile', value: 1 }, 
                                    { text: 'Dota 2', value: 2 }, 
                                    { text: 'Valorant', value: 3 }, 
                                  ]" label="Divisi" readonly prepend-icon="bx bx-selection">
                                </v-select>
                        </v-container> 
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="justify-end">
                        <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:green;" @click="closeDialog()">Close</v-btn>
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
        search: null,
        dialogShow: false,
        headers: [
          {text: "Nama", value: "name"},
          {text: "Nickname", value: "nickname"},
          {text: "No HP", value: "no_hp"},
          {text: "Email", value: "email"},
          {text: "Divisi", value: "divisi"},
          {text: "Photo", value: "photo"},
          {text: "", value: "actions"},
        ],
        users: [
          {
            name: "Patrick",
            nickname: "Kaiden",
            no_hp: "08123456789",
            email: "patrick@gmail.com",
            divisi: 0,
            photo: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          },
          {
            name: "Bram",
            nickname: "Pure Light",
            no_hp: "08123456789",
            email: "bram@gmail.com",
            divisi: 3,
            photo: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          },
          {
            name: "Hanah",
            nickname: "Hanahanjay",
            no_hp: "08123456789",
            email: "hanahHaha@gmail.com",
            divisi: 2,
            photo: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          },
        ],
      }
    },
    methods: {
      //make method for show data
      showData(item) {
        this.dialogShow = true;
        this.name = item.name;
        this.nickname = item.nickname;
        this.no_hp = item.no_hp;
        this.email = item.email;
        this.divisi = item.divisi;
      },
      closeDialog() {
      this.dialogShow = false;
    }
    },
  }
</script>
