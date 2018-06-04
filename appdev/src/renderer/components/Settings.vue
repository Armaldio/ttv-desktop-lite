<template>
    <main>
        <v-layout column justify-center class="white--text">
            <v-flex xs12>
                <div class="display-3 text-xs-center">Settings</div>
            </v-flex>
            <v-flex xs12>
                <div class="display-1 text-xs-center">Extensions</div>
            </v-flex>

            <v-flex xs12>
                <v-checkbox label="Enable <b>uBlock Origin</b> extensions">Enable <b>uBlock Origin</b> extensions</v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-checkbox>Enable <b>BetterTTV</b> extensions</v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-checkbox>Enable <b>FrankerFaceZ</b> extensions</v-checkbox>
            </v-flex>

            <v-flex xs12>
                <div class="display-1 text-xs-center">Preferences</div>
            </v-flex>

            <v-flex xs12>
                <v-checkbox>Run Twitchy when my computer starts</v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-checkbox>Minimize Twitchy to system tray</v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-checkbox>Enable low-end Software rendering Mode (require restart!)</v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-checkbox>ENable Desktop notifications (Twitchy)</v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-checkbox>Enable all custom sounds (Twitchy)</v-checkbox>
            </v-flex>

            <v-flex xs12>
                <div class="display-3 text-xs-center">Twitch</div>
            </v-flex>

            <v-text-field placeholder="Default Twitch.tv url">https://twitch.tv</v-text-field>

            <v-btn @click="$router.push('/')">Back</v-btn>
        </v-layout>
    </main>
</template>

<script>
  import '../scripts/database';

  export default {
    name: 'settings',
    data() {
      return {};
    },
    mounted() {

    },
  };
</script>

<style scoped>
</style>
