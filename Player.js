
class Player {
	constructor(ctx) {
	  this.x = 55;
	  this.y = 400;
	  this.ctx = ctx;
	  this.velocityY = 0;
	}
  
	update(deltaTime) {
	  this.draw();
	}
  
	draw() {
	  const ctx = this.ctx;
	  
	  // Spaceship Body
	  ctx.beginPath();
	  ctx.moveTo(this.x + 50, this.y);
	  ctx.lineTo(this.x + 20, this.y - 15);
	  ctx.lineTo(this.x - 10, this.y - 15);
	  ctx.lineTo(this.x - 30, this.y - 25);
	  ctx.lineTo(this.x - 30, this.y + 25);
	  ctx.lineTo(this.x - 10, this.y + 15);
	  ctx.lineTo(this.x + 20, this.y + 15);
	  ctx.closePath();
	  ctx.fillStyle = "#FF00FF"; 
	  ctx.fill();
	  ctx.strokeStyle = "black";
	  ctx.stroke();
	  
	  // Spaceship Window
	  ctx.beginPath();
	  ctx.rect(this.x + 10, this.y - 10, 12, 8);
	  ctx.fillStyle = "#00FFFF"; 
	  ctx.fill();
	  ctx.stroke();
	  
	  // Spaceship Thrusters
	  ctx.beginPath();
	  ctx.rect(this.x - 35, this.y - 12, 4, 4);
	  ctx.rect(this.x - 35, this.y + 8, 4, 4);
	  ctx.fillStyle = "#FFA500"; 
	  ctx.fill();
	  ctx.stroke();
	}
  
	setPosition(pos) {
	  this.y = pos;
	}
  }
