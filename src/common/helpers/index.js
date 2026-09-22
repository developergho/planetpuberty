export const delayed = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
