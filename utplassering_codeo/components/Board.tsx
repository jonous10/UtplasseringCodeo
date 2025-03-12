import { useEffect, useState } from "react";
import { Square } from "./Square";
import { saveJSON } from "@/functions/AI/saveJSON";
import next from "next";


// Handle AI memory
let aiMemory = JSON.parse(localStorage.getItem("aiMemory") || "{}");

function updateMemory(gameStates: any[], winner: string, move: number) {
    gameStates.forEach((entry) => {
        if (!entry || !entry.gameState) return;
        const key = JSON.stringify(entry.gameState);
    
        if (!aiMemory[key]) aiMemory[key] = {};
        if (!aiMemory[key][move]) aiMemory[key][move] = { wins: 0, losses: 0 };
    
        if (winner === "X") aiMemory[key][move].wins += 1;
        else if (winner === "O") aiMemory[key][move].losses += 1;
    
        saveJSON(aiMemory);
      });
}

// Handle AI movement

function getRandomMove(squares: any[]) {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
function getBiasedMove(squares: any[]) {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
  
    const key = JSON.stringify(squares);

    if (!aiMemory[key]) aiMemory[key] = {};
    
    // Initialize memory for available moves
    let bestMove = availableMoves[0];
    let bestScore = -Infinity;
    
    // Goes through all available moves and finds the one with the best score
    availableMoves.forEach(move => {
      if (!aiMemory[key][move]) aiMemory[key][move] = { wins: 0, losses: 0 };
  
      const score = aiMemory[key][move].wins - aiMemory[key][move].losses;

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    });
  
    return bestMove;
}

function aiMove(squares: any[], aiChaos: number) {
    const move =  Math.random() < aiChaos ? getRandomMove(squares) : getBiasedMove(squares);
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
  
    function handleClick(i: number) {
      if (calculateWinner(squares) || squares[i] || xIsNext) {
        return;
      }

      const nextSquares = squares.slice();
      nextSquares[i] = "O";
      onPlay(nextSquares);
    }

    const winner = calculateWinner(squares) as string | null;

    // Ai move
    useEffect(() => {
        if (!winner && xIsNext) {
            console.log("AI move!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let move = aiMove(squares, 0);
                let nextSquares = squares.slice();
                nextSquares[move] = "X";
                console.log("AI move: ", move, "New state: ", nextSquares);

                const newWinner = calculateWinner(nextSquares) as string | null;
                console.log(newWinner, squares, nextSquares);

                if (newWinner) {
                    console.log("AI Winner: ", newWinner);
                    updateMemory(nextSquares, calculateWinner(nextSquares), move);
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