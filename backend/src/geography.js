/* eslint-disable no-param-reassign */

export const getNewVector = (vector, line) => {
  // const lineNormal = [
  //   [
  //     line[0][0],
  //     -line[0][1],
  //   ],
  //   [
  //     -line[1][0],
  //     line[1][1],
  //   ],
  // ];

};

export const isLineCircleCollide = (a, b, circle, radius, nearest) => {
  // check to see if start or end points lie within circle
  if (isPointCircleCollision(a, circle, radius)) {
    if (nearest) {
      nearest[0] = a[0];
      nearest[1] = a[1];
    }
    return true;
  }
  if (isPointCircleCollision(b, circle, radius)) {
    if (nearest) {
      nearest[0] = b[0];
      nearest[1] = b[1];
    }
    return true;
  }

  const x1 = a[0];
  const y1 = a[1];
  const x2 = b[0];
  const y2 = b[1];
  const cx = circle[0];
  const cy = circle[1];

  // vector d
  const dx = x2 - x1;
  const dy = y2 - y1;

  // vector lc
  const lcx = cx - x1;
  const lcy = cy - y1;

  // project lc onto d, resulting in vector p
  const dLen2 = (dx * dx) + (dy * dy); // len2 of d
  let px = dx;
  let py = dy;
  if (dLen2 > 0) {
    const dp = ((lcx * dx) + (lcy * dy)) / dLen2;
    px *= dp;
    py *= dp;
  }

  if (!nearest) {
    nearest = [0, 0];
  }
  nearest[0] = x1 + px;
  nearest[1] = y1 + py;

  // len2 of p
  const pLen2 = (px * px) + (py * py);

  // check collision
  return isPointCircleCollision(nearest, circle, radius)
    && pLen2 <= dLen2 && ((px * dx) + (py * dy)) >= 0;
};

export const isPointCircleCollision = (point, circle, r) => {
  if (r === 0) {
    return false;
  }
  const dx = circle[0] - point[0];
  const dy = circle[1] - point[1];
  return (dx * dx) + (dy * dy) <= r * r;
};

