const mongoose = require('mongoose');

async function initMongo() {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  const exists = collections.some(c => c.name === 'profiles');

  if (!exists) {
    await db.createCollection('profiles');
    console.log("✅ Collection MongoDB 'profiles' créée");
  } else {
    console.log("✅ Collection MongoDB 'profiles' déjà existante");
  }
}

module.exports = initMongo;
