<template>
    <v-system-bar style="-webkit-app-region: drag; height: 25px; background-color: #2c2541;" window dark>
        <v-icon>menu</v-icon>
		<v-spacer style="-webkit-app-region: drag;"></v-spacer>
		<v-toolbar-title style="-webkit-app-region: drag;">Twitchy Desktop Light</v-toolbar-title>
		<v-spacer style="-webkit-app-region: drag;"></v-spacer>
        <v-icon @click="$electron.remote.getCurrentWindow().minimize()">remove</v-icon>
        <v-icon @click="toggleRestore">check_box_outline_blank</v-icon>
        <v-icon @click="$electron.remote.app.quit()" class="close">close</v-icon>
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
    .material-icons {
        -webkit-app-region: no-drag;
		-webkit-user-select: none !important;
        cursor: pointer;
		height: 25px;
		padding-top: 3px;
		padding-left: 3px;
		padding-right: 3px;
		background-color: rgba(100, 100, 100, 0.0);
		transition: border-bottom 100ms ease-in-out;
		border-bottom: 1px solid hsla(0,0%,100%,.0);
    }
    .material-icons:hover {
		border-bottom: 1px solid hsla(0,0%,100%,.7);
    }
    .material-icons:active {
		background-color: rgba(100, 100, 100, 0.3);
    }
	.close:hover {
		border-bottom: 1px solid #fc3636;
    }
	.close:active {
		background-color: rgba(255, 0, 0, 0.3);
		border-bottom: 1px solid #fc3636;
    }
</style>
