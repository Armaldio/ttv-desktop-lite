<template>
    <div id="app">
        <v-app>
            <v-content class="primary">
                <v-container fluid fill-height>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
  export default {
    name: 'twitchy-desktop-lite',
  };
</script>

<style>
    /* CSS */
    #app, body {
        overflow: hidden;
        margin: 0;
    }
</style>
