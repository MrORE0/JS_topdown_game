import { Bullet } from "./bullet.js";
import { Character, Entity } from "./entity.js";
import { drawBackground, drawEntity } from "./assets.js";

let ctx; //thats context
let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let canvas;

let fpsInterval = 1000 / 20; //denominator is fps
let now;
let then = Date.now();

let character = {
  x: 30,
  y: 70,
  width: 48,
  height: 48,
  frameX: 0,
  frameY: 0,
  arrayX: 1, // these are the x and y on the background array
  arrayY: 24,
  speed: 10,
  spritePath: "./static/character.png",
};
let newCharacter = new Character(character, true, 32);

let arrow = {
  x: 0,
  y: 0,
  width: 7,
  height: 16,
  xChange: 0,
  yChange: 0,
  arrayX: 0,
  arrayY: 0,
  speed: 10,
  spritePath: "static/arrow_sprite.png",
};
let newArrow = new Bullet(arrow, false, 32, character);

// idk if I need it
let sprite_size = 96;
const tileAtlasPath = "static/Dungeon_Tileset_at.png";

// boolean values for keeping track of movement
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

let mapArray = [
  [182, 186, 186, 117, 99, 117, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 118, 184, 185, 107],
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
  [246, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 251],
];

document.addEventListener("DOMContentLoaded", startGame, false);

function startGame() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;

  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  runGame();
}

function runGame() {
  window.requestAnimationFrame(runGame);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  // Move character based on movement flags
  newCharacter.move(moveUp, moveDown, moveLeft, moveRight, mapArray);

  // Clear the canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw the background and the walls
  drawBackground(ctx, tileAtlasPath, mapArray);

  // Draw character
  drawEntity(ctx, newCharacter);

  // if arrow was shot this will animate it(redraw it)
  if (newArrow.alive == true) {
    newArrow.redrawBullet(ctx, mapArray);
  }

  ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
  ctx.fillRect(newCharacter.x, newCharacter.y, 5, 5);

  //   ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
  //   ctx.fillRect(character.hitbox.x, character.hitbox.y, character.hitbox.width, character.hitbox.height);

  //   ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
  //   console.log("in draw function", arrow.hitbox.x);
  //   console.log("in draw function", arrow.hitbox.y);
  //   ctx.fillRect(arrow.hitbox.x, arrow.hitbox.y, arrow.hitbox.width, arrow.hitbox.height);
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
  if (key === " ") {
    if (newArrow.alive === false) {
      newArrow.shoot(ctx, character);
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
