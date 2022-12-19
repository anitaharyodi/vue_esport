<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Dashboard</h1> 
            </div>
            <hr>
            <div id="app">
              <v-app id="inspire">
                <v-row>
                  <v-col cols="12" md="3">
                    <v-card class="mx-auto" max-width="344">
                      <v-img src="https://vcgamers.com/news/wp-content/uploads/2021/11/Skin-Terbaru-Mobile-Legends-2021.jpg" height="200px"></v-img>
                    
                      <v-card-title>
                        Mobile Legend
                      </v-card-title>
                    
                      <v-card-subtitle>
                        Merupakan permainan game online yang dimainkan secara tim. Dalam satu tim akan terdiri atas 5 orang. Pada games
                        Mobile
                        Legend, dua tim akan beradu untuk menyerang base lawan dan mempertahankan base milik tim sendiri
                      </v-card-subtitle>
                    
                      <v-expand-transition>
                        <div v-show="show">
                          <v-divider></v-divider>
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-col>
                
                  <v-col cols="12" md="3">
                    <v-card class="mx-auto" max-width="344">
                      <v-img src="https://asset.indosport.com/article/image/q/80/271630/pubg-169.jpg?w=750&h=423" height="200px"></v-img>
                    
                      <v-card-title>
                        PUBG Mobile
                      </v-card-title>
                    
                      <v-card-subtitle>
                        Merupakan permainan battle royale, di mana 100 orang sekaligus dapat bermain secara daring. Pemenang dari permainan ini
                        adalah individu atau tim yang dapat bertahan hingga akhir.
                      </v-card-subtitle>
                    
                      <v-expand-transition>
                        <div v-show="show">
                          <v-divider></v-divider>
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-col>
                
                  <v-col cols="12" md="3">
                    <v-card class="mx-auto" max-width="344">
                      <v-img src="https://cdn.akamai.steamstatic.com/steam/apps/570/capsule_616x353.jpg?t=1645731580" height="200px"></v-img>
                    
                      <v-card-title>
                        Dota 2
                      </v-card-title>
                    
                      <v-card-subtitle>
                        Merupakan permainan arena pertarungan daring multipemain, dan merupakan sekuel dari Defense of the Ancients mod pada
                        Warcraft 3: Reign of Chaos dan Warcraft 3: The Frozen Throne

                      </v-card-subtitle>
                    
                      <v-expand-transition>
                        <div v-show="show">
                          <v-divider></v-divider>
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-card class="mx-auto" max-width="344">
                      <v-img src="https://www.vantage.id/wp-content/uploads/2021/03/strategi-riot-games-mengembangkan-server-valorant-indonesia-min-2-1024x576.jpg" height="200px"></v-img>
                  
                      <v-card-title>
                        Valorant
                      </v-card-title>
                  
                      <v-card-subtitle>
                      Merupakan permainan bergenre First Person Shooter atau FPS yang menyanjung tema masa depan yang cara bermainnya mirip
                      dengan counter strike GO dan Overwatch
                  
                      </v-card-subtitle>
                  
                      <v-expand-transition>
                        <div v-show="show">
                          <v-divider></v-divider>
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-col>

                </v-row>
                
              </v-app>
                
            </div>
            
            
        </section>
  </div>
</template>

<script>
  import VueSidebarMenu from "../MenuSidebar";
  
  export default {
    components: {VueSidebarMenu},
    data() {
      return {}
    }
  }
</script>