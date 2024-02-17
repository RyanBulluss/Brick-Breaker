import { useState, useEffect } from "react";
import "./constants";
import { board, paddle, ball, findX, rng } from "./constants";

export default function Game() {
  const [playing, setPlaying] = useState(true);
  const [paddleX, setPaddleX] = useState(0);
  const [ballX, setBallX] = useState(board.width / 2 - ball.width / 2);
  const [ballY, setBallY] = useState(0);
  const [ballSpeed, setBallSpeed] = useState({ x: rng(20) - 10, y: 6 });

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!playing) return;
      const newX = ballX + ballSpeed.x;
      const newY = ballY + ballSpeed.y;
      setBallX(newX);
      setBallY(newY);

      if (newY + 10 >= board.height) {
        setPlaying(false);
      }

      if (newX < 0 || newX > board.width - ball.width) {
        setBallSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }));
      }
      if (newY < 0 || newY > board.height - ball.height) {
        setBallSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }));
      }
      if (
        newY > board.height - paddle.height &&
        newX >= paddleX &&
        newX <= paddleX + paddle.width
      ) {
        let newXSpeed = findX(newX, paddleX);
        setBallSpeed((prevSpeed) => ({ x: newXSpeed, y: -prevSpeed.y }));
      }
    }, 16);

    return () => clearInterval(gameLoop); // Cleanup function to clear interval when component unmounts
  }, [ballX, ballY, ballSpeed]);

  function startGame() {
    setBallX(board.width / 2 - ball.width / 2);
    setBallY(0);
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
    <div className="h-full w-full" onMouseMove={(e) => handleMouseMove(e)}>
      <div
        style={{
          height: board.height,
          width: board.width,
          margin: board.margin,
          border: "1px solid black",
        }}
        className="board"
      >
        <div
          style={{
            height: ball.height,
            width: ball.width,
            backgroundColor: ball.color,
            top: ballY,
            left: ballX,
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
          }}
        ></div>
      </div>
      <button onClick={() => startGame()} className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full m-4">Start Game</button>
    </div>
  );
}
