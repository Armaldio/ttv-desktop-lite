<template>
    <div id="wrapper">
    </div>
</template>

<script>
  import { download as crxDownload } from 'download-crx';
  import crxUnzip from 'unzip-crx';
  import path from 'path';
  import mkdirp from 'mkdirp';
  import unhandled from 'electron-unhandled';
  import AppBar from './AppBar';

  unhandled();

  export default {
    name: 'setup',
    components: {
      AppBar,
    },
    data() {
      return {
        crxLocation: path.join(this.$electron.remote.app.getPath('userData'), 'extensions', 'crx'),
      };
    },
    methods: {
      async createDirs(fullPath) {
        return new Promise((resolve, reject) => {
          mkdirp(fullPath, (err, made) => {
            if (err) reject(err);
            else resolve(made);
          });
        });
      },
      async downloadExtensions() {
        try {
          await this.createDirs(this.crxLocation);

          console.log('Downloading to :', this.crxLocation);
          const bttvLocation = await crxDownload('https://chrome.google.com/webstore/detail/betterttv/ajopnjidmegmdimjlfnijceegpefgped', this.crxLocation, 'bttv');
          const installLocation = path.join(path.dirname(bttvLocation), 'extensions', 'bttv');
          console.log('installLocation', installLocation);
          const bttvLocationExtracted = await crxUnzip(bttvLocation, installLocation);
          console.log(bttvLocationExtracted);
          console.log('bttv location', bttvLocation);
        } catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.downloadExtensions();
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
