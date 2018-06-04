<template>
    <v-system-bar class="appbar" style="-webkit-app-region: drag; height: 25px; background-color: #2c2541;" window dark>
        <v-icon @click="showMenu">menu</v-icon>
        <v-spacer style="-webkit-app-region: drag;"></v-spacer>
        <v-toolbar-title class="main-title" style="-webkit-app-region: drag; font-size: 12px;">
            Twitchy Desktop Light
        </v-toolbar-title>
        <v-spacer style="-webkit-app-region: drag;"></v-spacer>
        <v-icon @click="$electron.remote.getCurrentWindow().minimize()">remove</v-icon>
        <v-icon @click="toggleRestore">crop_square</v-icon>
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
            submenu: [
              {
                label: 'Toggle Fullscreen',
                click: () => {

                },
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                label: 'Reload',
                click: () => {

                },
              },
              {
                label: 'Back',
                click: () => {

                },
              },
              {
                label: 'Forward',
                click: () => {
                  this.goToSettings();
                },
              },
            ],
            label: 'Page',
          },
          {
            label: 'Preferences',
            submenu: [
              {
                type: 'checkbox',
                label: 'Run Twitchy when my Computer starts',
                checked: true,
              },
              {
                type: 'checkbox',
                label: 'Minimize Twitchy to System Tray',
                checked: true,
              },
              {
                type: 'checkbox',
                label: 'Enable Low-end Software Rendering Mode',
                checked: true,
              }, {
                type: 'checkbox',
                label: 'Enable Desktop Notifications (for Twitchy)',
                checked: true,
              },
              {
                type: 'checkbox',
                label: 'Enable all Custom Sounds (for Twitchy)',
                checked: true,
              },
            ],
          },
          {
            type: 'separator',
            visible: false,
          },
          {
            label: 'Set Twitch.TV Startup Page',
          },
          {
            type: 'separator',
            visible: false,
          },
          {
            label: 'Extensions',
            submenu: [
              {
                label: 'UBlock Origin (Adblocker)',
              },
              {
                label: 'BetterTTV (Enhancement)',
              },
              {
                label: 'Frankerfacez (Enhancement)',
              },
            ],
          },
          {
            label: 'Open Twitchy Log',
            click: () => {
            },
          },
          {
            label: 'Check for Updates',
            click: () => {
            },
          },
          {
            label: 'About Twitchy',
            click: () => {
            },
          },
        ],
      };
    },
    methods: {
      goToSettings() {
        let mainWindow = new remote.BrowserWindow({
          height: 500,
          width: 500,
        });
        const winURL = process.env.NODE_ENV === 'development'
          ? 'http://localhost:9080'
          : `file://${__dirname}/index.html`;
        mainWindow.loadURL(`${winURL}/settings`);

        mainWindow.on('closed', () => {
          mainWindow = null;
        });
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
    @font-face {
        font-family: "Ethnocentric";
        src: url("/static/Ethnocentric.TTF");
    }

    .appbar {
        padding: 0;
    }

    .main-title {
        font-family: Ethnocentric, Arial;
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
        margin-right: 0;
        background-color: transparent;
    }

    .material-icons:hover {
        background-color: hsla(0, 0%, 100%, .05);
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
