export const firstIfDefined = <T>(first: T, second: T): T => {
  if (typeof first !== "undefined") {
    return first;
  } else {
    return second;
  }
};
