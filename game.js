let ctx; //thats context
let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let canvas

let fpsInterval = 1000 / 20; //denominator is fps
let now;
let then = Date.now();

let arrow = {
    x : 0,
    y : 0,
    width : 7,
    height : 16,
    xChange : 0,
    ychange : 0,
    frameX : 0,
    frameY : 0
}
let arrow_image = new Image();

let character = {
    x : 0,
    y : 0,
    width : 49,
    height : 49,
    xChange : 0,
    ychange : 0,
};

let sprite_size = 96;
let playerImage = new Image();
let light;

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

let background = [];
let backgroundImage = new Image();

document.addEventListener("DOMContentLoaded", startGame, false);

function startGame(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    character.x = 0;
    character.y = 0;
    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([{"var": playerImage, "url": "static/character.png"},
    {"var": backgroundImage, "url": "static/topdown.png"}, {"var": arrow_image, "url": "static/arrow.png"}], draw);
}

function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Move character based on movement flags
    move();

    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background if needed
    // ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw character
    ctx.drawImage(playerImage, character.frameX * character.width, character.frameY * character.height, character.width, character.height, character.x, character.y, character.width, character.height);
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    }else if (key === " "){
        attack()
    }

}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    }
}

function move() {
    let speed = 6; // Adjust this value as needed for the desired speed

    if (moveUp || moveDown || moveLeft || moveRight){
        if (moveUp && moveLeft) {
            character.y -= speed / Math.sqrt(2); // Move diagonally up-left
            character.x -= speed / Math.sqrt(2);
        } else if (moveUp && moveRight) {
            character.y -= speed / Math.sqrt(2); // Move diagonally up-right
            character.x += speed / Math.sqrt(2);
        } else if (moveDown && moveLeft) {
            character.y += speed / Math.sqrt(2); // Move diagonally down-left
            character.x -= speed / Math.sqrt(2);
        } else if (moveDown && moveRight) {
            character.y += speed / Math.sqrt(2); // Move diagonally down-right
            character.x += speed / Math.sqrt(2);
        } else if (moveUp) {
            character.frameY = 3;
            character.y -= speed;
        } else if (moveDown) {
            character.frameY = 0;
            character.y += speed;
        } else if (moveLeft) {
            character.frameY = 1;
            character.x -= speed;
        } else if (moveRight) {
            character.frameY = 2;
            character.x += speed;
        }
        character.frameX = (character.frameX + 1) % 4;
    }
    else{
        character.frameX = 0;
    }
}

function attack() {
    // Define arrow speed
    let arrowSpeed = 8;

    // Rotate and draw the arrow based on the character's facing direction
    if (character.frameY === 2) {
        // Character is facing right
        ctx.save(); // Save the current canvas state
        ctx.translate(character.x + character.width / 2, character.y + character.height);
        ctx.rotate(Math.PI / 2); // Rotate arrow 90 degrees clockwise
        ctx.drawImage(arrow_image, character.x + character.width, character.y + character.height / 2 - arrow.height / 2, arrow.width, arrow.height);
        ctx.restore(); // Restore the canvas state
    } else if (character.frameY === 0) {
        // Character is facing down
        ctx.save();
        // ctx.translate(character.x, character.y + character.height / 2);
        ctx.translate(character.x + character.width / 2, character.y + character.height);
        ctx.rotate(Math.PI); // Rotate arrow 180 degrees
        ctx.drawImage(arrow_image, -arrow.width, -arrow.height / 2, arrow.width, arrow.height);
        ctx.restore();
    } else if (character.frameY === 3) {
        // Character is facing up
        ctx.drawImage(arrow_image, character.x + character.width, character.y + character.height / 2 - arrow.height / 2, arrow.width, arrow.height);
    } else if (character.frameY === 1) {
        // Character is facing left
        ctx.save();
        ctx.translate(character.x, character.y + character.height / 2);
        ctx.rotate(-Math.PI / 2); // Rotate arrow 90 degrees counterclockwise
        ctx.drawImage(arrow_image, -arrow.height / 2, -arrow.width, arrow.width, arrow.height);
        ctx.restore();
    }

    // Move the arrow based on character's direction
    if (character.frameY === 0) {
        // Character is facing down
        arrow.y += arrowSpeed;
    } else if (character.frameY === 1) {
        // Character is facing left
        arrow.x -= arrowSpeed;
    } else if (character.frameY === 2) {
        // Character is facing right
        arrow.x += arrowSpeed;
    } else if (character.frameY === 3) {
        // Character is facing up
        arrow.y -= arrowSpeed;
    }

    // Handle arrow collision and other logic here
}


function load_assets(assets, callback){
    let num_assets = assets.length;
    let loaded = function(){
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0){
            callback();
        }
    };
    for (let asset of assets){
        let element = asset.var;
        if (element instanceof HTMLImageElement){
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement){
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url
    }
}