<template>
    <div id="background">
        <div class="registerCard">
            <h1 class="titleText">REGISTER</h1>
            <v-form ref="form" v-model="valid">
                <v-container class="formRegister">
                    <v-text-field v-model="formInput.name" label="Nama Lengkap" color="purple" solo required></v-text-field>
                    
                    <v-text-field v-model="formInput.nickname" label="Nickname" color="purple" solo required></v-text-field>
                    <v-text-field v-model="formInput.nohp" label="No Handphone" color="purple" type="tel" solo required></v-text-field>
                    <v-text-field v-model="formInput.email" label="Email" color="purple" solo required></v-text-field>
                    <v-text-field v-model="formInput.password" type="password" label="Password" color="purple" solo required></v-text-field>

                    <v-select v-model="formInput.divisi" 
                            :items="divisis" item-text="nama"
                            item-value="kode_divisi"
                            return-object
                            label="Divisi" 
                            color="purple" 
                            solo required>
                    </v-select>
                    <v-file-input v-model="formInput.pasphoto" accept="image/*" color="grey" counter label="Masukkan Foto Profil" placeholder="Masukkan Foto Profil" prepend-icon="mdi-paperclip" solo :show-size="1000">
                        <template v-slot:selection="{ index, text }">
                            <v-chip v-if="index < 2" color="grey lighten-3" label>
                                {{ text }}
                             </v-chip>
                            <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2"> +{{ pasphoto.length - 2 }} File(s)</span>
                        </template>
                    </v-file-input>
                    <v-spacer></v-spacer>
                    <v-btn class="btnRegister" @click="register" color="red darken-3" style="color: white;">Register</v-btn>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useToastr } from '../../toastr';

const toastr = useToastr();

const route = "https://store.ksaduajy.com/laravel_esport/api/";

export default {
    data() {
        return {
            formInput: {
                name: null,
                nickname: null,
                nohp: null,
                email : null,
                password : null,
                divisi: null,
                pasphoto : null,
            }, 
            
        }
    },
    setup() {
        //state validation
        const validation = ref([])
        const divisis = ref([])

        onMounted(() => {
            axios.get(route + 'divisis')
            .then(response => {
                divisis.value = response.data.data;
            }).catch(error => {
            console.log(error);            
            })
        })

        return {
            // 
            validation,
            divisis,
        }
    },

    methods:{
        register() {
            console.log(this.formInput);
            axios.post(route + 'register', {
                name: this.formInput.name, 
                nickname: this.formInput.nickname, 
                nohp: this.formInput.nohp, 
                email:this.formInput.email, 
                password: this.formInput.password, 
                divisi: this.formInput.divisi.kode_divisi, 
                pasphoto: this.formInput.pasphoto}, {

                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            })
            .then(response => {
                console.log(response);

                this.$router.push({ name: 'Login' });
                toastr.success('Register Success');
                // this.switchPage(response.data.user.idRole);                
            }).catch(error => {
                console.log(error);        
                toastr.error('Register Failed');
            });
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

#background {
    background-image: url("https://images.pling.com/img/00/00/61/57/57/1549487/577c4dc30402a8dfa3915867a59e64a89b7b723b9ac219fd677bdd0415563d4f084f.jpg");
    min-height: 92vh;
    display: flex;
    /* background-size: cover; */
}

.titleText {
    font-family: 'Russo One', sans-serif;
    color: white;
    letter-spacing: .2rem;
    text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
    text-align: center;
    padding-top: 20px;
    font-size: 45px;
}

.registerCard {
    border: 3px solid purple;
    margin: auto;
    width: 500px;
    box-shadow: 0 0 60px 5px white;
}

.formRegister {
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

@media screen and (max-width: 1316px) {
    .formRegister {
        margin-top: 40px;
        padding-left: 20px;
        padding-right: 20px;
    }
}

.v-btn {
    display: flex;
}

.btnRegister {
    margin: auto;
    width: 280px;
    margin-bottom: 10px;
}

.linkRegister:hover {
    color: purple !important;

}
.theme--light.v-counter {
    color: #f5f5f5;
}
</style>