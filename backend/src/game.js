/* eslint-disable no-param-reassign,no-console */
import _ from 'lodash';

import {
  bounceCircle,
  isLineIntersectingCircle,
  pointOnLineClosestToCircle,
  dotToDotDistance,
  moveDot,
  getLineLength,
  unitVectorLine,
} from './trig';
import { moveLines } from './lineMoving';

const PADDEL_LENGTH = 30;

const playerStructure = {
  a: {
    x: 0, y: 0,
  },
  b: {
    x: 0, y: 0,
  },
  name: 'Anon',
  id: 'abc',
  score: 0,
};

class Game {
  constructor(gameHolder) {
    this.gameHolder = gameHolder;
    this.running = false;
    this.msBetweenFrame = 15;
    this.speed = 3;
    this.startTime = null;
    this.turn = 0;
    this.board = {
      ball: {
        center: {
          x: 250.01,
          y: 100.01,
        },
        radius: 5,
        velocity: { x: 1, y: 0 },
      },
      lines: [
        {
          a: {
            x: 10, y: 10,
          },
          b: {
            x: 300, y: 10,
          },
        },
        {
          player: null,
          a: {
            x: 300, y: 10,
          },
          b: {
            x: 300, y: 300,
          },
        },
        {
          a: {
            x: 300, y: 300,
          },
          b: {
            x: 10, y: 300,
          },
        },
        {
          a: {
            x: 10, y: 300,
          },
          b: {
            x: 10, y: 10,
          },
        },
      ],
    };
  }

  changeToLineCount(newLineCount) {
    // TODO move player with lines even when not moving mouse
    const currentLineCount = this.board.lines.length;
    if (newLineCount > currentLineCount) {
      this.addLines(newLineCount);
      this.updateLineGoal();
    } else if (newLineCount < currentLineCount) {
      this.removeLines(newLineCount);
      // this.updateLineGoal();
    }
  }

  addLines(newLineCount) {
    const currentLines = [...this.board.lines];
    const currentLineCount = currentLines.length;
    // console.log(`increasing from ${currentLineCount} to ${newLineCount}`);
    const ratio = newLineCount / currentLineCount;
    let newLinesAdded = 0;
    currentLines.forEach((line, index) => {
      let splitLineCount = 0;
      while (newLinesAdded < (index + 1) * (ratio - 1)) {
        newLinesAdded += 1;
        splitLineCount += 1;
      }
      const lineLength = getLineLength(line);
      const newLineLength = lineLength / (splitLineCount + 1);
      const lineVector = unitVectorLine(line);
      line.b.x = line.a.x + (lineVector.x * newLineLength);
      line.b.y = line.a.y + (lineVector.y * newLineLength);
      for (let i = 0; i < splitLineCount; i++) { // eslint-disable-line no-plusplus
        const newLine = {
          a: {
            x: line.a.x + (lineVector.x * newLineLength * (i + 1)),
            y: line.a.y + (lineVector.y * newLineLength * (i + 1)),
          },
          b: {
            x: line.a.x + (lineVector.x * newLineLength * (i + 2)),
            y: line.a.y + (lineVector.y * newLineLength * (i + 2)),
          },
        };
        this.board.lines.splice(index + i + newLinesAdded, 0, newLine);
      }
    });
  }

  removeLines(newLineCount) {
    const currentLines = this.board.lines;
    const currentLineCount = currentLines.length;
    // console.log(`decreasing from ${currentLineCount} to ${newLineCount}`);
    const ratio = newLineCount / currentLineCount;
    let removedLines = 0;
    currentLines.forEach((line, index) => {
      if (line.player != null) {
        return;
      }
      while (removedLines / (1 - ratio) < (index + 1)) {
        // console.log(`remove line at ${index}`);
        removedLines += 1;
        // TODO find the positions on the other premade boards instead u know...
        // const prevLine = index === 0 ? currentLines[currentLineCount - 1] : currentLines[index - 1];
        const nextLine = index === currentLineCount - 1 ? currentLines[0] : currentLines[index + 1];
        // prevLine.goal.b = {... line.b};
        const oldLinegoal = line.goal;
        const oldNextLinegoal = nextLine.goal;
        nextLine.goal = {};
        nextLine.goal.a = oldLinegoal ? { ...oldLinegoal.a } : { ...line.a };
        nextLine.goal.b = oldNextLinegoal ? { ...oldNextLinegoal.b } : { ...nextLine.b };
        line.goal = {};
        line.goal.a = oldLinegoal ? { ...oldLinegoal.a } : { ...line.a };
        line.goal.b = oldLinegoal ? { ...oldLinegoal.a } : { ...line.a };
      }
    });
  }

  updateLineGoal() {
    const currentLineCount = this.board.lines.length;
    this.board.lines.forEach((line, index) => {
      switch (currentLineCount) { // eslint-disable-line default-case
        case 3:
          switch (index) { // eslint-disable-line default-case
            case 0:
              this.setLineGoal(line, 10, 10, 300, 10);
              break;
            case 1:
              this.setLineGoal(line, 300, 10, 300, 300);
              break;
            case 2:
              this.setLineGoal(line, 300, 300, 10, 10);
              break;
          }
          break;
        case 4:
          switch (index) { // eslint-disable-line default-case
            case 0:
              this.setLineGoal(line, 10, 10, 300, 10);
              break;
            case 1:
              this.setLineGoal(line, 300, 10, 300, 300);
              break;
            case 2:
              this.setLineGoal(line, 300, 300, 10, 300);
              break;
            case 3:
              this.setLineGoal(line, 10, 300, 10, 10);
              break;
          }
          break;
        case 5:
          switch (index) { // eslint-disable-line default-case
            case 0:
              this.setLineGoal(line, 100, 10, 300, 10);
              break;
            case 1:
              this.setLineGoal(line, 300, 10, 400, 250);
              break;
            case 2:
              this.setLineGoal(line, 400, 250, 300, 400);
              break;
            case 3:
              this.setLineGoal(line, 300, 400, 10, 300);
              break;
            case 4:
              this.setLineGoal(line, 10, 300, 100, 10);
              break;
          }
          break;
      }
    });
  }

  setLineGoal(line, ax, ay, bx, by) {
    line.goal = {
      a: {
        x: ax, y: ay,
      },
      b: {
        x: bx, y: by,
      },
    };
  }

  addPlayer(playerId) {
    const currentPlayerCount = this.getPlayerCount();
    const newPlayer = _.cloneDeep(playerStructure);
    newPlayer.id = playerId;
    // TODO: Check the first spot that is free instead...
    switch (currentPlayerCount) {
      case 0:
        this.board.lines[1].player = newPlayer;
        break;
      case 1:
        this.board.lines[3].player = newPlayer;
        break;
      default:
        throw new Error(`Too many players: ${currentPlayerCount}`);
    }
    this.updatePosition(playerId, 250, 250);
  }

  setName(playerId, name) {
    const activePlayer = this.board.lines.filter(line => line.player)
      .find(line => line.player.id === playerId).player;
    activePlayer.name = name;
  }

  removePlayer(playerId) {
    const activePlayerIndex = this.board.lines.findIndex(line => line.player && line.player.id === playerId);
    if (this.board.lines[activePlayerIndex] == null) {
      // TODO this happens sometimes... why?
      console.log(`error with index ${activePlayerIndex}`);
    }
    delete this.board.lines[activePlayerIndex].player;
  }

  getPlayerCount() {
    return this.board.lines.filter(line => line.player).length;
  }

  updateGame() {
    const ball = this.board.ball;
    ball.center.x += ball.velocity.x;
    ball.center.y += ball.velocity.y;
    this.board.lines.forEach((line) => {
      this.checkLineCollision(ball, line);
    });

    const playerList = this.board.lines.filter(line => line.player)
      .map(line => line.player);
    playerList.forEach((player) => {
      this.checkPlayerCollision(ball, player);
    });

    const movedLine = this.updateLinePositions();
    if (movedLine) {
      this.board.lines.forEach((line) => {
        if (line.player) {
          this.updatePosition(line.player.id, line.player.mouse.center.x, line.player.mouse.center.y);
        }
      });
    }
  }

  updateLinePositions() {
    this.board.lines = this.board.lines.filter(line => line.a.x !== line.b.x || line.a.y !== line.b.y);
    const movedLine = moveLines(this.board.lines);
    if (movedLine === false) {
      let random = getRandom(3, 5);
      if (random === 4) {
        random = 5;
      }
      this.changeToLineCount(random);
    }
    return movedLine;
  }

  checkLineCollision(ball, line) {
    const yDiff = (line.b.y - line.a.y);
    const xDiff = (line.b.x - line.a.x);
    line.angle = Math.atan(yDiff / xDiff);
    line.len = Math.sqrt((yDiff * yDiff) + (xDiff * xDiff));
    line.center = {};
    line.center.x = line.a.x;
    line.center.y = line.a.y;

    const collision = bounceCircle(ball, line);
    if (collision && line.player) {
      this.playerDeath(line.player);
    }
  }

  playerDeath(deadPlayer) {
    deadPlayer.score = 0;
    this.board.lines.forEach((line) => {
      if (line.player) {
        if (line.player !== deadPlayer) {
          line.player.score += 1;
        }
      }
    });
  }

  checkPlayerCollision(ball, player) {
    if (isLineIntersectingCircle(ball, player)) {
      const closestPoint = pointOnLineClosestToCircle(ball, player);
      isLineIntersectingCircle(ball, player);
      // TODO move this math stuff to trig
      const distanceToPlayerLeft = dotToDotDistance(closestPoint, player.a);
      const playerLength = dotToDotDistance(player.a, player.b);
      let percentage = distanceToPlayerLeft / playerLength;
      percentage = Math.min(percentage, 0.8);
      percentage = Math.max(percentage, 0.2);
      let playerDegree = Math.atan2(player.b.y - player.a.y, player.b.x - player.a.x);
      if (playerDegree < 0) {
        playerDegree += Math.PI * 2;
      }
      playerDegree += (Math.PI * percentage) + Math.PI;

      const xForce = Math.cos(playerDegree);
      const yForce = Math.sin(playerDegree);
      ball.velocity.x = xForce;
      ball.velocity.y = yForce;
    }
  }

  updatePosition(playerId, x, y) {
    const mouseCircle = {
      center: {
        x,
        y,
      },
    };
    const activeLine = this.board.lines.filter(line => line.player)
      .find(line => line.player.id === playerId);
    const activePlayer = activeLine.player;
    const playerNewCenter = pointOnLineClosestToCircle(mouseCircle, activeLine);
    const lineDegree = Math.atan2(activeLine.b.y - activeLine.a.y, activeLine.b.x - activeLine.a.x);
    const lineDegree90 = lineDegree + (Math.PI / 2);
    moveDot(playerNewCenter, lineDegree90, 10);
    moveDot(playerNewCenter, lineDegree, PADDEL_LENGTH / 2);
    const otherDot = { ...playerNewCenter };
    moveDot(otherDot, lineDegree, -PADDEL_LENGTH);
    activePlayer.a = playerNewCenter;
    activePlayer.b = otherDot;
    activePlayer.mouse = mouseCircle;
  }

  sendUpdate() {
    this.gameHolder.emitBoard(this.board);
  }

  start() {
    this.startTime = Date.now();
    this.running = true;
    this.cycle();
  }

  cycle() {
    this.turn += 1;
    let cycles = this.speed;
    while (cycles > 0) {
      this.updateGame();
      cycles -= 1;
    }

    this.sendUpdate();

    const currentTime = Date.now();
    const nextTime = this.startTime + (this.turn * this.msBetweenFrame);
    const sleepTime = nextTime - currentTime;

    setTimeout(() => {
      if (this.running) {
        this.cycle();
      } else {
        console.log('finished');
      }
    }, sleepTime);
  }

  stop() {
    this.running = false;
  }
}

const getRandom = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export default Game;
