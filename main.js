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

const spawner = new AsteroidSpawner();

let lastTime = 0;
function update(time){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const deltaTime = time - lastTime;
	lastTime = time;
	player.update(deltaTime);
	spawner.update(deltaTime);
	window.requestAnimationFrame(update);
}


window.requestAnimationFrame((time)=>{
	update(time);
});
