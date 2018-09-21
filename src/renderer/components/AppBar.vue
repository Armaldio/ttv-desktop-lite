<template>
    <div>
        <v-system-bar class="system-bar" v-if="!isFullScreen" style="height: 25px;" window dark>
            <v-toolbar-title class="main-title ml-2">
                TTV Desktop Lite
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon v-if="isPageReady" title="Show/Hide" @click.stop="" style="padding-right:0px; padding-left:0px;">chevron_left</v-icon>

            <v-icon v-if="isPageReady" title="Toggle Fullscreen" @click.stop="toggleFullscreen()" style="margin-right:8px; margin-left:8px; padding-right:0px; padding-left:0px;">fullscreen</v-icon>

            <v-icon v-if="isPageReady" title="Go Back" @click.stop="webview.goBack()" style="padding-right:0px; padding-left:0px;">arrow_back</v-icon>
            <v-icon v-if="isPageReady" title="Reload Page" @click.stop="webview.reload()" style="padding-right:0px; padding-left:0px;">refresh</v-icon>
            <v-icon v-if="isPageReady" title="Go Forward" @click.stop="webview.goForward()" style="margin-right:8px; padding-right:0px; padding-left:0px;">arrow_forward</v-icon>

            <v-icon v-if="isPageReady" title="Zoom In" @click.stop="zoomLevel += 0.5" style="padding-right:0px; padding-left:0px;">zoom_in</v-icon>
            <v-icon v-if="isPageReady" title="Reset To Actual Size" @click.stop="zoomLevel = 0" style="padding-right:0px; padding-left:0px;">youtube_searched_for</v-icon>
            <v-icon v-if="isPageReady" title="Zoom Out" @click.stop="zoomLevel -= 0.5" style="margin-right:8px; padding-right:0px; padding-left:0px;">zoom_out</v-icon>

            <v-icon v-if="isPageReady" @click="showMenu" style="margin-right:6px;" title="Settings">settings</v-icon>

            <v-icon @click="$electron.remote.getCurrentWindow().minimize()" style="padding-top:8px;">remove</v-icon>
            <v-icon @click="toggleRestore">crop_square</v-icon>
            <v-icon @click="$electron.remote.getCurrentWindow().close()" class="close">close</v-icon>
        </v-system-bar>
        <v-dialog v-model="editTwitchPagePopup" max-width="500px">
            <v-card class="purple-bg">
                <v-card-title class="abouttitle">
                    <span>Twitch.TV Startup Page</span>
                    <v-spacer></v-spacer>
                    <v-icon style="padding:0px;" @click.stop="editTwitchPagePopup = false">close</v-icon>
                </v-card-title>
                <v-card-text style="padding-top:0;" class="abouttext">
                <v-card-text style="padding-bottom:0; margin-top:18px; font-size:10px; line-height:0; font-family: Ethnocentric, Arial, serif;">Enter Your Startup Page:
                </v-card-text>
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
                <v-card-actions class="abouttext">
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid"
                           style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: #4a3671; font-weight: normal;"
                           @click.stop="saveChanges">Apply
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="aboutModal" max-width="500px">
            <v-card class="purple-bg">
                <v-card-title class="abouttitle">About
                <v-spacer></v-spacer>
                <v-icon style="padding:0px;" @click.stop="aboutModal = false">close</v-icon>
                </v-card-title>
                <v-card-text class="abouttext">
                    <img width="150" src="/static/TTVDesktopLite_abouticon.png" alt="">
                    <p class="aboutheadline"><span
                            style="color: #fff; text-shadow: 0 2px 5px black;">TTV Desktop Lite</span><br><span
                            style="font-size:10px; text-shadow: 0 0.5px 1px black;">Version: <b>{{ pkg.version }}</b></span>
                    </p>
                </v-card-text>
                <v-card-actions class="abouttext">
                    <v-btn style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: linear-gradient(135deg, rgba(234,185,45,1) 0%,rgba(199,152,16,1) 66%,rgba(199,152,16,1) 89%); text-shadow: 0 0.5px 1px black;"
                           @click.stop="">Donate
                    </v-btn>
                    <v-btn style="color: #fff; border: 1px solid transparent; border-radius: 2px; background: #b60205; font-weight: normal;"
                           @click.stop="">Report Bug
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
                accelerator: 'CTRL+R',
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
                  this.zoomLevel += 0.5;
                },
              },
              {
                label: '− Zoom Out',
                click: () => {
                  this.zoomLevel -= 0.5;
                },
              },
              {
                label: 'Reset To Actual Size',
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
                label: 'Enable Notifications (for TTV Desktop Lite)',
                checked: false,
                enabled: false,
              },
              {
                type: 'separator',
                visible: false,
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
            label: 'Layout Editor',
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
      toggleFullscreen() {
        if (this.$electron.remote.getCurrentWindow().isFullScreen()) {
          this.$electron.remote.getCurrentWindow().setFullScreen(false);
        } else {
          this.$electron.remote.getCurrentWindow().setFullScreen(true);
        }
      },
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
        if (input.control && input.alt && input.key === 'r') {
          this.$electron.remote.getCurrentWindow().reload();
        }
        if (input.control && input.key === 'r') {
          this.webview.reload();
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
        color: rgba(250, 250, 250, 1.0);
    }

    .material-icons {
        -webkit-app-region: no-drag;
        -webkit-user-select: none !important;
        transition: none;
        cursor: pointer;
        height: 25px;
        padding-top: 3px;
        padding-left: 3px;
        padding-right: 3px;
        margin-right: 0;
        background-color: transparent;
        text-shadow: 0 0.5px 1px black;
    }

    .material-icons:hover {
        background-color: hsla(0, 0%, 100%, .05);
    }

    .application .theme--dark.system-bar .icon, .theme--dark .system-bar .icon {
        color: rgba(120, 120, 120, 1.0);
    }

    .application:hover .theme--dark.system-bar .icon:hover, .theme--dark:hover .system-bar:hover .icon:hover {
        color: rgba(220, 220, 220, 1.0);
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
        background-image: radial-gradient(circle farthest-side at left center,#2c2541,#0e0c13 150%);
        cursor: default;
        height: 40px;
        text-shadow: 0 0.5px 1px black;
    }

    .aboutheadline {
        font-family: Ethnocentric, Arial, serif;
        font-size: 20px;
        padding-top: 10px;
        cursor: default;
    }

    .abouttext {
        background-image: radial-gradient(circle farthest-side at top center,#201c2b,#0e0c13 100%);
        padding: 12px;
        width: 100%;
        border-top: 2px solid #2c2541;
        text-align: center;
        cursor: default;
    }

    .application .theme--dark.system-bar, .theme--dark .system-bar {
        background-image: radial-gradient(circle farthest-side at left center,#201c2b,#0e0c13 100%);
        -webkit-app-region: drag;
        padding: 0px;
        text-shadow: 0 0.5px 1px black;
    }
</style>
