import { objectHitsWall } from "./collisions.js";

export class Bullet {
  constructor({ x, y, width, height, xChange, yChange, arrayX, arrayY, speed, spriteV, spriteH }, alive = false, tileSize, creature) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xChange = xChange;
    this.yChange = yChange;
    this.alive = alive;
    this.arrayX = arrayX;
    this.arrayY = arrayY;
    this.tileSize = tileSize;
    this.speed = speed; //10
    this.creature = creature;
    this.rotation = 0;
    this.spriteV = spriteV;
    this.spriteH = spriteH;
    this.frameX = 0;
    this.frameY = 0;
  }

  resetArrow() {
    this.alive = false;
    this.xChange = 0;
    this.yChange = 0;
    this.height = 16;
    this.width = 7;
    this.x = 0;
    this.y = 0;
  }

  //Ciganiq ? Gore dolu
  // bullet?.move(ctx)

  shoot(ctx, creature) {
    let sprite;
    //draw bullet based on frame
    // Rotate and draw the this based on the creature's facing direction
    if (creature.frameY === 2) {
      // creature is facing right
      let temp = this.width;
      this.width = this.height; // 16
      this.height = temp; // 7
      this.frameX = 0;
      this.frameY = 0;
      sprite = this.spriteH;
    } else if (creature.frameY === 0) {
      // creature is facing down
      this.frameX = 0;
      this.frameY = 0;
      sprite = this.spriteV;
    } else if (creature.frameY === 3) {
      // creature is facing up
      this.frameX = 1;
      this.frameY = 0;
      sprite = this.spriteV;
    } else if (creature.frameY === 1) {
      // creature is facing left
      let temp = this.width;
      this.width = this.height;
      this.height = temp;
      this.frameX = 0;
      this.frameY = 1;
      sprite = this.spriteH;
    }

    ctx.drawImage(
      sprite,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      creature.x + creature.width / 4,
      creature.y + creature.height / 2,
      this.width,
      this.height
    );
    this.alive = true;
    this.arrayX = creature.arrayX;
    this.arrayY = creature.arrayY;
  }

  redrawBullet(ctx, mapArray) {
    //move the bullet
    if (30 < this.x && this.x < 770 && 30 < this.y && this.y < 800 && !objectHitsWall(newArrayX, newArrayY, mapArray)) {
      newArrayX = Math.max(1, Math.min(Math.floor((this.x + this.width / 2) / this.tileSize), 24));
      newArrayY = Math.max(1, Math.min(Math.floor((this.y + this.height / 2) / this.tileSize), 24));
      // Update this position based on its speed
      this.x += this.xChange || 0;
      this.y += this.yChange || 0;

      ctx.drawImage(
        this.sprite,
        this.frameX * this.height, // figure this out
        this.frameY * this.width,
        this.width,
        this.height,
        creature.x + creature.width / 4,
        creature.y + creature.height / 2,
        this.width,
        this.height
      );
    }
  }
}
