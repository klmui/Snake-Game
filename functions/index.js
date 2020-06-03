const functions = require('firebase-functions');
const app = require('express')();

// Imports
const {
  getAllUsers,
  editUser
} = require('./topUsers');

// User API (register routes)
app.get('/users', getAllUsers);
app.post('/user/:userId', editUser);

exports.api = functions.https.onRequest(app);