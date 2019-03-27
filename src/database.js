import Dexie from 'dexie';

const db = new Dexie('nuusdb');
db.version(1).stores({
    media: "url"
});

export default db;