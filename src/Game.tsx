import { useState, useEffect } from "react";
import "./constants";
import { board, paddle, ball, findX, rng, level1, rows, level2, level3 } from "./constants";
import Brick from "./Brick";
import { BrickType } from "./BrickType";

const brick1: BrickType = {
  hitsRemaining: 5,
  x: 0,
  y: 0,
  height: board.height / 20,
  width: board.width / 5.5,
};

export default function Game() {
  const [playing, setPlaying] = useState(false);
  const [paddleX, setPaddleX] = useState(0);
  const [ballX, setBallX] = useState(board.width / 2 - ball.width / 2);
  const [ballY, setBallY] = useState(board.height / 2);
  const [ballSpeed, setBallSpeed] = useState({ x: 6, y: 6 });
  const [bricks, setBricks] = useState([]);

  function createBricks(level: any) {
    const newBricks: any = [];
    let x = 0;
    let y = 30;
    let gap = 5;

    level.forEach((n: number, idx: number) => {
      const newBrick: BrickType = {
        hitsRemaining: n,
        x: x + gap,
        y: y + gap,
        height: board.height / 20,
        width: board.width / 5.5,
      };

      if ((idx + 1) % rows === 0) {
        y += board.height / 20 + gap;
        x = 0;
      } else {
        x += board.width / 5.5 + gap;
      }
      newBricks.push(newBrick);
    });
    setBricks(newBricks);
  }

  function hittingBrick (y: number, x:number) {
    bricks.forEach((brick: any, idx: number) => {
      if (x + ball.height >= brick.x && x <= brick.x + brick.width && y <= brick.y + brick.height && y + ball.height >= brick.y && brick.hitsRemaining > 0) {
        const left = x + ball.height - brick.x;
        const right = brick.x + brick.width - x;
        const bottom = brick.y + brick.height - y;
        const top = y + ball.height - brick.y;

        let newBricks: any = [...bricks];
        newBricks[idx].hitsRemaining -= 1;
        setBricks(newBricks);
        
        if(top < right && top < left && top < bottom) {
          setBallSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }))
        } else
        if(right < top && right < left && right < bottom) {
          setBallSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }))
        } else
        if(bottom < right && bottom < left && bottom < top) {
          setBallSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }))
        } else
        if(left < right && left < top && left < bottom) {
          setBallSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }))
        }
        
      }
    })
  }

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!playing) return;
      const newX = ballX + ballSpeed.x;
      const newY = ballY + ballSpeed.y;
      setBallX(newX);
      setBallY(newY);

      if (newY + paddle.height / 2 >= board.height) {
        setPlaying(false);
      }

      if (newX < 0 || newX > board.width - ball.width) {
        setBallSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }));
      }
      if (newY < 0 || newY > board.height - ball.height) {
        setBallSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }));
      }
      if (
        newY + ball.height > board.height - paddle.height &&
        newX + ball.width >= paddleX &&
        newX <= paddleX + paddle.width
      ) {
        let newXSpeed = findX(newX, paddleX);
        setBallSpeed((prevSpeed) => ({ x: newXSpeed, y: -prevSpeed.y }));
      }
      let b = hittingBrick(newY, newX)

      
    }, 16);

    return () => clearInterval(gameLoop); // Cleanup function to clear interval when component unmounts
  }, [ballX, ballY, ballSpeed]);

  function startGame() {
    setBallX(board.width / 2 - ball.width / 2);
    setBallY(board.height / 2);
    setPlaying(true);
    setBallSpeed({ x: rng(20) - 10, y: 6 });
  }

  const handleMouseMove = (e: any) => {
    const mouseX = e.clientX;
    const paddleHalfWidth = paddle.width / 2;
    const newPaddleX = mouseX - board.margin - paddleHalfWidth;
    const leftBound = 0 + board.margin + paddleHalfWidth;
    const rightBound = board.width + board.margin - paddleHalfWidth;
    if (mouseX < leftBound) return setPaddleX(0);
    if (mouseX > rightBound) return setPaddleX(board.width - paddle.width);
    setPaddleX(newPaddleX);
  };

  return (
    <div
      className="h-full w-full flex flex-col justify-center"
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <div
        style={{
          height: board.height,
          width: board.width,
          margin: board.margin,
          border: "1px solid black",
        }}
        className="board"
      >
        <div className="top-0 left-0 w-full board">
          {bricks.map((brick) => (
            <Brick brick={brick} />
          ))}
        </div>
        <div
          style={{
            height: ball.height,
            width: ball.width,
            backgroundColor: ball.color,
            top: ballY,
            left: ballX,
            border: "1px solid black",
            zIndex: 5,
          }}
          className="rounded-full"
        ></div>
        <div
          style={{
            height: paddle.height,
            width: paddle.width,
            backgroundColor: paddle.color,
            top: board.height - paddle.height,
            left: paddleX,
            border: "1px solid black",
          }}
        ></div>
        <div className="flex top-[700px]">
        <button
          onClick={() => createBricks(level1)}
          className="p-4 m-4 bg-blue-600 hover:bg-red-700 text-white rounded-full"
        >
          Level 1
        </button>
        <button
          onClick={() => createBricks(level2)}
          className="p-4 m-4 bg-blue-600 hover:bg-red-700 text-white rounded-full"
        >
          Level 2
        </button>
        <button
          onClick={() => createBricks(level3)}
          className="p-4 m-4 bg-blue-600 hover:bg-red-700 text-white rounded-full"
        >
          Level 3
        </button>
        <button
          onClick={() => startGame()}
          className="p-4 m-4 bg-red-600 hover:bg-red-700 text-white rounded-full"
        >
          Start Game
        </button>
        </div>
        
      </div>
    </div>
  );
}
