import Dexie from 'dexie';

const db = new Dexie('nuusdb');
db.version(1).stores({
    media: "url"
});

db.getMediaFile = async function(url) {
    return await db.media.get(url);
}

export default db;