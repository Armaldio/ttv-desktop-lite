import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';

const DB = {
  install(Vue) {
    const dbPath = path.join(remote.app.getPath('userData'), 'settings.json');
    const adapter = new FileSync(dbPath);
    const db = lowdb(adapter);
    db.defaults({
      settings: {},
    }).write();

    Vue.prototype.$db = db;
  },
};

export default DB;
