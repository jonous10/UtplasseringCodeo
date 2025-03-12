import { useState } from "react";
import { Board } from "./Board";
import { saveJSON } from "@/functions/AI/saveJSON";

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => (
    <li key={move}>
      <button className="cursor-pointer bg-blue-400 m-1 border-1 rounded-3xl p-2"onClick={() => jumpTo(move)}>
        {move > 0 ? `Go to move #${move}` : 'Go to game start'}
      </button>
    </li>
  ));

  return (
    <div className="flex justify-center">
        <div className="">
            <button onClick={() => saveJSON(JSON.parse("{}"))}>Reset AI memory</button>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info text-4xl">
                <ol>{moves}</ol>
            </div>
        </div>
      
      
    </div>
  );
}