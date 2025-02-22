const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const player = new Player(ctx);

canvas.addEventListener('click', player.onClick);

let lastTime = 0;
function update(time){
	const deltaTime = time - lastTime;
	lastTime = time;
	player.update(deltaTime);
	window.requestAnimationFrame(update);
}


window.requestAnimationFrame((time)=>{
	update(time);
});
