class Asteroid{
	constructor(ctx){
		this.ctx = ctx;
		this.x = 820 + Math.random()*100;
		this.y = Math.random() * 800;
		this.radius = Math.min(Math.max(Math.random()*25,15),35);
		this.speed = Math.random() * 0.3;
		Math.min(Math.max(this.speed, 0.3), 0.6)
	}


	update(deltaTime){
		this.x -= deltaTime * this.speed;
		if(this.x < 0){
			this.destroy()
		}
	}

	draw() {
		const r = this.radius; 
		
		// Draw an irregular asteroid outline using lines
		ctx.beginPath();
		// Rightmost point
		ctx.moveTo(this.x + r, this.y);
		// Top right with a slight irregularity
		ctx.lineTo(this.x + 0.6 * r, this.y - 0.8 * r);
		// Top left with a slight twist
		ctx.lineTo(this.x - 0.4 * r, this.y - 0.9 * r);
		// Leftmost point
		ctx.lineTo(this.x - r, this.y);
		// Bottom left with a bulge
		ctx.lineTo(this.x - 0.5 * r, this.y + 0.9 * r);
		// Bottom right
		ctx.lineTo(this.x + 0.5 * r, this.y + 0.8 * r);
		ctx.closePath();
		
		// Fill and stroke the asteroid outline with grey tones
		ctx.fillStyle = "#808080";   
		ctx.fill();
		ctx.strokeStyle = "#4d4d4d"; 
		ctx.stroke();
		
		
		
		// Crater 1: near the top right
		ctx.beginPath();
		ctx.arc(this.x + 0.4 * r, this.y - 0.3 * r, 0.15 * r, 0, Math.PI * 2);
		ctx.fillStyle = "#696969";   
		ctx.fill();
		ctx.stroke();
		
		// Crater 2: near the bottom left
		ctx.beginPath();
		ctx.arc(this.x - 0.3 * r, this.y + 0.3 * r, 0.1 * r, 0, Math.PI * 2);
		ctx.fillStyle = "#696969";
		ctx.fill();
		ctx.stroke();
		
		// Crater 3: near the center left
		ctx.beginPath();
		ctx.arc(this.x - 0.2 * r, this.y, 0.12 * r, 0, Math.PI * 2);
		ctx.fillStyle = "#696969";
		ctx.fill();
		ctx.stroke();
	  }
	  
	

	onDestroy(callBack){
		this.onDestroyCallBack = callBack;
	}

	destroy(){
		this.onDestroyCallBack();
	}
}

class AsteroidSpawner{
	constructor(ctx, player){
		this.ctx = ctx;
		this.asteroids = [];
		this.spawnInitialAsteroids();	
		this.player = player;
	}

	spawnInitialAsteroids(){

		for(let i = 0; i<10;i++){
			this.spawnAsteroid();
		}
	}

	update(deltaTime){
		for(let i = 0; i<this.asteroids.length;i++){
			if(this.asteroids[i] != null){
				this.asteroids[i].update(deltaTime);
			}
		}
		this.checkForCollisions();
		this.checkForCollisionsWithBullet();
	}

	draw(){
		for(let i = 0; i<this.asteroids.length;i++){
			if(this.asteroids[i] != null){
				this.asteroids[i].draw();
			}
		}
	}

	checkForCollisions(){
		for(let i = 0; i<this.asteroids.length;i++){
			const asteroid = this.asteroids[i];

			const dx = player.x - asteroid.x;
			const dy = player.y - asteroid.y;
			const squaredDistance = dx * dx + dy * dy;

			const collisionDistance = 20+asteroid.radius;
			if (squaredDistance < collisionDistance * collisionDistance) {
				this.collisionCallback();
				score = 0;
			}
		}
	}

	checkForCollisionsWithBullet(){
		for(let i = 0; i<this.asteroids.length;i++){
			for(let j = 0; j<player.bullets.length;j++){
				const asteroid = this.asteroids[i];
				const bullet = player.bullets[j];
				if(asteroid == undefined || bullet == undefined){continue;}

				const dx = bullet.x - asteroid.x;
				const dy = bullet.y - asteroid.y;
				const squaredDistance = dx * dx + dy * dy;

				const collisionDistance = asteroid.radius;
				if (squaredDistance < collisionDistance * collisionDistance) {
					const bulletIndex = player.bullets.indexOf(bullet);
					player.bullets.splice(bulletIndex,1);
					const asteroidIndex = this.asteroids.indexOf(asteroid);
					this.asteroids.splice(asteroidIndex,1);
					this.spawnAsteroid();
					score += 1;
				}
			}
			
		}
	}

	spawnAsteroid(){
		const asteroid = new Asteroid();
		asteroid.onDestroy(()=>{
			const index= this.asteroids.indexOf(asteroid);
			this.asteroids.splice(index,1);
			this.spawnAsteroid();
		});
		this.asteroids.push(asteroid);
	}

	setOnCollisionCallback(callback){
		this.collisionCallback = callback;
	}


	restart(){
		this.asteroids = []
		this.spawnInitialAsteroids();
	}


}

