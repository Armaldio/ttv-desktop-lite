<template>
    <div id="app">
        <v-app>
            <AppBar></AppBar>
            <v-content class="primary">
                <v-container fluid fill-height>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
  import AppBar from './components/AppBar';

  export default {
    name: 'twitchy-desktop-lite',
    components: {
      AppBar,
    },
  };
</script>

<style>
    /* CSS */
    #app, body {
        overflow: hidden;
        margin: 0;
    }
</style>
