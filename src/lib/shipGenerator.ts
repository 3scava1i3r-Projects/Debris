
export type SpriteMatrix = number[][];

const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateShip = (): SpriteMatrix => {
  const matrix: SpriteMatrix = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
  
  const midX = Math.floor(GRID_WIDTH / 2); // For 16, this is 8. Center is between 7 and 8.
  
  // Create the core body with more variation
  const bodyLength = randomInt(8, GRID_HEIGHT - 4);
  const startY = Math.floor((GRID_HEIGHT - bodyLength) / 2);
  let currentWidth = randomInt(1, 2);
  
  const bodyWidths: number[] = [];

  for (let y = startY; y < startY + bodyLength; y++) {
    // Higher chance to change width for more dynamic shapes
    if (Math.random() < 0.45) { 
      currentWidth += randomInt(-1, 1);
      currentWidth = Math.max(1, Math.min(4, currentWidth)); // Limit max width
    }
    bodyWidths.push(currentWidth);

    for (let i = 0; i < currentWidth; i++) {
        const leftX = midX - 1 - i;
        const rightX = midX + i;
        if (leftX >= 0) matrix[y][leftX] = 1;
        if (rightX < GRID_WIDTH) matrix[y][rightX] = 1;
    }
  }

  // Add wings with more variety
  const wingChance = 0.75;
  if (Math.random() < wingChance && bodyLength > 5) {
    const wingYStart = startY + randomInt(2, Math.floor(bodyLength / 2));
    const wingThickness = randomInt(1, 3);
    const wingYEnd = wingYStart + wingThickness;
    const wingLength = randomInt(2, midX - 2);
    const wingType = randomInt(1, 3); // 1: straight, 2: swept-back, 3: forward-swept

    for (let y = wingYStart; y < wingYEnd; y++) {
        const bodyIndex = y - startY;
        const bodyWidth = bodyIndex >= 0 && bodyIndex < bodyWidths.length ? bodyWidths[bodyIndex] : 1;

        for (let i = 0; i < wingLength; i++) {
            let yPos = y;
            if (wingType === 2) yPos += Math.floor(i / 2); // Swept-back
            else if (wingType === 3) yPos -= Math.floor(i / 2); // Forward-swept

            if (yPos >= 0 && yPos < GRID_HEIGHT) {
                const leftX = midX - 1 - bodyWidth - i;
                const rightX = midX + bodyWidth + i;
                if (leftX >= 0) matrix[yPos][leftX] = 1;
                if (rightX < GRID_WIDTH) matrix[yPos][rightX] = 1;
            }
        }
    }
  }

  // Add cockpit
  const cockpitY = startY + randomInt(0, 1);
  if (matrix[cockpitY]) {
      matrix[cockpitY][midX - 1] = 2;
      matrix[cockpitY][midX] = 2;
  }

  // Add engine thrusters
  const thrusterY = startY + bodyLength;
  if (thrusterY < GRID_HEIGHT) {
      const lastBodyRowIndex = bodyLength - 1;
      const baseWidth = lastBodyRowIndex >= 0 && lastBodyRowIndex < bodyWidths.length ? bodyWidths[lastBodyRowIndex] : 1;
      
      for (let i = 0; i < baseWidth; i++) {
          if (Math.random() < 0.8) {
              const leftX = midX - 1 - i;
              const rightX = midX + i;
              if (leftX >= 0 && matrix[thrusterY - 1][leftX] === 1) matrix[thrusterY][leftX] = 3;
              if (rightX < GRID_WIDTH && matrix[thrusterY - 1][rightX] === 1) matrix[thrusterY][rightX] = 3;
          }
      }

      // Ensure at least one thruster if body exists at base
      const thrusterRowIsEmpty = matrix[thrusterY].every(c => c === 0);
      const baseIsNotEmpty = baseWidth > 0 && bodyWidths.length > 0;
      if (thrusterRowIsEmpty && baseIsNotEmpty) {
          matrix[thrusterY][midX - 1] = 3;
      }
  }

  // Add details (value of 4)
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (matrix[y][x] === 1 && Math.random() < 0.15) {
        matrix[y][x] = 4;
      }
    }
  }
  
  // Ensure cockpit is not overwritten by details
  if (matrix[cockpitY]) {
    matrix[cockpitY][midX - 1] = 2;
    matrix[cockpitY][midX] = 2;
  }
  
  return matrix;
};

