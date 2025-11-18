import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import Board from "./models/Board";

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initSquares();
    newBoard.placeFigures();
    setBoard(newBoard);
  };

  return (
    <div className="app">
      <BoardComponent board={board} setBoard={setBoard} />
      <button 
          className="restartButton"
          onClick={restart}
      >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#000000" viewBox="0 0 256 256"><path d="M24,128A72.08,72.08,0,0,1,96,56H204.69L194.34,45.66a8,8,0,0,1,11.32-11.32l24,24a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L204.69,72H96a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0Zm200-8a8,8,0,0,0-8,8,56.06,56.06,0,0,1-56,56H51.31l10.35-10.34a8,8,0,0,0-11.32-11.32l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L51.31,200H160a72.08,72.08,0,0,0,72-72A8,8,0,0,0,224,120Z"></path></svg>
      </button>
    </div>
  );
}

export default App;
