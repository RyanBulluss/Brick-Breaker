import { useState, useEffect } from "react";
import "./constants";
import { board, paddle, ball } from "./constants";

export default function Game() {
  const [paddleX, setPaddleX] = useState(0);
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(0);
  const [ballSpeed, setBallSpeed] = useState({ x: 2, y: 2 });



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
        <div style={{
            height: ball.height,
            width: ball.width,
            backgroundColor: ball.color,
            top: ballY,
            left: ballX,
        }}></div>
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
    </div>
  );
}
