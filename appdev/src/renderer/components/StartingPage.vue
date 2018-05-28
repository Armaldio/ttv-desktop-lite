<template>
    <main>
        <v-layout row justify-center class="white--text">
            <v-flex xs12>
                <div class="display-3 text-xs-center">
                    Twitchy Desktop Lite
                </div>
            </v-flex>
        </v-layout>
        <v-layout row justify-center class="grey--text">
            <v-flex xs12>
                <div class="subheading text-xs-center">
                    The lightweight Desktop App for Twitch.TV
                </div>
            </v-flex>
        </v-layout>
        <v-container grid-list-xl>
            <v-layout row justify-center justify-content-center>
                <v-flex xs4>
                    <v-card class="secondary">
                        <v-card-title class="headline text-xs-center">
                            BetterTTV
                        </v-card-title>
                        <v-card-media class="py-1" contain src="/static/betterttv-icon.png"
                                      height="100px"></v-card-media>
                        <v-card-text>
                            <div>BetterTTV enhance Twitch with new features, emotes, and more.</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="white--text" v-if="extensions.betterttv" color="green">Enabled</v-btn>
                            <v-btn class="white--text" v-else color="red">Disabled</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs4>
                    <v-card class="secondary">
                        <v-card-title class="headline text-xs-center">
                            Ublock Origin
                        </v-card-title>
                        <v-card-media class="py-1" contain src="/static/betterttv-icon.png"
                                      height="100px"></v-card-media>
                        <v-card-text>
                            <div>XXXX</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="white--text" v-if="extensions.ublock" color="green">Enabled</v-btn>
                            <v-btn class="white--text" v-else color="red">Disabled</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs4>
                    <v-card class="secondary">
                        <v-card-title class="headline text-xs-center">
                            FrankerFaceZ
                        </v-card-title>
                        <v-card-media class="py-1" contain src="/static/betterttv-icon.png"
                                      height="100px"></v-card-media>
                        <v-card-text>
                            <div>XXXX</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="white--text" v-if="extensions.frankerfacez" color="green">Enabled</v-btn>
                            <v-btn class="white--text" v-else color="red">Disabled</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-btn @click="$router.push('/twitch')" class="secondary">Save and continue</v-btn>
            <v-checkbox class="again-checkbox"
                        label="Don't show the starting page again"
                        v-model="checkbox">
            </v-checkbox>
        </v-container>
    </main>
</template>

<script>
  import '../scripts/database';

  export default {
    name: 'starting-page',
    data() {
      return {
        checkbox: false,
        extensions: {
          betterttv: false,
          ublock: false,
          frankerfacez: false,
        },
      };
    },
    mounted() {

    },
  };
</script>

<style scoped>
    main {
        width: 100%;
    }

    .again-checkbox {
        position: fixed;
        left: 15px;
        bottom: -15px;
    }
</style>
