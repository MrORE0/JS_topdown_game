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
  }

  isInWall(mapArray) {
    let walls = [198, 105, 104, 107, 182, 203, 252, 298, 246, 247, 186, 103];
    if (walls.includes(mapArray[this.arrayY][this.arrayX])) {
      return true;
    } else {
      return false;
    }
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
      this.width = this.height;
      this.height = temp;
      this.orientation = "right";
    } else if (creature.frameY === 0) {
      // creature is facing down
      this.orientation = "down";
    } else if (creature.frameY === 3) {
      // creature is facing up
      this.orientation = "up";
    } else if (creature.frameY === 1) {
      // creature is facing left
      let temp = this.width;
      this.width = this.height;
      this.height = temp;
      this.orientation = "left";
    }

    let sprite = new Image();
    sprite.src = this.spritePath;
    console.log(this.spritePath);
    // Draw the bullet
    ctx.drawImage(
      sprite,
      creature.frameX * this.width,
      creature.frameY * this.height,
      this.width,
      this.height,
      creature.x,
      creature.y,
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

      // if (this.xChange > 0) {
      //   // goes right
      // } else if (this.yChange > 0) {
      //   // goes down
      // } else if (this.yChange < 0) {
      //   // goes up
      // } else if (this.xChange < 0) {
      //   // goes left
      // }

      ctx.drawImage(
        this.sprite,
        this.creature.frameX * this.width,
        this.creature.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  orientBullet(ctx, creature) {
    if (creature.frameY === 2) {
      // facing right
      this.rotation = Math.PI / 2;
      // setting new x and y for the bullet
      this.x = creature.x + creature.width; // on the pointy of the this
      this.y = creature.y + creature.height / 2;
      this.xChange = this.speed;
    } else if (creature.frameY === 0) {
      // creature is facing down
      this.rotation = Math.PI;
      // setting new x and y for the bullet
      this.x = creature.x + creature.width / 2.4; // division by 2.4 because this actually is the center
      this.yChange = this.speed;
    } else if (creature.frameY === 3) {
      // creature is facing up
      this.rotation = 0;
      // setting new x and y for the bullet
      this.x = creature.x + creature.width / 2.4; // division by 2.4 because this actually is the center
      this.y = creature.y;
      this.yChange = -this.speed;
    } else if (creature.frameY === 1) {
      // creature is facing left
      this.rotation = -Math.PI / 2;
      //setting new x and y for the bullet
      this.x = creature.x - this.height / 2;
      this.y = creature.y + creature.height / 2;
      this.xChange = -this.speed;
    }
    ctx.drawImage;
  }
}
