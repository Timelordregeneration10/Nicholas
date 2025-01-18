
const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

// 生成随机数的函数

function random(min, max) {
	const num = Math.floor(Math.random() * (max - min)) + min;
	if (num == 0) {
		return random(min, max);
	}
	return num;
}

function randomColor() {
	return (
		"rgb(" +
		random(150, 255) +
		", " +
		random(150, 255) +
		", " +
		random(150, 255) +
		")"
	);
}

function Rem(img, x, y, velX, velY, color, size) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size
}

Rem.prototype.draw = function () {
	this.img.style.transform = `translate(${this.x}px, ${this.y}px)`;//里面绝对不能加分号
	// this.img.style.left = `${this.x}px`;
	// this.img.style.top = `${this.y}px`;
	this.img.style.backgroundColor = this.color;
	this.img.style.width = `${this.size}px`;
}

Rem.prototype.update = function () {
	if (this.x + this.size >= width) {
		this.velX = -this.velX;
	}

	if (this.x <= 0) {
		this.velX = -this.velX;
	}

	if (this.y + this.size >= height) {
		this.velY = -this.velY;
	}

	if (this.y <= 0) {
		this.velY = -this.velY;
	}

	this.x += this.velX;
	this.y += this.velY;
	// this.x += random(-7,7);
	// this.y += random(-7,7);
};

Rem.prototype.collisionDetect = function () {
	for (let j = 0; j < Rems.length; j++) {
		if (this !== Rems[j]) {
			const dx = this.x - Rems[j].x;
			const dy = this.y - Rems[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size / 1.414 + Rems[j].size / 1.414) {
				Rems[j].color = this.color = randomColor();
			}
		}
	}
};

let Rems = [];

while (Rems.length < 25) {
	let size = random(30, 50);
	let newimg = document.createElement("img");
	newimg.src = "./image/winkRem.gif";
	newimg.style.position = "absolute";
	// 加上下面这句打开新世界
	// newimg.style.transition = "all 0.5s";
	let rem = new Rem(
		newimg,
		random(0, width - size),
		random(0, height - size),
		random(-7, 7),
		random(-7, 7),
		randomColor(),
		size,
	);
	Rems.push(rem);
	document.getElementsByClassName("RemArea")[0].appendChild(newimg);
}

document.getElementById("rest").innerHTML = Rems.length;


function RemCatcher(img, x, y, velX, velY, size) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.size = size;
}

RemCatcher.prototype.draw = function () {
	this.img.style.transform = `translate(${this.x}px, ${this.y}px)`;
	this.img.style.width = `${this.size}px`;
}

RemCatcher.prototype.setControl = function () {
	window.onkeydown = (e) => {
		switch (e.key) {
			case "a":
			case "A":
			case "ArrowLeft":
				if (this.x - this.velX >= 0) {
					this.x -= this.velX;
				}
				break;
			case "d":
			case "D":
			case "ArrowRight":
				if (this.x + this.velX <= width - this.size) {
					this.x += this.velX;
				}
				break;
			case "w":
			case "W":
			case "ArrowUp":
				if (this.y - this.velY >= 0) {
					this.y -= this.velY;
				}
				break;
			case "s":
			case "S":
			case "ArrowDown":
				if (this.y + this.velY <= height - this.size) {
					this.y += this.velY;
				}
				break;
		}
	};
}

RemCatcher.prototype.collisionDetect = function () {
	for (let j = 0; j < Rems.length; j++) {
		const dx = this.x - Rems[j].x;
		const dy = this.y - Rems[j].y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < this.size / 1.414 + Rems[j].size / 1.414) {
			// Rems[j].img.style.display = "none";
			Rems[j].img.remove();
			Rems.splice(j, 1);
			document.getElementById("rest").innerHTML = Rems.length;
		}
	}
}


let RemCatchersize = 50;
let RemCatchernewimg = document.createElement("img");
RemCatchernewimg.src = "./image/winkRem.gif";
RemCatchernewimg.style.position = "absolute";
let remCatcher = new RemCatcher(
	RemCatchernewimg,
	(width - RemCatchersize) / 2,
	(height - RemCatchersize) / 2,
	20,
	20,
	RemCatchersize,
);
remCatcher.setControl();
document.getElementsByClassName("RemArea")[0].appendChild(RemCatchernewimg);


let sdate = new Date();
let sdays = sdate.getDay();
let shours = sdate.getHours();
let sminutes = sdate.getMinutes();
let sseconds = sdate.getSeconds();

function timer() {
	if (Rems.length == 0) {
		setTimeout(() => {
			alert(`耗时：${document.getElementById("timer").innerHTML}`);
		}, 100);
		return;
	}
	let cdate = new Date();
	let cdays = cdate.getDay();
	let chours = cdate.getHours();
	let cminutes = cdate.getMinutes();
	let cseconds = cdate.getSeconds();
	let cmilliseconds = cdate.getMilliseconds();
	let days = cdays - sdays;
	let hours = chours - shours;
	let minutes = cminutes - sminutes;
	let seconds = cseconds - sseconds;
	let milliseconds = cmilliseconds;
	document.getElementById("timer").innerHTML = String(((days * 24 + hours) * 60 + minutes) * 60 + seconds) + "." + String(milliseconds) + "s";
}

function loop() {

	for (let i = 0; i < Rems.length; i++) {
		Rems[i].update();
		Rems[i].draw();
		Rems[i].collisionDetect();
	}

	remCatcher.draw();
	remCatcher.collisionDetect();

	timer();
	if (Rems.length == 0) {
		return;
	}
	requestAnimationFrame(loop);
}

loop();
