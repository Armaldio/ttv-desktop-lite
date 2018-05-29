<template>
    <v-system-bar style="-webkit-app-region: drag" window dark>
        <v-icon>menu</v-icon>
        <v-spacer style="-webkit-app-region: drag"></v-spacer>
        <v-icon @click="$electron.remote.getCurrentWindow().minimize()">remove</v-icon>
        <v-icon @click="toggleRestore">check_box_outline_blank</v-icon>
        <v-icon @click="$electron.remote.app.quit()">close</v-icon>
    </v-system-bar>
</template>

<script>
  export default {
    name: 'AppBar',
    methods: {
      toggleRestore() {
        if (this.$electron.remote.getCurrentWindow().isMaximized()) {
          this.$electron.remote.getCurrentWindow().unmaximize();
        } else {
          this.$electron.remote.getCurrentWindow().maximize();
        }
      },
    },
  };
</script>

<style scoped>
    .icon {
        -webkit-app-region: no-drag;
		-webkit-user-select: none !important;
        cursor: pointer;
    }
</style>
