
class Player{
	constructor(ctx){
		this.x = 50;
		this.y = 400;
		this.ctx = ctx;
		this.velocityY = 0;
	}

	update(deltaTime){
		this.draw();
		
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,50,0,Math.PI*2);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.stroke();
	}

	setPosition(pos){
		this.y = pos;
	}


}
