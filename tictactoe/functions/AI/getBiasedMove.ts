import { normalize } from "path";
import { normalizeState as normState } from "../normalizeState";
import { normalOperations as normOperations } from "../normalOperations";
import { getRandomMove } from "./getRandomMove";

export function getBiasedMove(squares: any[], aiMemory: any) {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
  
    

    // Initialize memory for available moves
    let outputMove = getRandomMove(availableMoves);
    let bestMove = null;
    let bestAvaliableMoves = [] as number[];
    let bestScore = -Infinity;

    
    //Goes through all possible orientations of the board
    availableMoves.forEach((move) => {
        let score = 0;
        for (let op_idx = 0; op_idx < 8; op_idx++) {
            const normMove = normOperations(op_idx)[move];
            const normStates = normState(squares, op_idx);
            const key = JSON.stringify(normStates);
            // Goes through all available moves and finds the one with the best score
            if (!aiMemory[key]) aiMemory[key] = {};
            if (!aiMemory[key][normMove]) aiMemory[key][normMove] = { wins: 0, losses: 0 };
            
            // Define score from the aiMemory at state (key) at move
            score += aiMemory[key][normMove].wins - aiMemory[key][normMove].losses;
        }
        if (score > bestScore) {
                
            bestAvaliableMoves = [move];
            bestScore = score;
        }
        if (score == bestScore) {
            bestAvaliableMoves.push(move);
            //console.log("Added best move", bestAvaliableMoves.length);
        }
    });
    bestMove = bestAvaliableMoves[Math.floor(Math.random() * bestAvaliableMoves.length)];
    if (bestAvaliableMoves.length > 1) console.log("BIAS/RAND: Choosing ", bestMove, " among the best moves!!!");
    else console.log("BIASED: Choosing the best move: ", bestMove);
    if (bestMove === null) {
        console.log("Error: bestMove === null");
        return getRandomMove(availableMoves);
    }
    else return bestMove;
}