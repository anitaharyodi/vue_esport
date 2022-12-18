<template>
    <div id="background">
        <div class="container">
            <h1 class="titleText">ABOUT FOUR KINGS</h1>
            <v-container class="card bg-transparent">
                <v-row>
                    <v-col cols="4">
                        <img src="../assets/logo.png" style="
                              width: 450px;
                              height: 480px;
                              object-fit: cover;" />
                    </v-col>
                    <v-col cols="8">
                        <v-card class="cardDesc" width="800" height="400" color="black" outlined shaped>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1 d-flex justify-center" style="color: white; margin-top: 140px;">
                                        "FOUR KINGS IS THE E-SPORTS FOR ALL GAMER."
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="wrap-text d-flex justify-center mt-5" style="color: white;">It is a long established fact that a reader will be distracted the readable content of page when looking at it layout</v-list-item-subtitle>
                                    <v-list-item-subtitle class="wrap-text d-flex justify-center" style="color: white;">the point using lorem Ipsum is that it has a more-or-less normal distribution.</v-list-item-subtitle>
                                    
                                </v-list-item-content>

                            </v-list-item>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>

export default {

    data() {

        return {
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

#background {
    background-image: url("https://images.pling.com/img/00/00/61/57/57/1549487/577c4dc30402a8dfa3915867a59e64a89b7b723b9ac219fd677bdd0415563d4f084f.jpg");
    min-height: 92vh;
    background-size: cover;
}

.titleText {
    font-family: 'Russo One', sans-serif;
    color: white;
    letter-spacing: .2rem;
    text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
    text-align: center;
    padding-top: 50px;
    font-size: 50px;
}

.card {
    padding-top: 15px;
}

.cardDesc {
    margin-left: 50px;
    margin-top: 40px;
    opacity: 50%;
}
</style>