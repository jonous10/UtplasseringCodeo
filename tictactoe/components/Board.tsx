import { useEffect, useState } from "react";
import { Square } from "./Square";
import { saveJSON } from "@/functions/AI/saveJSON";
import next from "next";
import { normalizeState } from "@/functions/normalizeState";
import { getBiasedMove } from "@/functions/AI/getBiasedMove";
import { getRandomMove } from "@/functions/AI/getRandomMove";



// Handle AI memory
let aiMemory = JSON.parse(localStorage.getItem("aiMemory") || "{}");

if (!Array.isArray(aiMemory["lastMoves"])) aiMemory["lastMoves"] = [];
if (!Array.isArray(aiMemory["lastStates"])) aiMemory["lastStates"] = [];


function updateMemory(gameStates: any[][], winner: string, moves: number[]) {
  gameStates.forEach((state, idx) => {
    let key = JSON.stringify(state);
    // Ensure that keys exist
    if (!aiMemory[key]) aiMemory[key] = {};
    if (!aiMemory[key][moves[idx]]) aiMemory[key][moves[idx]] = { wins: 0, losses: 0 };
    aiMemory[key][moves[idx]][winner === "X" ? "wins" : "losses"]++;
  });

  aiMemory.lastMoves = [];
  aiMemory.lastStates = [];
  
  //console.log("Memory before saving:", aiMemory); // Debugging
  saveJSON(aiMemory); // Save the updated memory
  
}



function aiMove(squares: any[], aiChaos: number) {
    const move =  Math.random() < aiChaos ? getRandomMove(squares) : getBiasedMove(squares, aiMemory);
    return move;
}



function calculateWinner(squares: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}


// Board

type BoardVar = {
    xIsNext: boolean;
    squares: any[];
    onPlay: (nextSquares: any[]) => void;
}

export function Board({ xIsNext, squares, onPlay }: BoardVar) {
  // Check if all items in squares are null
  if (squares.every((val) => val === null)) {
    aiMemory.lastMoves = [];
    aiMemory.lastStates = [];
  }

    function handleClick(i: number) {
      if (calculateWinner(squares) || squares[i] || xIsNext) {
        return;
      }

      const nextSquares = squares.slice();
      nextSquares[i] = "O";

      if (calculateWinner(nextSquares)) {
        updateMemory(aiMemory["lastStates"], "O", aiMemory["lastMoves"]);
      }
      onPlay(nextSquares);
    }

    const winner = calculateWinner(squares) as string | null;

    // Ai move
    useEffect(() => {
        if (!winner && xIsNext) {
            //console.log("AI move!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            let move = aiMove(squares, 0.4);
            
            aiMemory.lastMoves.push(move);
            aiMemory.lastStates.push(squares);
            saveJSON(aiMemory);

            let nextSquares = squares.slice();
            if (move !== null) {
              nextSquares[move] = "X";
            }

            //console.log(newWinner, squares, nextSquares)
            if (calculateWinner(nextSquares)) {
                updateMemory(aiMemory["lastStates"], "X", aiMemory["lastMoves"]);
                console.log("AI WON!!!");
            }
            onPlay(nextSquares);
        }
    });

    let [status, statusColor, squareColor] = winner ? 
    [`Our Winner is ${winner} !!!`,  winner === "X" ? "text-green-700" : "text-blue-700",winner === "X" ? "bg-green-400" : "bg-blue-400"] : 
    [`${xIsNext ? "X" : "O"}'s turn`, xIsNext ? "text-green-700" : "text-blue-700", "bg-gray-100"];

    console.log("JSON: ", JSON.parse(localStorage.getItem("aiMemory") || "{}"));

    return (
      <div className="">
        <div className={`text-6xl ${statusColor}`}>{status}</div>
        {[0, 3, 6].map((row) => (
          <div className="flex" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  squareColor={squareColor}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }