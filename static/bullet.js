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
    this.sprite;
  } // maybe make the arrow and the slime attack different things cuz some of the above are not needed for both

  resetArrow(spritePath, creature) {
    if (spritePath.includes("static/slime_attack.png")) {
      this.alive = true;
      this.height = 10;
      this.width = 10;
      this.x = creature.x;
      this.y = creature.y;
    } else {
      this.alive = false;
      this.xChange = 0;
      this.yChange = 0;
      this.height = 16;
      this.width = 7;
      this.x = 0;
      this.y = 0;
    }
  }

  //Ciganiq ? Gore dolu
  // bullet?.move(ctx)

  shoot(ctx, creature) {
    //draw bullet based on frame
    // Rotate and draw the this based on the creature's facing direction
    this.x = creature.x + creature.width / 6;
    this.y = creature.y + creature.height / 2.5;
    if (creature.frameY === 2) {
      // creature is facing right
      let temp = this.width;
      this.width = this.height; // 16
      this.height = temp; // 7
      this.frameX = 0;
      this.frameY = 0;
      this.sprite = this.spriteH;
      this.xChange = this.speed;
    } else if (creature.frameY === 0) {
      // creature is facing down
      this.frameX = 0;
      this.frameY = 0;
      this.sprite = this.spriteV;
      this.yChange = this.speed;
    } else if (creature.frameY === 3) {
      // creature is facing up
      this.frameX = 1;
      this.frameY = 0;
      this.sprite = this.spriteV;
      this.yChange = this.speed * -1;
    } else if (creature.frameY === 1) {
      // creature is facing left
      let temp = this.width;
      this.width = this.height;
      this.height = temp;
      this.frameX = 0;
      this.frameY = 1;
      this.sprite = this.spriteH;
      this.xChange = this.speed * -1;
    }

    ctx.drawImage(this.sprite, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    this.alive = true;
    this.arrayX = creature.arrayX;
    this.arrayY = creature.arrayY;
  }
  redrawBullet(ctx, mapArray, creature) {
    //move the bullet
    if (30 < this.x && this.x < 770 && 30 < this.y && this.y < 800) {
      let newArrayX = Math.max(1, Math.min(Math.floor((this.x + this.width / 2) / this.tileSize), 24));
      let newArrayY = Math.max(1, Math.min(Math.floor((this.y + this.height / 2) / this.tileSize), 24));
      if (!objectHitsWall(newArrayX, newArrayY, mapArray)) {
        // Update this position based on its speed
        this.x += this.xChange || 0;
        this.y += this.yChange || 0;
        ctx.drawImage(
          this.sprite,
          this.frameX * this.width,
          this.frameY * this.height,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
        this.arrayX = newArrayX;
        this.arrayY = newArrayY;
      } else {
        this.resetArrow(this.sprite.src, creature);
      }
    } else {
      this.resetArrow(this.sprite.src, creature);
    }
  }

  shootSlimeAttack(ctx, creature) {
    this.x = creature.x + creature.width / 6;
    this.y = creature.y + creature.height / 8;
    if (creature.frameY === 0) {
      // creature is facing right
      this.sprite = this.spriteH;
      this.xChange = this.speed;
    } else if (creature.frameY === 1) {
      // creature is facing left
      this.frameX = 0;
      this.frameY = 0;
      this.sprite = this.spriteV;
      this.xChange = this.speed * -1;
    }

    ctx.drawImage(this.sprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    this.alive = true;
    this.arrayX = creature.arrayX;
    this.arrayY = creature.arrayY;
  }
}
