<template>
    <div id="wrapper">
        <main>
            <webview id="webview" :src="startPage" webpreferences="nativeWindowOpen=true" preload="../scripts/installExtensions.js" allowpopups plugins
                     style="display:inline-flex; width:100%; height:100vh;"></webview>
        </main>
    </div>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */

  import { remote } from 'electron';
  import AppBar from './AppBar';

  const { Menu } = remote;

  export default {
    name: 'home',
    components: {
      AppBar,
    },
    data() {
      return {
        webview: null,
        startPage: this.$db.get('settings.defaultPage').value(),
      };
    },
    mounted() {
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
        menu.popup(remote.getCurrentWindow());
      }, false);
    },
  };
</script>

<style scoped>
    html {
        overflow: hidden;
    }

    main {
        width: 100%;
        height: 100%;
    }

    #wrapper {
        width: 100%;
    }
</style>
