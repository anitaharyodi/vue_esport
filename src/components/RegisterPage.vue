<template>
    <div id="background">
        <div class="registerCard">
            <h1 class="titleText">REGISTER</h1>
            <v-form ref="form" v-model="valid">
                <v-container class="formRegister">
                    <v-text-field v-model="formInput.name" prepend-inner-icon="bx bx-user" :rules="[rules.required]" label="Nama Lengkap" color="purple" solo required></v-text-field>
                    <v-text-field v-model="formInput.nickname" prepend-inner-icon="bx bx-user-pin" :rules="[rules.required]" label="Nickname" color="purple" solo required></v-text-field>
                    <v-text-field v-model="formInput.nohp" prepend-inner-icon="bx bx-phone" :rules="[rules.required, rules.nohp]" label="No Handphone" color="purple" type="tel" solo required></v-text-field>
                    <v-text-field v-model="formInput.email" prepend-inner-icon="bx bx-envelope" label="Email" color="purple" :rules="[rules.required, rules.email]" solo required></v-text-field>
                    <v-text-field v-model="formInput.password" prepend-inner-icon="bx bx-lock" type="password" label="Password" color="purple" :rules="[rules.required, rules.password]" solo required></v-text-field>
                    <v-autocomplete v-model="formInput.divisi" 
                        :items="divisis" item-text="nama"
                        item-value="kode_divisi"
                        return-object
                        label="Divisi" 
                        color="purple"
                        prepend-inner-icon="bx bx-selection"
                        :rules="[rules.required]" 
                        solo required>
                    </v-autocomplete>
                    <v-file-input v-model="formInput.pasphoto" :rules="[rules.required]" accept="image/*" color="grey" counter label="Masukkan Foto Profil" placeholder="Masukkan Foto Profil" solo :show-size="1000">
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
            formHasErrors: false,
            formInput: {
                name: null,
                nickname: null,
                nohp: null,
                email : null,
                password : null,
                divisi: null,
                pasphoto : null,
            }, 
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
            divisis,
        }
    },
    computed: {
      form () {
        return {
          name: this.name,
        }
      },
    },
    methods:{
        register() {
            if (this.$refs.form.validate()) {
                this.formHasErrors = false
                this.registerProcess();
            } else {
                this.formHasErrors = true
            }
        },
        registerProcess() {
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
                if(error.response.status == 400) {
                    toastr.error('Email Already Exist!');
                } else if(error.response.status == 402) {
                    toastr.error('Server Error!');
                } else {
                    toastr.error('Register Failed!');
                }
            });
        },
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