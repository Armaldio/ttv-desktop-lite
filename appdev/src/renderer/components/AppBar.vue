<template>
    <div>
        <v-system-bar style="height: 25px;" window dark>
            <v-icon @click="showMenu">menu</v-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="main-title">
                Twitchy Desktop Light
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="$electron.remote.getCurrentWindow().minimize()">remove</v-icon>
            <v-icon @click="toggleRestore">crop_square</v-icon>
            <v-icon @click="$electron.remote.app.quit()" class="close">close</v-icon>
        </v-system-bar>
        <v-dialog v-model="editTwitchPagePopup" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Set Twitch.TV Startup Page</span>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                                :rules="textRules"
                                label="Startup page"
                                placeholder="https://twitch.tv"
                                v-model="inputValue"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="primary" flat @click.stop="saveChanges">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="aboutModal" max-width="500px">
            <v-card>
                <v-card-title class="centered">
                    <span>About Twitchy Desktop Light</span>
                </v-card-title>
                <v-card-text>
                    <img class="centered" width="100" src="/static/twitchy_icon.png" alt="">
                    <p>Twitchy Desktop Light</p>
                    <p>xxxxx</p>
                    <p>Desing this window as you want (withing <b>v-card-text</b>)</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.stop="aboutModal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { remote } from 'electron';

  const { Menu } = remote;

  export default {
    name: 'AppBar',
    data() {
      return {
        webview: null,
        editTwitchPagePopup: false,

        valid: false,

        aboutModal: false,

        inputValue: this.$db.get('settings.defaultPage').value(),
        textRules: [
          v => v.startsWith('https://twitch.tv') || 'Url must start with \'https://twitch.tv\'',
        ],
      };
    },
    computed: {
      menu() {
        return [
          {
            submenu: [
              {
                label: 'Toggle Fullscreen',
                role: 'toggleFullScreen',
                accelerator: 'F11',
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                label: 'Reload',
                role: 'reload',
                accelerator: 'CmdOrCtrl+R',
              },
              {
                label: '← Back',
                enabled: this.webview.canGoBack(),
                click: () => {
                  this.webview.goBack();
                },
              },
              {
                label: '→ Forward',
                enabled: this.webview.canGoForward(),
                click: () => {
                  this.webview.goForward();
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
                checked: false,
                enabled: false,
              },
              {
                type: 'checkbox',
                label: 'Minimize Twitchy to System Tray',
                checked: false,
                enabled: false,
              },
              {
                type: 'checkbox',
                label: 'Enable Low-end Software Rendering Mode',
                checked: false,
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                type: 'checkbox',
                label: 'Enable Desktop Notifications (for Twitchy)',
                checked: false,
                enabled: false,
              },
              {
                type: 'checkbox',
                label: 'Enable all Custom Sounds (for Twitchy)',
                checked: false,
                enabled: false,
              },
              {
                label: 'Set Twitch.TV Startup Page',
                sublabel: this.$db.get('settings.defaultPage').value(),
                click: () => {
                  this.editTwitchPagePopup = true;
                },
              },
            ],
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
                checked: false,
              },
              {
                label: 'BetterTTV (Enhancement)',
                checked: false,
              },
              {
                label: 'Frankerfacez (Enhancement)',
                checked: false,
              },
            ],
          },
          {
            label: 'Check for Updates',
            enabled: false,
            click: () => {
            },
          },
          {
            label: 'About Twitchy',
            click: () => {
              this.aboutModal = true;
            },
          },
        ];
      },
    },
    methods: {
      saveChanges() {
        this.$db.set('settings.defaultPage', this.inputValue).write();
        this.editTwitchPagePopup = false;
      },
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
      this.webview = document.querySelector('#webview');
    },
  };
</script>

<style scoped>
    .centered {
        text-align: center;
    }

    .centered span {
        width: 100%;
    }

    .application .theme--dark.system-bar, .theme--dark .system-bar {
        padding: 0;
        height: 25px;
        background-color: #2c2541;
        -webkit-app-region: drag;
    }

    @font-face {
        font-family: "Ethnocentric";
        src: url("/static/Ethnocentric.TTF");
    }

    .main-title {
        font-family: Ethnocentric, Arial;
        font-size: 12px;
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
	
	.application .theme--light.card, .theme--light .card {
		border-radius: 0px;
		background-color: #201c2b;
		border: 1px solid #2c2541;
		color: #dad8de;
	}
</style>
