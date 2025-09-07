db = db.getSiblingDB('testdb');

db.createUser({
  user: "admin",
  pwd: "nimda",
  roles: [
    { role: "readWrite", db: "testdb" }
  ]
});
