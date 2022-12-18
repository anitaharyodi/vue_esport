<template>
    <div class="dashboard">
        <v-app-bar color="black" style="position: sticky; top: 0; right: 0; left: 0; z-index: 10;">
            <img src="../assets/logo.png" width="120px">

            <v-spacer></v-spacer>
            
            <div class="menu-item me-8"><router-link to="/" style="text-decoration: none; color: white;">Home</router-link></div>
            <div class="menu-item me-8"><router-link to="/about" style="text-decoration: none; color: white;">About</router-link></div>
            <div class="menu-item me-8"><router-link to="/contact" style="text-decoration: none; color: white;">Contact</router-link></div>
            <v-spacer></v-spacer>
            <v-btn color="purple darken-2" style="color: white;"><router-link to="/login" style="text-decoration: none; color: white;">Login</router-link></v-btn>
            
        </v-app-bar>
        <div class="fullheight">
            <transition name="router-anim">
            <router-view></router-view>
            </transition>
        </div>
        
    </div>
</template>
<script>
    export default {
        name: "DashboardIndex",
        data() {
            return {
                drawer: false,
                group: null,
            };
        },
    };
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.menu-item {
    margin-top: 0px;
    margin-left: 0px;
    padding: 7px 20px;
    display: block;
    background-repeat: no-repeat;
    position: relative;
    font-family: 'Raleway', Arial, sans-serif;

}
.menu-item:hover {
    background: purple;

}
.menu-item:hover:before {
    content: '';
    position: absolute;
    top:0;
    left:-15px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 0 38px 15px;
    border-color: transparent transparent purple transparent;
}
.menu-item:hover:after {
    content: '';
    position: absolute;
    top:0;
    right:-15px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 39px 15px 0 0;
    border-color: purple transparent transparent transparent;

}

.router-anim-enter-active {
    animation: coming .5s;
    animation-delay: .5s;
    opacity: 0;
}

.router-anim-leave-active {
    animation: going .5s;
}

@keyframes going {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-50px);
        opacity: 0;
    }
}
@keyframes coming {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>