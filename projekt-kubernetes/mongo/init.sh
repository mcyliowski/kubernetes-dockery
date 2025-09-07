#!/bin/bash
# Start MongoDB without auth
mongod --dbpath /data/db --bind_ip_all --fork --logpath /var/log/mongodb.log

# Wait for it to start
sleep 5

# Run JS to create users
mongosh /init-mongo.js

# Shutdown Mongo
mongosh --eval "db.adminCommand({shutdown: 1})"

# Restart with auth
exec mongod --bind_ip_all --auth --dbpath /data/db
