const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d"); // context
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;

var interval = 200;

// Wrap it in parenthesis and put parenthesis after function to call right away
function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  // Change setInterval time for difficulty
  window.setInterval(() => {
    // Clear the entire snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();
    console.log(interval);
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