export const isUrlMatched = (path = "", dynamicPath = ""): boolean => {
  const pathSegments = path.split("/");
  const dynamicPathSegments = dynamicPath.split("/");

  if (pathSegments.length !== dynamicPathSegments.length) {
    return false;
  }

  return pathSegments.every((segment, index) => {
    const dynamicSegment = dynamicPathSegments[index];

    if (segment.startsWith(":")) {
      return true; // Ignore dynamic segments, continue to the next iteration
    }

    return segment === dynamicSegment;
  });
};
