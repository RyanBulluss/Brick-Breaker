const board = {
  height: 700,
  width: 400,
  margin: 20
};

const rows = 5;

const level1 = [1, 1, 0, 1, 1, 2, 2, 0, 2, 2, 1, 1, 0, 1, 1, 2, 2, 0, 2, 2, 1, 1, 0, 1, 1];
const level2 = [1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 3, 4, 5, 4, 3, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1];
const level3 = [5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];

const ball = {
    height: 15,
    width: 15,
    color:"gray"
}

const paddle = {
  height: 30,
  width: 100,
  color: "lightgray",
};

function findX(ballX: number, paddleX: number) {
    const leftOfBall = ballX - paddleX;
    const w = paddle.width
    if (leftOfBall < w/8) return -10;
    if (leftOfBall < w/4) return -6;
    if (leftOfBall < w/3) return -3;
    if (leftOfBall < w/2) return -1;
    if (leftOfBall < w/1.8) return 1;
    if (leftOfBall < w/1.6) return 3;
    if (leftOfBall < w/1.3) return 6;
    return 10
}

function rng(n: number) {
    return Math.floor(Math.random() * n);
}

export { board, paddle, ball, findX, rng, level1, level2, level3, rows };
