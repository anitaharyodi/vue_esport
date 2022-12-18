<template>
    <div id="background">
        <div class="container">
            <h1 class="titleText">CONTACT US</h1>
            <v-container class="card bg-transparent" style="padding-left: 40px;">
                <v-row>
                    <v-col v-for="image in images" :key="image.title" style="padding: 5px; padding-top: 20px;" class="colCard">
                        <v-card class="mx-auto" width="275" color="purple darken-4">
                            <v-img :src="image.src" width="275px" height="280px" class="img"></v-img>

                            <v-card-title v-text="image.title" style="font-size: 18px; color: white;"></v-card-title>
                            <v-card-subtitle v-text="image.subtitle"
                                style="color: whitesmoke; padding-bottom: 0px;"></v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="orange lighten-2" :href="image.href" outlined style="margin-top: 20px; margin-bottom: 10px;" class="mx-auto">
                                    Follow Me
                                </v-btn>
                            </v-card-actions>
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
            images: [
                { title: 'Anita Haryodi', src: require('@/assets/anita.jpg'), subtitle: 'Front End INF 20', href: 'https://www.instagram.com/anitaharyodi/'},
                { title: 'Tian Bita Usfinit', src: require('@/assets/tian.jpg'), subtitle: 'Front End INF 20', href: 'https://www.instagram.com/tian_usfinit/' },
                { title: 'Patrick Nino Kolin Prama', src: require('@/assets/patrick.jpg'), subtitle: 'Front End INF 20', href: 'https://www.instagram.com/patrickgenzz/' },
                { title: 'Bram Majaya Perangin-angin', src: require('@/assets/bram.jpg'), subtitle: 'Back End INF 20', href: 'https://www.instagram.com/bram.m.p//' },
                { title: 'Michael Valent Jovani', src: require('@/assets/valent.jpg'), subtitle: 'Back End INF 20', href: 'https://www.instagram.com/valentjovani/' },
            ],
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
    padding-top: 30px;
}


</style>