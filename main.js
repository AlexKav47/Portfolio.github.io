const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const player = new Player(ctx);
const rect = canvas.getBoundingClientRect();
const scaleX = canvas.width/rect.width;
const scaleY = canvas.height/rect.height;

canvas.addEventListener('mousemove', (event)=>{
	const mouseX = (event.clientX - rect.left) * scaleX;
	const mouseY = (event.clientY - rect.top) * scaleY;

	player.setPosition(mouseY);
});


const spawner = new AsteroidSpawner(ctx,player);

let lastTime = 0;
var gameState = "start";
canvas.addEventListener("click", (event)=>{
	if(gameState === "start"){
		gameState = "gameLoop";
	}

});

function startScreen(time){
	ctx.strokeStyle = "red";  
	ctx.lineWidth = 2;  
	ctx.font = "50px serif";
	ctx.strokeText("Click the screen to start", canvas.width / 2 -200, canvas.height / 2, 400);
}

function gameLoopScreen(time){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const deltaTime = time - lastTime;
	lastTime = time;
	player.update(deltaTime);
	spawner.update(deltaTime);
	spawner.draw();
}

function gameOverScreen(time){

}


function update(time){
	if(gameState == "start"){
		startScreen(time);
	}
	else if(gameState == "gameLoop"){
		gameLoopScreen(time);
	}
	window.requestAnimationFrame(update);
}
window.requestAnimationFrame((time)=>{
	update(time);
});
