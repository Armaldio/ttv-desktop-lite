<template>
    <div id="wrapper">
        <main>
            <webview id="webview" :src="startPage" webpreferences="nativeWindowOpen=true"
                     :preload="preload" allowpopups plugins></webview>
        </main>
    </div>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */

  import { remote } from 'electron';
  import fs from 'fs';
  import path from 'path';
  import config from '../../config';
  import AppBar from './AppBar';

  const { Menu } = remote;
  const { BrowserWindow } = remote;

  export default {
    name: 'home',
    components: {
      AppBar,
    },
    data() {
      return {
        webview: null,
        startPage: this.$db.get('settings.defaultPage')
          .value(),
        preload: `file:${path.resolve(__dirname, './preload/preload.js')}`,
      };
    },
    mounted() {
      this.$electron.remote.getCurrentWindow()
        .webContents
        .on('did-attach-webview', () => {
          this.webview = document.querySelector('#webview');

          const menu = Menu.buildFromTemplate([
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { type: 'separator' },
            { role: 'selectall' },
          ]);

          this.webview.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            menu.popup(this.$electron.remote.getCurrentWindow());
          }, false);

          /**
             * Install extensions
             */
          const { extensions } = config;

          const crxLocation =
                    path.join(this.$electron.remote.app.getPath('userData'), 'extensions', 'crx');

          let installedExtensions = BrowserWindow.getExtensions();
          console.log('Installed extensions: ', installedExtensions);


          Object.keys(installedExtensions)
            .forEach((name) => {
              if (name !== 'Vue.js devtools') {
                console.log('Removing ', name);
                BrowserWindow.removeExtension(name);
              }
            });

          for (let i = 0; i < extensions.length; i += 1) {
            const extension = extensions[i];
            const extensionPath = path.join(crxLocation, 'extensions', extension);
            if (fs.existsSync(extensionPath)) {
              console.log('Extension path: ', extensionPath);

              const installed = BrowserWindow.addExtension(extensionPath);
              console.log('Installing ', installed);
            } else {
              console.log(`Missing ${extensionPath}`);
            }
          }

          installedExtensions = BrowserWindow.getExtensions();
          console.log('Installed extensions:', installedExtensions);
        });
    },
  };
</script>

<style scoped>
    main {
        width: 100%;
        height: 100%;
    }

    #wrapper {
        width: 100%;
    }

    #webview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: inline-flex !important;

        background-color: #17141f !important;
        border-color: #17141f !important;
    }
</style>
