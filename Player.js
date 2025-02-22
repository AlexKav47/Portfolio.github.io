
class Player{
	constructor(ctx){
		this.x = 55;
		this.y = 400;
		this.ctx = ctx;
		this.velocityY = 0;
	}

	update(deltaTime){
		this.draw();
		
	}

	draw(){
		ctx.beginPath();
		ctx.rect(this.x - 40, this.y - 40, 80, 80);
		ctx.fillStyle = "purple";
		ctx.fill();
		ctx.stroke();
	}

	setPosition(pos){
		this.y = pos;
	}


}
