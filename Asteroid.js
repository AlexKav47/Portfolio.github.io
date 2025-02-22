class Asteroid{
	constructor(){
		this.x = 800;
		this.y = Math.random() * 800;
	}

	update(deltaTime){

		this.x -= deltaTime * 0.01;

	}
	
	onHit(){


	}
}
