
let canvas;
let ctx;
export const getCanvas = () => {
  if (canvas == null) {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
  }
  return canvas;
};

export const renderBoard = (board) => {
  // fill with black:
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, 500, 500);
  ctx.fill();

  if (board !== undefined) {
    renderLines(board.lines);
    renderBall(board.ball);
  }
};

const renderLines = (lines) => {
  lines.forEach((line) => {
    renderLine(line);
    if (line.player) {
      renderLine(line.player);
    }
  });
};

const renderLine = (line) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'orange';
  ctx.beginPath();
  ctx.moveTo(line.a.x, line.a.y);
  ctx.lineTo(line.b.x, line.b.y);
  ctx.stroke();
};

const renderBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.center.x, ball.center.y, ball.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  // ctx.lineWidth = 5;
  // ctx.strokeStyle = '#003300';
  // ctx.stroke();
};
