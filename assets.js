export function load_assets(assets, callback) {
  let num_assets = assets.length;
  let loaded = function () {
    console.log("loaded");
    num_assets = num_assets - 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      console.log("img");
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      console.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}

export function drawBackground(ctx, tileAtlasPath, mapArray) {
  const tileAtlas = new Image();
  tileAtlas.src = tileAtlasPath;
  // learning to make the tilemap
  // https://medium.com/geekculture/make-your-own-tile-map-with-vanilla-javascript-a627de67b7d9

  // atlas is the tileset is used to make the map
  let tileSize = 32;
  let atlasCol = 16;
  let atlasRow = 16; // not used
  let mapCols = 25;
  let mapRows = 25;
  let mapHeight = mapRows * tileSize; // not used
  let mapWidth = mapCols * tileSize; // not used

  // used for drawing the map
  let tileOutputSize = 1;
  let updatedTileSize = tileSize * tileOutputSize;
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

// here you draw the creature
export function drawCreature(ctx, creature) {
  let sprite = new Image();
  sprite.src = creature.spritePath;
  ctx.drawImage(
    sprite,
    creature.frameX * creature.width,
    creature.frameY * creature.height,
    creature.width,
    creature.height,
    creature.x,
    creature.y,
    creature.width,
    creature.height
  );
}
