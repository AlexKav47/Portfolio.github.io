class Asteroid{
	constructor(ctx){
		this.ctx = ctx;
		this.x = 850 + Math.random()*200;
		this.y = Math.random() * 800;
		this.speed = Math.random() * 0.01;
	}

	update(deltaTime){
		this.x -= deltaTime * 0.01;
		this.draw();
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
}

class AsteroidSpawner{
	constructor(ctx){
		this.ctx = ctx;
		this.asteroids = [];
		this.spawnInitialAsteroids();	
	}

	spawnInitialAsteroids(){

		for(let i = 0; i<5;i++){
			this.asteroids.push(new Asteroid());
		}
	}

	update(deltaTime){
		for(let i = 0; i<this.asteroids.length;i++){
			if(this.asteroids[i] != null){
				this.asteroids[i].update(deltaTime);
			}
		}
	}




}

