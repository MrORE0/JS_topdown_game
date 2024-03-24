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
    yChange : 0,
    rotation : 0
}
let arrow_image = new Image();
let arrow_alive = false;

let character = {
    x : 0,
    y : 0,
    width : 49,
    height : 49,
    xChange : 0,
    yChange : 0,
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

    // Draw arrow if it's alive
    if (arrow_alive) {
        // Update arrow position based on its speed
        arrow.x += arrow.xChange || 0;
        arrow.y += arrow.yChange || 0;

        // Check for collision with canvas border
        if (checkCanvasCollision(arrow)) {
            // Handle collision with canvas border
            arrow_alive = false; // Set arrow_alive to false or handle as required
            arrow.xChange = 0;
            arrow.yChange = 0;
        } else {
            // Save the current canvas state
            ctx.save();

            // Translate to the arrow's position
            ctx.translate(arrow.x, arrow.y);

            // Rotate the canvas based on the arrow's rotation angle
            ctx.rotate(arrow.rotation);

            // Draw the arrow
            //arrow goes left
            if (arrow.xChange < 0 ){
                ctx.drawImage(arrow_image, -arrow.width * 2, -arrow.height / 2, arrow.width, arrow.height);
            }
            //arrow goes right
            else if (arrow.xChange > 0 ){
                ctx.drawImage(arrow_image, -arrow.width/80, -arrow.height*3, arrow.width, arrow.height);
            }
            //arrow goes down
            else if (arrow.yChange > 0 ){
                ctx.drawImage(arrow_image, -arrow.width, -arrow.height / 2, arrow.width, arrow.height);
            }
            //arrow goes up
            else{
                ctx.drawImage(arrow_image, -arrow.width / 20, -arrow.height / 2, arrow.width, arrow.height);
            }
            // Restore the canvas state
            ctx.restore();
        }
    }
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
    }
    if (key === " "){
        if (arrow_alive == false){
            attack()
        }
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
        let newX = character.x;
        let newY = character.y;

        if (moveUp) {
            newY = Math.max(character.y - speed, 0); // Ensure character doesn't move above the canvas
        } 
        if (moveDown) {
            newY = Math.min(character.y + speed, CANVAS_HEIGHT - (character.height + 10)); // Ensure character doesn't move below the canvas
        } 
        if (moveLeft) {
            newX = Math.max(character.x - speed, 0); // Ensure character doesn't move left of the canvas
        } 
        if (moveRight) {
            newX = Math.min(character.x + speed, CANVAS_WIDTH - character.width); // Ensure character doesn't move right of the canvas
        }

        // Update character position
        character.x = newX;
        character.y = newY;

        // Update character frame based on movement
        if (moveUp) {
            character.frameY = 3;
        } else if (moveDown) {
            character.frameY = 0;
        } else if (moveLeft) {
            character.frameY = 1;
        } else if (moveRight) {
            character.frameY = 2;
        }

        character.frameX = (character.frameX + 1) % 4;
    }
    else{
        character.frameX = 0;
    }
}

function attack() {
    // Define arrow speed
    let arrowSpeed = 10;
    // Rotate and draw the arrow based on the character's facing direction
    if (character.frameY === 2) {
        // Character is facing right
        ctx.save();
        ctx.translate(character.x + character.width / 2, character.y + character.height);
        ctx.rotate(Math.PI / 2); // Rotate arrow 90 degrees clockwise
        ctx.drawImage(arrow_image, -arrow.height*1.5, -arrow.width*4, arrow.width, arrow.height);
        ctx.restore();
        arrow.x = character.x + character.width / 2 - arrow.height*1.5;
        arrow.y = character.y + character.height - arrow.width*4;
        arrow.xChange = arrowSpeed;
        arrow.rotation = Math.PI / 2;
    } else if (character.frameY === 0) {
        // Character is facing down
        ctx.save();
        ctx.translate(character.x + character.width / 2, character.y + character.height);
        ctx.rotate(Math.PI);
        ctx.drawImage(arrow_image, -arrow.height / 5, -arrow.width*2, arrow.width, arrow.height);
        ctx.restore();
        arrow.x = character.x + character.width / 2 - arrow.height / 5;
        arrow.y = character.y + character.height - arrow.width*2;
        arrow.yChange = arrowSpeed;
        arrow.rotation = Math.PI;
    } else if (character.frameY === 3) {
       // Character is facing up
       ctx.drawImage(arrow_image, character.x + character.width / 2.4, character.y - arrow.height / 2, arrow.width, arrow.height);
       arrow.x = character.x + character.width / 2.4;
       arrow.y = character.y - arrow.height / 2;
       arrow.yChange = -arrowSpeed;
       arrow.rotation = 0
    } else if (character.frameY === 1) {
        // Character is facing left
        ctx.save();
        ctx.translate(character.x, character.y + character.height / 2);
        ctx.rotate(-Math.PI / 2); 
        ctx.drawImage(arrow_image, -arrow.height / 2, -arrow.width, arrow.width, arrow.height);
        ctx.restore();
        arrow.x = character.x - arrow.height / 2;
        arrow.y = character.y + character.height / 2 - arrow.width;
        arrow.xChange = -arrowSpeed;
        arrow.rotation = -Math.PI / 2;
    }
    arrow_alive = true;
}

function collision(object1, object2) {
    // Calculate the boundaries of object1
    let object1Left = object1.x;
    let object1Right = object1.x + object1.width;
    let object1Top = object1.y;
    let object1Bottom = object1.y + object1.height;

    // Calculate the boundaries of object2
    let object2Left = object2.x;
    let object2Right = object2.x + object2.width;
    let object2Top = object2.y;
    let object2Bottom = object2.y + object2.height;

    // Check for intersection
    if (object1Right > object2Left && 
        object1Left < object2Right && 
        object1Bottom > object2Top && 
        object1Top < object2Bottom) {
        return true; // Collided
    } else {
        return false; // Not collided
    }
}

function checkCanvasCollision(object) {
    //checking all the walls for collision, if one is true, returns true and otherwise false
    return (
        object.x < 0 || // Left border
        object.x + object.width > CANVAS_WIDTH || // Right border
        object.y < 0 || // Top border
        object.y + object.height > CANVAS_HEIGHT // Bottom border
    );
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