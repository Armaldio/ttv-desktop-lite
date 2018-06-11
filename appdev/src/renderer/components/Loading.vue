<template>
    <div id="wrapper">
        <rotate-square class="loader"></rotate-square>
    </div>
</template>

<script>
  /* eslint-disable no-await-in-loop */
  import { downloadById as crxDownload } from 'download-crx';
  import crxUnzip from 'unzip-crx';

  import path from 'path';
  import mkdirp from 'mkdirp';
  import unhandled from 'electron-unhandled';

  import { RotateSquare } from 'vue-loading-spinner';

  import config from '../../config';

  import AppBar from './AppBar';

  unhandled();

  export default {
    name: 'setup',
    components: {
      AppBar,

      RotateSquare,
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
          const { extensions } = config;

          for (let i = 0; i < extensions.length; i += 1) {
            const extensionId = extensions[i];
            await this.createDirs(this.crxLocation);

            console.log('Downloading to :', this.crxLocation);
            const crxLocationDownloaded = await crxDownload(
              extensionId,
              this.crxLocation,
              extensionId,
            );
            const installLocation = path.join(
              path.dirname(crxLocationDownloaded),
              'extensions',
              extensionId,
            );
            console.log('installLocation', installLocation);
            const crxLocationDownloadedExtracted = await crxUnzip(
              crxLocationDownloaded,
              installLocation,
            );
            console.log(crxLocationDownloadedExtracted);
            console.log('location', crxLocationDownloaded);
          }
        } catch (e) {
          console.log(e);
        }
        this.$router.push('/home');
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

    .loader {
        background-color: #5a3b92 ;
    }

    #wrapper {
        width: 100%;
        text-align: center;
    }
</style>
