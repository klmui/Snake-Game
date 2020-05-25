function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];


  this.draw = function () {
    ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    // Fill in a square where the snake is (current position)
    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() {
    // Once you have more than 2 blocks for tail, just shift them over
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }

    // Updates first block in tail to be current block
    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    }
  }

  this.changeDirection = function(direction) {
    switch(direction) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case "Left":
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  }

  this.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }

    return false;
  }

  this.checkCollision = function() {
    for (var i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        // Show modal
        $("#gameOver").modal("show");
        $(".modal-body").text("You died! Your score is " + snake.total + "! Click 'Play Again' to earn a top spot!");

        this.total = 0;
        this.tail = [];
        this.x = 0;
        this.y = 0;
      }  
    }
  }
}