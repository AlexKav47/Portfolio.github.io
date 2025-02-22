
class Player {
	constructor(ctx) {
	  this.x = 55;
	  this.y = 400;
	  this.ctx = ctx;
	  this.velocityY = 0;
	  this.shootingCooldown = 0;
	  this.bullets = [];
	}
  
	update(deltaTime) {
	  this.draw();
	  this.shootingCooldown += deltaTime;
		for(let i = 0; i< this.bullets.length; i++){
			const bullet = this.bullets[i];
			bullet.update(deltaTime);
			bullet.draw();
		}
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

	shoot(){
		if(this.shootingCooldown < 200){return;}

		this.shootingCooldown = 0;
		let bullet = new Bullet(this.x, this.y);

		bullet.setOnDestroy( ()=>{
			let index = this.bullets.indexOf(bullet);	
			this.bullets.splice(index,1);
		});
		this.bullets.push(bullet)

	}
  }


class Bullet{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	update(time){
		this.x += time *0.6;
		if(this.x > 800){
			this.onDestroy();
		}
	}

	draw(){
		
	  ctx.beginPath();
	  ctx.rect(this.x - 35, this.y - 12, 15, 15);
	  ctx.fillStyle = "Green"; 
	  ctx.fill();
	  ctx.stroke();
	}

	setOnDestroy(callBack){
		this.onDestroy = callBack;	
	}
}
