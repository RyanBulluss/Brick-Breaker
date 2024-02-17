const board = {
  height: 700,
  width: 400,
  margin: 100
};

const ball = {
    height: 15,
    width: 15,
    color:"black"
}

const paddle = {
  height: 30,
  width: 100,
  color: "black",
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

export { board, paddle, ball, findX, rng };
