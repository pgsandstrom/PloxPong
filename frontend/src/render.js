const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export const getCanvas = () => canvas;

export const render = (board) => {
  renderScore(board);

  // fill with black:
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, 500, 500);
  ctx.fill();

  if (board !== undefined) {
    renderLines(board.lines);
    renderBall(board.ball);
  }
};

// TODO make in a non-nooby way
const renderScore = (board) => {
  const scoreString = board.lines.filter(line => line.player)
    .map(line => line.player.score)
    .reduce((acc, item) => `${acc}\n${item}`);
  document.getElementById('scoreList').innerHTML = scoreString;
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
