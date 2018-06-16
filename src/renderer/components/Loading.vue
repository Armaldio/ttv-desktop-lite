<template>
    <div id="wrapper">
        <SyncLoader color="#5a3b92"></SyncLoader>
        <v-progress-linear class="progress" v-model="progress" height="5" color="primary darken-1"></v-progress-linear>
        <!--<div class="text pt-4">
            <span>{{ current }} / {{ total }}</span>
        </div>-->
		<v-card-text class="progresstext">Performing first time setup, please wait!</v-card-text>
    </div>
</template>

<script>
  /* eslint-disable no-await-in-loop */
  import { downloadById as crxDownload } from 'download-crx';
  import crxUnzip from 'unzip-crx';

  import path from 'path';
  import mkdirp from 'mkdirp';

  import SyncLoader from 'vue-spinner/src/SyncLoader';

  import config from '../../config';

  import AppBar from './AppBar';

  export default {
    name: 'setup',
    components: {
      AppBar,

      SyncLoader,
    },
    data() {
      return {
        crxLocation: path.join(this.$electron.remote.app.getPath('userData'), 'extensions', 'crx'),
        progress: 0,
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
      async sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      },
      async downloadExtensions() {
        await this.sleep(1000);
        try {
          const { extensions } = config;

          this.total = extensions.length;

          for (let i = 0; i < extensions.length; i += 1) {
            this.progress = ((i + 1) / (extensions.length)) * 100;

            const extensionId = extensions[i];
            await this.createDirs(this.crxLocation);

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
            console.log('Extracting to', installLocation);
            await crxUnzip(
              crxLocationDownloaded,
              installLocation,
            );
            await this.sleep(1000);
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
    @font-face {
        font-family: "Ethnocentric";
        src: url("/static/Ethnocentric.TTF");
    }
	
    html {
        overflow: hidden;
        background-color: #17141f !important;
        border-color: #17141f !important;
    }

    main {
        width: 100%;
        height: 100%;
    }

    .progress {
        position: absolute;
        bottom: -14px;
    }

    .text {
        color: #442566;
    }

    #wrapper {
        width: 100%;
        text-align: center;
    }
	
	.progresstext {
        margin-top: 10px;
        color: rgba(150, 150, 150, 1.0);
        text-align: center;
        font-family: Ethnocentric, Arial;
    }
</style>
