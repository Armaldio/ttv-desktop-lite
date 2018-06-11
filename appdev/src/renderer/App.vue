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
  import notifier from 'node-notifier';
  import AppBar from './components/AppBar';

  export default {
    name: 'twitchy-desktop-lite',
    components: {
      AppBar,
    },
    mounted() {
      const isFirstTime = this.$db.get('isFirstTime').value();
      console.log('isFirstTime', isFirstTime);

      if (isFirstTime) {
        notifier.notify({
          title: 'Welcome To Twitchy Desktop Lite',
          message: 'Thanks for using our desktop app! You can customize your experience by clicking the Settings icon in the top-left.',
        });
      }
    },
  };
</script>

<style>
    /* CSS */
    html {
        overflow: hidden;
        user-select: none !important;
        -webkit-user-select: none !important;
    }

    #app {
        overflow: hidden;
        margin: 0;
    }

    .container {
        margin: 0;
        padding: 0;
    }

    @keyframes fadein {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    #app {
        animation: fadein 2s;
    }
</style>
