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
      }
      mapIndex++;
    }
  }
}

// here you draw the creature
export function drawEntity(ctx, creature) {
  let sprite = new Image();
  sprite.src = creature.spritePath;
  ctx.drawImage(
    sprite,
    creature.frameX * creature.width,
    creature.frameY * creature.height,
    creature.width,
    creature.height,
    creature.x - 12.5, //numbers are so it actually draws it on the x real x and y
    creature.y - 13,
    creature.width,
    creature.height
  );
}
