function Fruit() {
  this.x;
  this.y;

  this. pickLocation = function() {
    // 30 cols and 30 rows, but our canvas is 300 by 300 so need to multiply by scale
    // Pick row and col first and then multiply by scale
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  }

  this.draw = function() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}