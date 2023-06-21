export const wait = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, delay);
  });
};
