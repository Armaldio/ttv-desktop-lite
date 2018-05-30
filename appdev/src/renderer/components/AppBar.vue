<template>
    <v-system-bar class="appbar" style="-webkit-app-region: drag; height: 25px; background-color: #2c2541;" window dark>
        <v-icon @click="showMenu">menu</v-icon>
        <v-spacer style="-webkit-app-region: drag;"></v-spacer>
        <v-toolbar-title style="-webkit-app-region: drag; font-size: 12px;">Twitchy Desktop Light</v-toolbar-title>
        <v-spacer style="-webkit-app-region: drag;"></v-spacer>
        <v-icon @click="$electron.remote.getCurrentWindow().minimize()">remove</v-icon>
        <v-icon @click="toggleRestore">check_box_outline_blank</v-icon>
        <v-icon @click="$electron.remote.app.quit()" class="close">close</v-icon>
    </v-system-bar>
</template>

<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { remote } from 'electron';

  const { Menu } = remote;

  export default {
    name: 'AppBar',
    data() {
      return {
        menu: [
          {
            label: 'Open Twitchy Settings',
            click: () => {
              this.goToSettings();
            },
          },
          {
            label: 'More Settings',
            submenu: [
              {
                label: 'Learn More',
              },
            ],
          },
        ],
      };
    },
    methods: {
      goToSettings() {
        this.$router.push('/settings');
      },
      toggleRestore() {
        if (this.$electron.remote.getCurrentWindow().isMaximized()) {
          this.$electron.remote.getCurrentWindow().unmaximize();
        } else {
          this.$electron.remote.getCurrentWindow().maximize();
        }
      },
      showMenu() {
        const menu = Menu.buildFromTemplate(this.menu);
        menu.popup(this.$electron.remote.getCurrentWindow(), 20, 10);
      },
    },
    mounted() {

    },
  };
</script>

<style scoped>
	.appbar {
		padding: 0px;
	}
	
    .material-icons {
        -webkit-app-region: no-drag;
        -webkit-user-select: none !important;
		transition: none;
        cursor: pointer;
        height: 25px;
        padding-top: 3px;
        padding-left: 10px;
        padding-right: 10px;
		margin-right: 0px;
        background-color: transparent;
    }

    .material-icons:hover {
		background-color: hsla(0,0%,100%,.05);
    }
	
	.application .theme--dark.system-bar .icon, .theme--dark .system-bar .icon {
		color: rgba(150, 150, 150, 1.0);
	}
	
	.application:hover .theme--dark.system-bar .icon:hover, .theme--dark:hover .system-bar:hover .icon:hover {
		color: rgba(255, 255, 255, 1.0);
	}
	
	.close:hover {
		background-color: rgba(255, 0, 0, 0.75);
    }
</style>