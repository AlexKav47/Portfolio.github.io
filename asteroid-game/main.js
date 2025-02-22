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
let gameState = "start";
let score = 0;

spawner.setOnCollisionCallback(()=>{
	gameState = "gameOver";
})
canvas.addEventListener("click", (event)=>{
	if(gameState ==="gameLoop"){
		player.shoot();
	}
	else if(gameState === "start"){
		gameState = "gameLoop";
	}
	else if(gameState ==="gameOver"){
		gameState = "gameLoop";
		spawner.restart();
	}

});

function startScreen(){
	ctx.strokeStyle = "green";  
	ctx.lineWidth = 2;  
	ctx.font = "50px serif";
	ctx.strokeText("Click the screen to start", canvas.width / 2 -200, canvas.height / 2, 400);
}


function gameLoopScreen(time){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = "green";  
	ctx.lineWidth = 2;  
	ctx.font = "35px serif";
	ctx.strokeText(`Score : ${score}`, canvas.width/2 -50, 30, 200);

	const deltaTime = time - lastTime;
	lastTime = time;
	player.update(deltaTime);
	spawner.update(deltaTime);
	spawner.draw();
}

function gameOverScreen(){
	ctx.strokeStyle = "green";  
	ctx.lineWidth = 2;  
	ctx.font = "50px serif";
	ctx.strokeText("Game Over Try Again", canvas.width / 2 -200, canvas.height / 2, 400);
}


function update(time){
	if(gameState == "start"){
		startScreen();
	}
	else if(gameState == "gameLoop"){
		gameLoopScreen(time);
	}
	else{
		gameOverScreen();
	}
	window.requestAnimationFrame(update);
}
window.requestAnimationFrame((time)=>{
	update(time);
});
