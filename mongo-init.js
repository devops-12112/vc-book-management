// Switch to the admin database
db = db.getSiblingDB('admin');

// Create admin user if not exists
if (!db.getUser('mongo_user')) {
  db.createUser({
    user: 'mongo_user',
    pwd: 'mongo_password',
    roles: [{ role: 'root', db: 'admin' }]
  });
}

// Switch to the library database
db = db.getSiblingDB('library');

// Create a user for the library database if not exists
if (!db.getUser('mongo_user')) {
  db.createUser({
    user: 'mongo_user',
    pwd: 'mongo_password',
    roles: [{ role: 'readWrite', db: 'library' }]
  });
}