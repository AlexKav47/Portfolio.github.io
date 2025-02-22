
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
		ctx.lineTo(this.x + 45, this.y - 4);              
		ctx.lineTo(this.x + 15, this.y - 14);             
		ctx.lineTo(this.x - 10, this.y - 14);             
		ctx.lineTo(this.x - 25, this.y - 4);             
		ctx.lineTo(this.x - 30, this.y);                  
		ctx.lineTo(this.x - 25, this.y + 4);             
		ctx.lineTo(this.x - 10, this.y + 14);             
		ctx.lineTo(this.x + 15, this.y + 14);             
		ctx.lineTo(this.x + 45, this.y + 4);             
		ctx.closePath();
		
		ctx.fillStyle = "#000000";  
		ctx.fill();
		ctx.strokeStyle = "#006400";  
		ctx.lineWidth = 2;
		ctx.stroke();
		
		// Spaceship Window 
		ctx.beginPath();
		ctx.rect(this.x + 10, this.y - 6, 10, 4);
		ctx.fillStyle = "#000000";  
		ctx.fill();
		ctx.strokeStyle = "#006400";  
		ctx.stroke();
		
		// Spaceship Thrusters
		ctx.beginPath();
		ctx.rect(this.x - 38, this.y - 4, 4, 4);
		ctx.rect(this.x - 38, this.y + 4, 4, 4);
		ctx.fillStyle = "#000000";  
		ctx.fill();
		ctx.strokeStyle = "#006400";  
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

	draw() {
		ctx.save();
	
		ctx.beginPath();
	
		ctx.shadowColor = "rgba(255, 0, 0, 0.8)";
		ctx.shadowBlur = 15;
	
		ctx.fillStyle = "red";
	
		ctx.fillRect(this.x - 10, this.y - 2, 20, 4);
	
		ctx.restore();
	  }

	setOnDestroy(callBack){
		this.onDestroy = callBack;	
	}
}
