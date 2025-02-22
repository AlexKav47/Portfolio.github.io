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

	draw(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fillStyle = "red";
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

