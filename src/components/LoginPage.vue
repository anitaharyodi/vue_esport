<template>
  <div id="background">
      <div class="loginCard">
        <h1 class="titleText">LOGIN</h1>
          <v-form ref="form" v-model="valid" >
            <v-container class="formLogin">
              <v-text-field
                v-model="formInput.email"
                label="Email"
                color="purple"
                :rules="[rules.required, rules.email]"
                prepend-inner-icon="bx bx-envelope"
                solo
                required
              ></v-text-field>
              <v-text-field
                v-model="formInput.password"
                :rules="[rules.required]"
                prepend-inner-icon="bx bx-lock"
                label="Password"
                color="purple"
                solo
                type="password"
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn class="btnLogin" @click="login" color="yellow darken-3" style="color: white">Login</v-btn>
            </v-container>
            <h5 style=" color: white; text-align: center; margin-bottom: 15px; margin-top: 10px;">Don't have any account?
              <router-link
                to="/register"
                style="text-decoration: none; color: white"
                class="linkRegister">Register here</router-link>
            </h5>
          </v-form>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import * as deleteCookies from "../deleteCookies";
import { useToastr } from '../../toastr';

const toastr = useToastr();

const route = "https://store.ksaduajy.com/laravel_esport/api/";

export default {
  data() {
    return {
      formHasErrors: false,
      formInput: {
        email: null,
        password: null,
      },
      rules: {
        required: value => !!value || 'Required!',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid E-mail!'
        },
      },
    };
  },
  methods:{
    login() {
      if (this.$refs.form.validate()) {
        this.formHasErrors = false;
        this.loginProcess();
      } else {
        this.formHasErrors = true;
      }
    },
    loginProcess() {
      axios.post(route + 'login', this.formInput)
      .then(response => {
        console.log(response);

        //delete token
        deleteCookies.deleteAllCookies();  
        deleteCookies.setCookies("token", response.data.access_token, 30);
        console.log(response.data.access_token);
        
        toastr.success('Login Success');
        this.$router.push({ name: 'Dashboard' });
         
        this.switchPage(response.data.user.role && response.data.user.role.id);                
      }).catch(error => {
        console.log(error);
        if(error.response.status == 401)
          toastr.error('Email or Password is Wrong!');
        else
          toastr.error('Login Failed!');
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

#background {
  background-image: url("https://images.pling.com/img/00/00/61/57/57/1549487/577c4dc30402a8dfa3915867a59e64a89b7b723b9ac219fd677bdd0415563d4f084f.jpg");
  min-height: 92vh;
  display: flex;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}

.titleText {
  font-family: "Russo One", sans-serif;
  color: white;
  letter-spacing: 0.2rem;
  text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
  text-align: center;
  padding-top: 50px;
  font-size: 45px;
}

.loginCard {
  border: 3px solid purple;
  margin: auto;
  width: 500px;
  box-shadow: 0 0 60px 5px white;
}

.formLogin {
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

@media screen and (max-width: 1316px) {
  .formLogin {
    margin-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.v-btn {
  display: flex;
}

.btnLogin {
  margin: auto;
  width: 280px;
}

.linkRegister:hover {
  color: purple !important;
}
</style>
