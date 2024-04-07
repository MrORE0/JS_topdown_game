let ctx; //thats context
let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let canvas

let fpsInterval = 1000 / 5; //denominator is fps
let now;
let then = Date.now();

let arrow = {
    x : 0,
    y : 0,
    width : 7,
    height : 16,
    xChange : 0,
    yChange : 0,
    rotation : 0,
    arrayX: 0,
    arrayY: 0
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
    arrayX: 1, // these are the x and y on the background array
    arrayY: 24
};

let sprite_size = 96;
let playerImage = new Image();
let light;

// boolean values for keeping track of movement
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// learning to make the tilemap 
// https://medium.com/geekculture/make-your-own-tile-map-with-vanilla-javascript-a627de67b7d9
let background = [];
let backgroundImage = new Image();
let tileSize = 32;
let tileOutputSize = 1;
let updatedTileSize = tileSize * tileOutputSize;
let tileAtlas = new Image();
tileAtlas.src = "static/Dungeon_Tileset_at.png";

// atlas is the tileset is used to make the map
let atlasCol = 16;
let atlasRow = 16;
let mapCols = 25;
let mapRows = 25;
let mapHeight = mapRows * tileSize;
let mapWidth = mapCols * tileSize;
let mapArray = [[182, 186, 186, 117, 99, 117, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 118, 184, 185, 107],
   [198, 153, 153, 153, 153, 143, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 203],
    [198, 153, 104, 104, 103, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 231, 153, 203],
    [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 203],
    [198, 153, 105, 153, 105, 104, 104, 104, 104, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 203],
    [198, 153, 105, 153, 105, 148, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 104, 104, 104, 104, 105, 104, 104, 153, 203],
    [198, 153, 105, 153, 105, 104, 104, 104, 104, 104, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 203],
    [198, 153, 105, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 153, 104, 104, 104, 104, 104, 153, 153, 153, 105, 127, 203],
    [198, 153, 105, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 203],
    [198, 153, 105, 153, 105, 104, 104, 104, 103, 104, 104, 104, 104, 104, 104, 104, 103, 104, 104, 104, 104, 104, 105, 153, 203],
    [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
    [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
    [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
    [198, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
    [198, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
    [198, 153, 153, 104, 104, 104, 104, 153, 104, 104, 104, 103, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 203],
    [198, 153, 153, 105, 126, 153, 105, 153, 153, 153, 153, 153, 153, 105, 210, 104, 104, 104, 104, 104, 104, 104, 104, 104, 203],
    [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 143, 153, 153, 153, 153, 153, 153, 203],
    [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 104, 103, 104, 104, 104, 203],
    [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
    [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
    [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
    [198, 153, 231, 105, 153, 153, 105, 153, 148, 104, 104, 104, 104, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
    [198, 211, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 143, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 203],
    [246, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 251]]


document.addEventListener("DOMContentLoaded", startGame, false);

function startGame(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    character.x = 30;
    character.y = 700;
    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([{"var": playerImage, "url": "static/character.png"},
    {"var": backgroundImage, "url": "static/Dungeon_Tileset_at.png"}, {"var": arrow_image, "url": "static/arrow.png"}], draw);
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

    // Draw the background and the walls
    drawBackground();

    // Draw character
    ctx.drawImage(playerImage, character.frameX * character.width, character.frameY * character.height, character.width, character.height, character.x, character.y, character.width, character.height);

    // if arrow was shot this will animate it(redraw it)
    if (arrow_alive){
        reDrawingArrow();
    }

    // checking where the x and y of the arrow are
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x, character.y, 5, 5);

    ctx.fillStyle = 'blue';
    ctx.fillRect(arrow.x, arrow.y, 5, 5);
    
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
    let speed = 8; // Adjust this value as needed for the desired speed

    if (moveUp || moveDown || moveLeft || moveRight) {
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

        // Character's x and y position to array indices (1 to 24) so we can check for wall or item collision
        if (moveLeft || moveDown) {
            // Subtract 1 from the calculated array index to collide with walls before being on top of them
            character.arrayX = Math.max(0, Math.min(Math.floor((newX + character.width / 4) / tileSize), 24));  // divide by 4 instead of 2 so it doesn't go on to of a wall
            character.arrayY = Math.max(1, Math.min(Math.floor((newY + character.height) / tileSize), 24));
        } else {
            character.arrayX = Math.max(1, Math.min(Math.floor(newX / tileSize) + 1, 24)); 
            character.arrayY = Math.max(1, Math.min(Math.floor(newY / tileSize) + 1, 24));
        }

        // Checking for arrayX or arrayY for colliding with walls
        if (objectHitsWall(character.arrayX, character.arrayY)) {
            return;
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
    } else {
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
        ctx.translate(character.x + character.width, character.y + character.height/2);
        arrow.rotation = Math.PI / 2;
        ctx.rotate(arrow.rotation); // Rotate arrow 90 degrees clockwise

        // switching values according to the orientation
        let temp = arrow.height;
        arrow.height = arrow.width; // 7
        arrow.width = temp; // 16
        ctx.drawImage(arrow_image, 0, 0, arrow.height, arrow.width); // its 0 and 0 due to the translation above
        ctx.restore();
        // setting new x and y for the arrow
        arrow.x = character.x + character.width; // on the pointy of the arrow
        arrow.y = character.y + character.height/2;
        arrow.xChange = arrowSpeed;
    } else if (character.frameY === 0) {
        // Character is facing down
        ctx.save();
        ctx.translate(character.x + character.width / 2, character.y + character.height);
        ctx.rotate(Math.PI);
        ctx.drawImage(arrow_image, -arrow.height / 5, -arrow.width * 2, arrow.width, arrow.height);
        ctx.restore();
        arrow.x = character.x + character.width / 2 - arrow.height / 5;
        arrow.y = character.y + character.height - arrow.width * 2;
        arrow.yChange = arrowSpeed;
        arrow.rotation = Math.PI;
    } else if (character.frameY === 3) {
       // Character is facing up
       ctx.drawImage(arrow_image, character.x + character.width / 2.4, character.y - arrow.height / 2, arrow.width, arrow.height);
       arrow.x = character.x + character.width / 2.4;
       arrow.y = character.y - arrow.height / 2;
       arrow.yChange = -arrowSpeed;
       arrow.rotation = 0;
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

    ctx.fillStyle = 'blue';
    ctx.fillRect(arrow.x, arrow.y, 5, 5);

    // Set array x and y for the arrow based on its starting position
    arrow.arrayX = character.arrayX;
    arrow.arrayY = character.arrayY;
}

function reDrawingArrow() {
    console.log("character X"+character.arrayX);
    console.log("character Y"+character.arrayY);
    console.log("arrow X"+arrow.arrayX);
    console.log("arrow Y"+arrow.arrayY);
    
    // Define the new array indices based on the arrow's direction of movement
    let newArrayX = arrow.arrayX;
    let newArrayY = arrow.arrayY;
    
    newArrayX = Math.max(1, Math.min(Math.floor((arrow.x + arrow.width / 2) / tileSize), 24)); 
    newArrayY = Math.max(1, Math.min(Math.floor((arrow.y + arrow.height / 2) / tileSize), 24));

    if (!objectHitsWall(newArrayX, newArrayY)) {
        // Update arrow position based on its speed
        arrow.x += arrow.xChange || 0;
        arrow.y += arrow.yChange || 0;

        // Save the current canvas state
        ctx.save();

        // Translate to the arrow's position
        ctx.translate(arrow.x, arrow.y);

        // Rotate the canvas based on the arrow's rotation angle
        ctx.rotate(arrow.rotation);

        // Draw the arrow based on its direction of movement
        if (arrow.xChange < 0) { // Arrow goes left
            ctx.drawImage(arrow_image, -arrow.width * 2, -arrow.height / 2, arrow.width, arrow.height);
        } else if (arrow.xChange > 0) { // Arrow goes right
            ctx.drawImage(arrow_image, arrow.x, arrow.y, arrow.width, arrow.height);
        } else if (arrow.yChange < 0) { // Arrow goes up
            ctx.drawImage(arrow_image, -arrow.width / 20, -arrow.height / 2, arrow.width, arrow.height);
        } else { // Arrow goes down
            ctx.drawImage(arrow_image, -arrow.width, -arrow.height / 2, arrow.width, arrow.height);
        }

        // Restore the canvas state
        ctx.restore();
        
        // Update the arrow's array indices
        arrow.arrayX = newArrayX;
        arrow.arrayY = newArrayY;
    } else {
        arrow_alive = false;
        arrow.xChange = 0;
        arrow.yChange = 0;
    }
}

function objectHitsWall(arrayX, arrayY){
    let walls = [198, 105, 104, 107, 182, 203, 252, 298, 246, 247, 186, 103]
    if (walls.includes(mapArray[arrayY][arrayX])){
        return true;                    
    }
    else{
        return false;
    }
}

function checkCollisionWithObjects(object1, object2) {
    // Implement collision detection logic with objects (walls, enemies, items)
    // Return true if collision detected, otherwise return false
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

function drawBackground(){
    // used for drawing the map 
    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;
    // Draw background
    for (let row = 0; row < mapArray.length; row++) {
        for (let col = 0; col < mapArray[row].length; col++) {
            let tileVal = mapArray[row][col];
            if (tileVal !== 0) {
                tileVal -= 1;
                sourceY = Math.floor(tileVal / atlasCol) * tileSize;
                sourceX = (tileVal % atlasCol) * tileSize;
                ctx.save(); // Save the current canvas state
                if (tileVal === 105) {
                    // Adjust translation to center of the tile
                    ctx.translate((col + 0.5) * updatedTileSize, (row + 0.5) * updatedTileSize);
                    // Apply rotation of 180 degrees if tile value matches 105
                    ctx.rotate(Math.PI); // Rotate by 180 degrees
                    // Adjust the position back after rotation
                    ctx.translate(-updatedTileSize / 2, -updatedTileSize / 2);
                }
                ctx.drawImage(
                    tileAtlas,
                    sourceX,
                    sourceY,
                    tileSize,
                    tileSize,
                    col * updatedTileSize,
                    row * updatedTileSize,
                    updatedTileSize,
                    updatedTileSize
                );
                ctx.restore(); // Restore the canvas state
            }
            mapIndex++;
        }
    }
}