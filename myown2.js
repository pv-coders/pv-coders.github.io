// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//Bacground Level Two
var bg2Ready =false;
var bgImage2 = new Image();
bgImage2.onload = function () {
	bg2Ready = true;
};
bgImage2.src = "images/bgLevel2.jpg";
var level2 = false;

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/spritezelda.png";

//Testing image
var characterImg = new Image();
var cReady = false;
characterImg.onload = function () {
	cReady = true;
};
characterImg.src = "images/char10.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Shanking Image
var shankReady = false;
var shankImage = new Image();
shankImage.onload = function () {
	shankReady = true;
}
shankImage.src = "images/monster.png";

//Health Bar


//Time for Leaving
var leavingObstacleReady = false;
var leavingObstacle = new Image();
leavingObstacle.onload = function () {
	leavingObstacleReady = true;
};
leavingObstacle.src = "images/blocks2.png";


var changeToMonster = false;
// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var leaveObject = {};

//Monster Objects
var monsterGuard1 = {};
var monsterGuard2 = {};
var monster = {};
var monster2 ={};
var monster3 = {};
var monster4 = {};
var monster5 = {};
var monster6 = {};
var monsterCrazy = {};

var livesLeft = 3;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var monsterMovement = 0;
var moveMonster = function () {
	if (monsterMovement >= 100) {
		clearInterval(setINTERVAL);
		monsterMovementBack = 0;
		setINTERVALBack = setInterval(moveMonsterBack, 10);
	} else {
		monster.x += 3;
		monster2.x -= 1;
		monster3.x -= 1.8;
		monster4.x += 0.8;
		monster5.x += 1;
		monster6.x -= 2.3;
		monsterMovement++;
	}


};

var monsterMovementBack = 0;
var moveMonsterBack = function () {
	if (monsterMovementBack >= 100){
		clearInterval(setINTERVALBack);
		monsterMovement = 0;
		setINTERVAL = setInterval(moveMonster, 10);
	} else {
		monster.x -= 3.3;
		monster2.x += 1.3;
		monster3.x += 1.5;
		monster4.x -= 0.5;
		monster5.x -= 1;
		monster6.x += 2.3;
		monsterMovementBack++;
	}

};

var howManyTele = 0;
var teleportMonster = function () {
	
	monsterCrazy.x = 32 + (Math.random() * (canvas.width - 64));
	monsterCrazy.y = 32 + (Math.random() * (canvas.width - 64));
	howManyTele++;
};
var setIntervalTele = setInterval(teleportMonster, 1500);

var setINTERVALBack;
// Reset the game when the player catches a monster
var setINTERVAL;
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	

	// Throw the monster somewhere on the screen randomly
	monsterGuard1.x = 200;
	monsterGuard1.y = 0;

	monsterGuard2.x = 280;
	monsterGuard2.y = 0;
	
	monster.x = 256; //32 + (Math.random() * (canvas.width - 64));
	monster.y = 25;//32 + (Math.random() * (canvas.height - 64));

	monster2.x =  245 //32 + (Math.random() * (canvas.width - 64));
	monster2.y = 50;//32 + (Math.random() * (canvas.height - 64));

	monster3.x =  32 + (Math.random() * (canvas.width - 64));
	monster3.y = 60;//32 + (Math.random() * (canvas.height - 64));

	monster4.x =  32 + (Math.random() * (canvas.width - 64));
	monster4.y = 100;//32 + (Math.random() * (canvas.height - 64));

	monster5.x =  32 + (Math.random() * (canvas.width - 64));
	monster5.y = 125;//32 + (Math.random() * (canvas.height - 64));

	monster6.x =  32 + (Math.random() * (canvas.width - 64));
	monster6.y = 175;//32 + (Math.random() * (canvas.height - 64));

	monsterCrazy.x = 32 + (Math.random() * (canvas.width - 64));
	monsterCrazy.y = 32 + (Math.random() * (canvas.width - 64));
	//Setting animation
	setINTERVAL = setInterval(moveMonster, 10);
	

};

//Check x and y of hero
function checkXY () {
	alert(hero.x);
	alert(hero.y);
}

//Change to shanking zelda
var changeToShank = false;
var shankZelda = function () {
	heroReady = true;
	changeToShank = false;
	render();
		

	
	
};

//Creating function for seeing if it touches
function checkT(heroObj, monsterObj) {
	if (
		(heroObj.x <= (monsterObj.x + 32)
		&& monsterObj.x <= (heroObj.x + 32)
		&& heroObj.y <= (monsterObj.y + 32)
		&& monsterObj.y <= (heroObj.y + 32)
		)) {
		
		if (changeToShank === true) {
			monsterObj.x = 0;
			monsterObj.y = -100;
		} else {
			location.reload(false);
		}

		
		
	}
	
}

function shanking() {
	checkT(hero, monster);
	checkT(hero, monster2);
	checkT(hero, monster3);
	checkT(hero, monster4);
	checkT(hero, monster5);
	checkT(hero, monster6);
	checkT(hero, monsterGuard1);
	checkT(hero, monsterGuard2);
	checkT(hero, monsterCrazy);
}
// Update game objects
var byDefault = true;
var update = function (modifier) {
	if (87 in keysDown) { // W
		hero.y -= hero.speed * modifier;
		render();
	}
	  if (83 in keysDown) { // S
		hero.y += hero.speed * modifier;
		render();
	}
	  if (65 in keysDown) { // A
		hero.x -= hero.speed * modifier;
		render();
	}
	  if (68 in keysDown) { // D
		hero.x += hero.speed * modifier;
		render();
	}

	// Are they touching?
	shanking();
	
	if ( ((hero.x >= 204) && (hero.x <= 280)) && (hero.y >= (-17) && (hero.y <= (2)) ) ) {
		alert("Congrats! You've passed Level One!");
		bgImage.src = "images/bgLevel2.jpg";
	}
};
//Checking space bar to shank
function checkKey(event) {
	var kCode = event.keyCode;
	if (kCode === 32) {
		changeToShank = true;
		heroReady = false;
		hero.y -= 2;
		render();
		
	}
	
}

// Draw everything
leaveObject.x = 226;
leaveObject.y = 0;
var render = function () {
	
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	} else if ((bg2Ready === true) && (level2 === true)) {
		ctx.drawImage(bgImage2, 0, 0);
	}

	if (leavingObstacleReady) {
		ctx.drawImage(leavingObstacle, 445, 315, 65, 23, leaveObject.x, leaveObject.y, 45, 45);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, 90, 1105, 32, 32, hero.x, hero.y, 45, 45);
	} else if (changeToShank) {
		ctx.drawImage(heroImage, 90, 1200, 45, 45, hero.x, hero.y, 60, 60);
		setTimeout(shankZelda, 300);
		//changeToShank = false;
		
	} 

	if (monsterReady) {
		ctx.drawImage(monsterImage, monsterGuard1.x, monsterGuard1.y);
		ctx.drawImage(monsterImage, monsterGuard2.x, monsterGuard2.y);
		ctx.drawImage(monsterImage, monster.x, monster.y);
		ctx.drawImage(monsterImage, monster2.x, monster2.y);
		ctx.drawImage(monsterImage, monster3.x, monster3.y);
		ctx.drawImage(monsterImage, monster4.x, monster4.y);
		ctx.drawImage(monsterImage, monster5.x, monster5.y);
		ctx.drawImage(monsterImage, monster6.x, monster6.y);
		ctx.drawImage(monsterImage, monsterCrazy.x, monsterCrazy.y);
	}
	if (cReady) {
		//ctx.drawImage(characterImg, 2, 0, 128, 128, 0, 0, 128, 128);
		
	}
	// Score
	/*ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Lives left: " + livesLeft, 32, 32);*/
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();