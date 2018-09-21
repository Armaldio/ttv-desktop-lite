import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import isDev from 'electron-is-dev';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';

const DB = {
  install(Vue) {
    let dbPath;
    if (isDev) {
      dbPath = 'settings.json';
    } else {
      dbPath = path.join(remote.app.getPath('userData'), 'settings.json');
    }
    const adapter = new FileSync(dbPath);
    const db = lowdb(adapter);
    db.defaults({
      isFirstTime: true,
      settings: {
        defaultPage: 'https://twitch.tv',
      },
    }).write();

    // const database = this.$options.database;

    /* const strategies = Vue.config.optionMergeStrategies;
    strategies.database = strategies.methods; */

    Vue.prototype.$db = db;
  },
};

export default DB;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DB);
}
