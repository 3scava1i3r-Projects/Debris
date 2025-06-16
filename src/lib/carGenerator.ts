
import { SpriteMatrix } from './shipGenerator';

const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const carBodyColors = [5, 8, 9, 10, 11];

export const generateCar = (): SpriteMatrix => {
  const matrix: SpriteMatrix = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));

  const carBodyWidth = randomInt(8, 12);
  const carBodyHeight = randomInt(3, 4);
  const startX = Math.floor((GRID_WIDTH - carBodyWidth) / 2);
  const startY = GRID_HEIGHT - 5 - carBodyHeight;

  const primaryColor = carBodyColors[randomInt(0, carBodyColors.length - 1)];
  const availableSecondaryColors = carBodyColors.filter(c => c !== primaryColor);
  const secondaryColor = availableSecondaryColors.length > 0
    ? availableSecondaryColors[randomInt(0, availableSecondaryColors.length - 1)]
    : (primaryColor === 11 ? 5 : 11); // Fallback to contrast

  // Car Body
  for (let y = startY; y < startY + carBodyHeight; y++) {
    for (let x = startX; x < startX + carBodyWidth; x++) {
      matrix[y][x] = primaryColor;
    }
  }

  // Add a stripe with a secondary color
  if (Math.random() < 0.4 && carBodyHeight > 2) {
    const stripeY = startY + 1;
    for (let x = startX; x < startX + carBodyWidth; x++) {
      matrix[stripeY][x] = secondaryColor;
    }
  }

  // Cabin
  const cabinWidth = Math.floor(carBodyWidth * 0.6);
  const cabinHeight = Math.floor(carBodyHeight * 0.8);
  const cabinStartX = startX + Math.floor((carBodyWidth - cabinWidth) / 2);
  const cabinStartY = startY - cabinHeight;

  // Use primary or secondary color for the cabin
  const cabinColor = Math.random() < 0.5 ? secondaryColor : primaryColor;
  for (let y = cabinStartY; y < cabinStartY + cabinHeight; y++) {
    for (let x = cabinStartX; x < cabinStartX + cabinWidth; x++) {
      matrix[y][x] = cabinColor;
    }
  }

  // Windows
    for (let x = cabinStartX + 1; x < cabinStartX + cabinWidth - 1; x++) {
       matrix[cabinStartY + 1][x] = 7;
    }


  // Wheels
  const wheelY = startY + carBodyHeight;
  const frontWheelX = startX + 1;
  const backWheelX = startX + carBodyWidth - 2;

  matrix[wheelY][frontWheelX] = 6;
  matrix[wheelY][frontWheelX + 1] = 6;
  matrix[wheelY - 1][frontWheelX] = 6;
  matrix[wheelY - 1][frontWheelX+1] = 6;

  matrix[wheelY][backWheelX] = 6;
  matrix[wheelY][backWheelX - 1] = 6;
  matrix[wheelY - 1][backWheelX] = 6;
  matrix[wheelY-1][backWheelX - 1] = 6;


  return matrix;
};
