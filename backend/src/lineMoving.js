/* eslint-disable no-param-reassign */

const LINE_MOVE_SPEED = 0.1;

// eslint-disable-next-line import/prefer-default-export
export const moveLines = (lines) => {
  let movedLine = false;
  lines.forEach((line) => {
    if (line.goal == null) {
      return;
    }

    // eslint-disable-next-line no-bitwise
    if (moveDot(line, 'a', 'x')
      | moveDot(line, 'a', 'y')
      | moveDot(line, 'b', 'x')
      | moveDot(line, 'b', 'y')) {
      movedLine = true;
    }
  });
  return movedLine;
};

const moveDot = (line, dot, coordinate) => {
  const diff = line.goal[dot][coordinate] - line[dot][coordinate];
  if (diff > LINE_MOVE_SPEED) {
    line[dot][coordinate] += LINE_MOVE_SPEED;
    return true;
  } else if (diff > 0) {
    line[dot][coordinate] = line.goal[dot][coordinate];
    return true;
  } else if (diff < -LINE_MOVE_SPEED) {
    line[dot][coordinate] -= LINE_MOVE_SPEED;
    return true;
  } else if (diff < 0) {
    line[dot][coordinate] = line.goal[dot][coordinate];
    return true;
  }
  return false;
};
