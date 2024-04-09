import { objectHitsWall } from "./collisions.js";

export class Bullet {
  constructor({ x, y, width, height, xChange, yChange, arrayX, arrayY, speed, spritePath }, alive = false, tileSize, creature) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xChange = xChange;
    this.yChange = yChange;
    this.alive = alive;
    this.arrayX = arrayX;
    this.arrayY = arrayY;
    this.spritePath = spritePath;
    this.tileSize = tileSize;
    this.speed = speed; //10
    this.creature = creature;
    this.rotation = 0;
    this.sprite = new Image();
    this.sprite.src = this.spritePath;
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
    //draw bullet based on frame
    // Rotate and draw the this based on the creature's facing direction
    if (creature.frameY === 2) {
      // creature is facing right
      let temp = this.width;
      this.width = this.height; // 16
      this.height = temp; // 7
    } else if (creature.frameY === 0) {
      // creature is facing down
    } else if (creature.frameY === 3) {
      // creature is facing up
    } else if (creature.frameY === 1) {
      // creature is facing left
      let temp = this.width;
      this.width = this.height;
      this.height = temp;
    }

    ctx.drawImage(this.sprite, creature.x, creature.y);
    console.log(ctx);
    // Draw the bullet
    // ctx.drawImage(
    //   sprite,
    //   creature.frameX * this.width,
    //   creature.frameY * this.height,
    //   this.width,
    //   this.height,
    //   creature.x,
    //   creature.y,
    //   this.width,
    //   this.height
    // );
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

      // if (this.xChange > 0) {
      //   // goes right
      // } else if (this.yChange > 0) {
      //   // goes down
      // } else if (this.yChange < 0) {
      //   // goes up
      // } else if (this.xChange < 0) {
      //   // goes left
      // }

      // ctx.drawImage(
      //   this.sprite,
      //   this.creature.frameX * this.width,
      //   this.creature.frameY * this.height,
      //   this.width,
      //   this.height,
      //   this.x,
      //   this.y,
      //   this.width,
      //   this.height
      // );
    }
  }
}
