/* eslint-disable no-param-reassign */

export const bounceCircle = (circle, line) => {
  if (isLineIntersectingCircle(circle, line)) {
    const bounceLineNormal = getBounceLineNormal(circle, line);
    const dot = dotProduct(circle.velocity, bounceLineNormal);
    circle.velocity.x -= 2 * dot * bounceLineNormal.x;
    circle.velocity.y -= 2 * dot * bounceLineNormal.y;
    do {
      moveCircle(circle);
    } while (isLineIntersectingCircle(circle, line));
    return true;
  } else {
    return false;
  }
};

export const getBounceLineNormal = (circle, line) => {
  const circleToClosestPointOnLineVector =
    vectorBetween(
      pointOnLineClosestToCircle(circle, line),
      circle.center);


  return unitVector(circleToClosestPointOnLineVector);
};

export const moveCircle = (circle) => {
  circle.center.x += circle.velocity.x;
  circle.center.y += circle.velocity.y;
};

export const magnitude = vector => Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));

export const unitVectorLine = (line) => {
  const vector = {
    x: line.b.x - line.a.x,
    y: line.b.y - line.a.y,
  };
  return ({
    x: vector.x / magnitude(vector),
    y: vector.y / magnitude(vector),
  });
};

export const unitVector = vector => ({
  x: vector.x / magnitude(vector),
  y: vector.y / magnitude(vector),
});


export const dotProduct = (vector1, vector2) => (vector1.x * vector2.x) + (vector1.y * vector2.y);


export const vectorBetween = (startPoint, endPoint) => ({
  x: endPoint.x - startPoint.x,
  y: endPoint.y - startPoint.y,
});


export const lineEndPoints = (line) => {
  const angleRadians = line.angle * 0.01745;


  const lineUnitVector = unitVector({
    x: Math.cos(angleRadians),
    y: Math.sin(angleRadians),
  });


  const endOffsetFromCenterVector = {
    x: (lineUnitVector.x * line.len) / 2,
    y: (lineUnitVector.y * line.len) / 2,
  };


  return [
    {
      x: line.center.x + endOffsetFromCenterVector.x,
      y: line.center.y + endOffsetFromCenterVector.y,
    },
    {
      x: line.center.x - endOffsetFromCenterVector.x,
      y: line.center.y - endOffsetFromCenterVector.y,
    },
  ];
};


export const pointOnLineClosestToCircle = (circle, line) => {
  line.len = dotToDotDistance(line.a, line.b);

  // const lineEndPoint1 = lineEndPoints(line)[0];
  // const lineEndPoint2 = lineEndPoints(line)[1];
  const lineEndPoint1 = { x: line.a.x, y: line.a.y };
  const lineEndPoint2 = { x: line.b.x, y: line.b.y };


  const lineUnitVector = unitVector(
    vectorBetween(lineEndPoint1, lineEndPoint2));


  const lineEndToCircleVector = vectorBetween(lineEndPoint1, circle.center);


  const projection = dotProduct(lineEndToCircleVector, lineUnitVector);


  if (projection <= 0) {
    return lineEndPoint1;
  } else if (projection >= line.len) {
    return lineEndPoint2;
  } else {
    return {
      x: lineEndPoint1.x + (lineUnitVector.x * projection),
      y: lineEndPoint1.y + (lineUnitVector.y * projection),
    };
  }
};

export const getLineLength = line => dotToDotDistance(line.a, line.b);

export const dotToDotDistance = (dot1, dot2) => {
  const xDiff = dot1.x - dot2.x;
  const yDiff = dot1.y - dot2.y;
  return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
};

export const isLineIntersectingCircle = (circle, line) => {
  const closest = pointOnLineClosestToCircle(circle, line);


  const circleToLineDistance = dotToDotDistance(circle.center, closest);


  return circleToLineDistance < circle.radius;
};

export const moveDot = (dot, degree, distance) => {
  const xDiff = Math.cos(degree);
  const yDiff = Math.sin(degree);
  dot.x += xDiff * distance;
  dot.y += yDiff * distance;
};
