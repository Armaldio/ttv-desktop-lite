<template>
    <div>
        <v-system-bar class="system-bar" v-if="!isFullScreen" style="height: 28px;" window dark>
            <v-icon v-if="isPageReady" @click="showMenu">menu</v-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="main-title">
                TTV Desktop Lite
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="$electron.remote.getCurrentWindow().minimize()">remove</v-icon>
            <v-icon @click="toggleRestore">crop_square</v-icon>
            <v-icon @click="$electron.remote.getCurrentWindow().close()" class="close">close</v-icon>
        </v-system-bar>
        <v-dialog v-model="editTwitchPagePopup" max-width="500px">
            <v-card class="purple-bg">
                <v-card-title class="abouttitle">
                    <span>Twitch.TV Startup Page</span>
                </v-card-title>
                <v-card-text class="aboutheadline" style="padding-bottom:0; font-size:10px; line-height:0;">Enter
                    Your Startup Page:
                </v-card-text>
                <v-card-text style="padding-top:0;">
                    <v-form v-model="valid">
                        <v-text-field
                                light
                                style="margin-top:0; filter: invert(1);"
                                :rules="textRules"
                                placeholder="https://twitch.tv"
                                v-model="inputValue"
                                color="white"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid"
                           style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: #4a3671; font-weight: normal;"
                           @click.stop="saveChanges">✓ Apply
                    </v-btn>
                    <v-btn style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: #4a3671; font-weight: normal;"
                           @click.stop="editTwitchPagePopup = false">✕ Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="aboutModal" max-width="500px">
            <v-card class="purple-bg">
                <v-card-title class="abouttitle">About</v-card-title>
                <v-card-text class="abouttext">
                    <img width="150" src="/static/TTVDesktopLite_abouticon.png" alt="">
                    <p class="aboutheadline"><span
                            style="color: #fff; text-shadow: 0 2px 5px black;">TTV Desktop Lite</span><br><span
                            style="font-size:10px; text-shadow: 0 0.5px 1px black;">Version: <b>{{ pkg.version }}</b></span>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: linear-gradient(135deg, rgba(234,185,45,1) 0%,rgba(199,152,16,1) 66%,rgba(199,152,16,1) 89%); text-shadow: 0 0.5px 1px black;"
                           @click.stop="">♡ Donate
                    </v-btn>
                    <v-btn style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: #b60205; font-weight: normal;"
                           @click.stop="">⚠ Report Bug
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: #4a3671; font-weight: normal;"
                           @click.stop="aboutModal = false">✕ Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { remote } from 'electron';
  import pkg from '../../../package';

  const { Menu } = remote;

  export default {
    name: 'AppBar',
    data() {
      return {
        pkg,
        zoomLevel: 0,
        webview: null,
        editTwitchPagePopup: false,

        valid: false,

        aboutModal: false,

        isFullScreen: false,

        inputValue: this.$db.get('settings.defaultPage')
          .value(),
        textRules: [
          v => v.match(/^https:\/\/(www.)?twitch\.tv\/?/) !== null || 'Url must start with \'https://twitch.tv\'',
        ],

        defaultTwitchPage: this.$db.get('settings.defaultPage')
          .value(),
        isPageReady: false,
      };
    },
    computed: {
      menu() {
        return [
          {
            label: 'Page',
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
                label: '↻ Reload',
                click: () => {
                  this.webview.reload();
                },
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
              {
                type: 'separator',
                visible: false,
              },
              {
                label: '+ Zoom In',
                click: () => {
                  this.zoomLevel += 1;
                },
              },
              {
                label: '− Zoom Out',
                click: () => {
                  this.zoomLevel -= 1;
                },
              },
              {
                label: 'Reset Zoom To 100%',
                sublabel: `Current Zoom: ${Math.round((1.2 ** this.zoomLevel) * 100)}%`,
                click: () => {
                  this.zoomLevel = 0;
                },
              },
            ],
          },
          {
            label: 'Preferences',
            submenu: [
              {
                type: 'checkbox',
                label: 'Run TTV Desktop Lite when my Computer starts',
                checked: false,
                enabled: false,
              },
              {
                type: 'checkbox',
                label: 'Enable Software Rendering Mode',
                checked: false,
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                type: 'checkbox',
                label: 'Enable Notifications (for TTV Desktop Lite)',
                checked: false,
                enabled: false,
              },
              {
                type: 'checkbox',
                label: 'Enable Custom Sounds (for TTV Desktop Lite)',
                checked: false,
                enabled: false,
              },
              {
                label: 'Set Twitch.TV Startup Page',
                sublabel: this.defaultTwitchPage,
                click: () => {
                  this.editTwitchPagePopup = true;
                },
              },
            ],
          },
          {
            label: 'Layout',
            submenu: [
              {
                label: 'Streamer Layout (Example)',
                enabled: false,
              },
              {
                label: 'Viewer Layout (Example)',
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                label: 'Create New Layout',
                enabled: false,
              },
              {
                label: 'Replace Layout',
                enabled: false,
              },
              {
                label: 'Delete Layout',
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                label: 'Save All Layouts To File',
                enabled: false,
              },
              {
                label: 'Save Layout To File',
                enabled: false,
              },
              {
                label: 'Load Layout File',
                enabled: false,
              },
              {
                label: 'Load Layout Package',
                enabled: false,
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
                label: '↓ Update/Install Extensions And Restart',
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                label: 'TTVblock (Adblock)',
                sublabel: 'Status: Up To Date',
                checked: true,
              },
              {
                label: 'Disconnect (Performance)',
                sublabel: 'Status: Up To Date',
                checked: true,
              },
              {
                label: 'BetterTTV (Enhancement)',
                sublabel: 'Status: Up To Date',
                checked: true,
              },
              {
                label: 'Frankerfacez (Enhancement)',
                sublabel: 'Status: Up To Date',
                checked: true,
              },
            ],
          },
          {
            label: 'Advanced',
            submenu: [
              {
                label: 'Purge Memory (RAM)',
                enabled: false,
              },
              {
                label: 'Set Automatic Memory Purge',
                sublabel: 'Every 0 minutes',
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
              },
              {
                label: 'Clear Cache and Restart',
                enabled: false,
              },
            ],
          },
          {
            type: 'separator',
            visible: false,
          },
          {
            label: 'Check for Updates',
            enabled: false,
          },
          {
            label: 'About TTV Desktop Lite',
            click: () => {
              this.aboutModal = true;
            },
          },
        ];
      },
    },
    watch: {
      zoomLevel(newLevel) {
        this.webview.setZoomLevel(newLevel);
      },
    },
    methods: {
      saveChanges() {
        // TODO https://github.com/pubkey/rxdb
        this.$db.set('settings.defaultPage', this.inputValue)
          .write();
        this.defaultTwitchPage = this.inputValue;
        this.editTwitchPagePopup = false;
      },
      toggleRestore() {
        if (this.$electron.remote.getCurrentWindow()
          .isMaximized()) {
          this.$electron.remote.getCurrentWindow()
            .unmaximize();
        } else {
          this.$electron.remote.getCurrentWindow()
            .maximize();
        }
      },
      showMenu() {
        const menu = Menu.buildFromTemplate(this.menu);
        menu.popup(this.$electron.remote.getCurrentWindow(), 20, 10);
      },
    },
    mounted() {
      /* Functions */
      const enterFullScreen = () => {
        this.isFullScreen = true;
      };

      const exitFullScreen = () => {
        this.isFullScreen = false;
      };

      const beforeInputEvent = (event, input) => {
        if (input.control && input.key === 'r') {
          event.stopPropagation();
          event.preventDefault();
        }
      };

      const didAttachWebview = () => {
        this.webview = document.querySelector('#webview');
        console.log('webview loaded', this.webview);

        this.isPageReady = true;

        this.$electron.remote.getCurrentWindow()
          .on('enter-full-screen', enterFullScreen);

        this.$electron.remote.getCurrentWindow()
          .on('leave-full-screen', exitFullScreen);

        this.$electron.remote.getCurrentWindow()
          .webContents
          .on('before-input-event', beforeInputEvent);

        window.addEventListener('keyup', (event) => {
          if (event.ctrlKey /* && event.shiftKey */ && event.code === 'Equal') {
            this.zoomLevel += 1;
          }
          if (event.ctrlKey /* && event.shiftKey */ && event.code === 'Digit6') {
            this.zoomLevel -= 1;
          }
          if (event.ctrlKey /* && event.shiftKey */ && event.code === 'Digit0') {
            this.zoomLevel = 0;
          }
          if (event.ctrlKey /* && event.shiftKey */ && event.code === 'KeyR') {
            event.stopPropagation();
            this.webview.reload();
          }
        }, true);
      };

      /* Remove listeners */
      window.addEventListener('beforeunload', () => {
        this.$electron.remote.getCurrentWindow()
          .removeListener('enter-full-screen', enterFullScreen);
        this.$electron.remote.getCurrentWindow()
          .removeListener('leave-full-screen', exitFullScreen);
        this.$electron.remote.getCurrentWindow()
          .removeListener('before-input-event', beforeInputEvent);
        this.$electron.remote.getCurrentWindow()
          .removeListener('did-attach-webview', didAttachWebview);
      });

      /* Wait for page to be loaded before running anything */
      this.$electron.remote.getCurrentWindow()
        .webContents
        .on('did-attach-webview', didAttachWebview);
    },
  };
</script>

<style scoped>
    @font-face {
        font-family: "Ethnocentric";
        src: url("/static/Ethnocentric.ttf");
    }

    .main-title {
        font-family: Ethnocentric, Arial, serif;
        font-size: 12px;
    }

    .material-icons {
        -webkit-app-region: no-drag;
        -webkit-user-select: none !important;
        transition: none;
        cursor: pointer;
        height: 27px;
        padding-top: 3px;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 0;
        background-color: transparent;
        text-shadow: 0 0.5px 1px black;
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

    .theme--dark.v-card {
        border-radius: 0;
        background-color: #201c2b;
        border: 1px solid #2c2541;
        color: #dad8de;
    }

    .abouttitle {
        font-family: Ethnocentric, Arial, serif;
        border-bottom: 1px solid #3d384b;
        background-color: #2c2541;
        cursor: default;
        text-shadow: 0 0.5px 1px black;
    }

    .aboutheadline {
        font-family: Ethnocentric, Arial, serif;
        font-size: 20px;
        margin-top: 6px;
        line-height: 18px;
        cursor: default;
    }

    .abouttext {
        padding: 16px;
        width: 100%;
        text-align: center;
        cursor: default;
    }

    .application .theme--dark.system-bar, .theme--dark .system-bar {
        padding: 0;
        height: 25px;
        background-color: #2c2541;
        -webkit-app-region: drag;
        border-bottom: 1px solid #3d384b;
        text-shadow: 0 0.5px 1px black;
    }
</style>
