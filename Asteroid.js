class Asteroid{
	constructor(ctx){
		this.ctx = ctx;
		this.x = 820 + Math.random()*100;
		this.y = Math.random() * 800;
		this.radius = 30;
		this.speed = Math.random() * 0.1;
		Math.min(Math.max(this.speed, 0.2), 0.3)
	}


	update(deltaTime){
		this.x -= deltaTime * this.speed;
		if(this.x < 0){
			this.destroy()
		}
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,30,0,Math.PI*2);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.stroke();
	}
	
	onHit(){
		

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

		for(let i = 0; i<5;i++){
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
	}

	draw(){
		for(let i = 0; i<this.asteroids.length;i++){
			if(this.asteroids[i] != null){
				this.asteroids[i].draw();
			}
		}
	}

	checkForCollisions(){
		const playerSquaredPos = (this.player.x*this.player.x) + (this.player.y * this.player.y)
		for(let i = 0; i<this.asteroids.length;i++){
			const asteroid = this.asteroids[i];

			const dx = player.x - asteroid.x;
			const dy = player.y - asteroid.y;
			const squaredDistance = dx * dx + dy * dy;

			const collisionDistance = 50;
			if (squaredDistance < collisionDistance * collisionDistance) {
				console.log("collision");
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




}

