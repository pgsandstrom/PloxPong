const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export default (board) => {
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(line[0][0], line[0][1]);
    ctx.lineTo(line[1][0], line[1][1]);
    ctx.stroke();
  });
};

const renderBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  // ctx.lineWidth = 5;
  // ctx.strokeStyle = '#003300';
  // ctx.stroke();
};
