const { db } = require('./util/admin');
const cors = require('cors')({origin: true});
const functions = require('firebase-functions');

// GET all users from DB (exporting this function)
exports.getAllUsers = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    db
      .collection('users')
      .orderBy('score', 'desc')
      .get()
      .then((data) => {
        let users = [];
        data.forEach((doc) => {
          users.push({
            userId: doc.id,
            name: doc.data().name,
            score: doc.data().score,
            mode: doc.data().mode
          });
        });
        return response.json(users);
      }).catch((err) => {
        console.log(err);
        return response.status(500).json({error: err.code});
      });
  });
});

// POST (PUT) route
exports.editUser = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // let user = db.collection('users').doc(`${request.params.userId}`);
    // user.update(request.body)
    //   .then(() => {
    //     return response.json({message: 'Updated successfully'});
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     return response.status(500).json({
    //       error: err.code
    //     });
    //   });

    // Create new user
    const newUserItem = {
      name: request.body.name,
      score: request.body.score,
      mode: request.body.mode
    }

    db
      .collection('users')
      .add(newUserItem)
      .then((doc) => {
        const responseUserItem = newUserItem;
        responseUserItem.id = doc.id;
        deleteLowestScore(request, response);
        return response.json(responseUserItem);
      }).catch((err) => {
        response.status(500).json({ error: 'Something went wrong' });
        console.log(err);
      });
      
  });
});

// Gets all users then calls helper function
function deleteLowestScore(request, response) {
   // Delete lowest user with same mode
   var usersArr = [];
   db
     .collection('users')
     .get()
     .then((data) => {
       data.forEach((doc) => {
         usersArr.push({
           userId: doc.id,
           name: doc.data().name,
           score: doc.data().score,
           mode: doc.data().mode
         });
       });
       console.log("usersArr before:", usersArr);
       findAndDeleteHelper(request, usersArr);
       return response.json(usersArr);
     }).catch((err) => {
       console.log(err);
       return response.status(500).json({error: err.code});
   });

}

// Finds the lowest score and deletes it
function findAndDeleteHelper(request, usersArr) {
  // Find lowest
  let lowest;
  usersArr.forEach((user) => {
    if (user.mode === request.body.mode && typeof lowest === 'undefined') {
      lowest = user;
    } else if (user.mode === request.body.mode) {
      if (user.score <= lowest.score) {
        lowest = user;
      }
    }
  });

  // Delete lowest
  console.log("usersArr after:", usersArr);
  console.log("lowest:", lowest);
  let document = db.collection('users').doc(`${lowest.userId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: 'User not found' });
      }
      return document.delete();
    })
    .then(() => {
      console.log("Delete successful");
      return response.json({ message: 'Delete successful' });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
}