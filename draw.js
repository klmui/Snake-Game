const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d"); // context
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;

var interval = 200;

function setupScoreboard() {

  // For medal distribution
  this.hardCounter = 3;
  this.mediumCounter = 3;
  this.easyCounter = 3;

  // Get top players
  $.ajax({
    type: 'GET',
    url: `https://us-central1-snake-game-8decc.cloudfunctions.net/api/users`,
    dataType: 'json',
    success: function (users) {
      $.each(users, function (index, user) {
        addPlayer(user);
      });
    },
    error: function() {
      alert('Error loading top players :(');
    }
  });
}
setupScoreboard();

function resetScoreBoard(lowestId) {
  document.getElementById("hard").innerHTML = "";
  document.getElementById("medium").innerHTML = "";
  document.getElementById("easy").innerHTML = "";

  // For medal distribution
  this.hardCounter = 3;
  this.mediumCounter = 3;
  this.easyCounter = 3;

  // Get top players
  $.ajax({
    type: 'GET',
    url: `https://us-central1-snake-game-8decc.cloudfunctions.net/api/users`,
    dataType: 'json',
    success: function (users) {
      console.log("users:", users);
      $.each(users, function (index, user) {
        addPlayer(user);
      });
    },
    error: function() {
      alert('Error loading top players :(');
    }
  });
}

function addPlayer(user) {
  var list = document.getElementById(user.mode);
  if (user.mode === 'hard') {
    if (hardCounter == 3) {
      // Gold
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥇"));
      list.appendChild(entry);
      this.hardCounter--;
    } else if (hardCounter == 2) {
      // Silver
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥈"));
      list.appendChild(entry);
      this.hardCounter--;
    } else if (hardCounter == 1) {
      // Bronze
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥉"));
      list.appendChild(entry);
      this.hardCounter--;
    }
  } else if (user.mode === 'medium') {
    if (mediumCounter == 3) {
      // Gold
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥇"));
      list.appendChild(entry);
      this.mediumCounter--;
    } else if (mediumCounter == 2) {
      // Silver
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥈"));
      list.appendChild(entry);
      this.mediumCounter--;
    } else if (mediumCounter == 1) {
      // Bronze
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥉"));
      list.appendChild(entry);
      this.mediumCounter--;
    }
  } else if (user.mode === 'easy') {
    if (easyCounter == 3) {
      // Gold
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥇"));
      list.appendChild(entry);
      this.easyCounter--;
    } else if (easyCounter == 2) {
      // Silver
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥈"));
      list.appendChild(entry);
      this.easyCounter--;
    } else if (easyCounter == 1) {
      // Bronze
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(user.name + ' - ' + user.score + " 🥉"));
      list.appendChild(entry);
      this.easyCounter--;
    }
  }
}

// Wrap it in parenthesis and put parenthesis after function to call right away
function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();  

  clearInterval(setupVar);
  // Change setInterval time for difficulty
  this.setupVar = window.setInterval(() => {
    // Clear the entire snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();
    document.querySelector('.score').innerText = "Score: " + snake.total;
  }, interval);
};

setup();

window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));

window.addEventListener('keyup', ((event) => {
  direction = event.key.replace('Arrow', '');
  snake.removeClicked(direction);
}));