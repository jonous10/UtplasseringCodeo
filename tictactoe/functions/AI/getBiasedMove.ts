import { normalize } from "path";
import { normalizeState } from "../normalizeState";
import { normalOperations } from "../normalOperations";
import { getRandomMove } from "./getRandomMove";

export function getBiasedMove(squares: any[], aiMemory: any) {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
  
    const key = JSON.stringify(squares);

    // Initialize memory for available moves
    let outputMove = getRandomMove(squares);
    let bestMove = null;
    let bestAvaliableMoves = [] as number[];
    let bestScore = -Infinity;

    if (!aiMemory[key]) aiMemory[key] = {};
    //Goes through all possible orientations of the board
    //for (let op_idx = 0; op_idx < 6; op_idx++) {
    //    let normalizedState = normalizeState(squares, op_idx);
    //    // if the aiMemory data has the normalized state
    //    if (aiMemory[JSON.stringify(normalizedState)]) {
    //        
    //        availableMoves.forEach(move => {
    //            // Goes through all available moves and finds the one with the best score
    //            if (!aiMemory[key][move]) aiMemory[key][move] = { wins: 0, losses: 0 };
    //        
    //            const score = aiMemory[key][move].wins - aiMemory[key][move].losses;
    //            
    //            if (score == bestScore) {
    //                bestAvaliableMoves.push(move);
    //                console.log("Added best move", bestAvaliableMoves.length);
    //            
    //            if (score > bestScore) {
    //                bestAvaliableMoves = [move];
    //                bestScore = score;
    //                bestMove = normalOperations(op_idx)[move];
    //            }
    //        });
    //    }
    //}
    // if the aiMemory data has the normalized state
    //if (aiMemory[JSON.stringify(squares)]) {
    //    
    //    availableMoves.forEach(move => {
    //        // Goes through all available moves and finds the one with the best score
    //        if (!aiMemory[key][move]) aiMemory[key][move] = { wins: 0, losses: 0 };
    //    
    //        const score = aiMemory[key][move].wins - aiMemory[key][move].losses;
    //        
    //        
    //        if (score > bestScore) {
    //            bestAvaliableMoves = [move];
    //            bestScore = score;
    //        }
    //        if (score == bestScore) {
    //            bestAvaliableMoves.push(move);
    //            console.log("Added best move", bestAvaliableMoves.length);
    //        }
    //    });
    //    if (bestAvaliableMoves.length > 1) console.log("WE DOIN RANDOM!")
    //    bestMove = bestAvaliableMoves[Math.floor(Math.random() * bestAvaliableMoves.length)];
    //}
    
    if (bestMove !== null) {
        console.log("BIASED MOVE", bestMove);
        outputMove = bestMove;
    }
    else {
        console.log("ERROR!!!!, BESTMOVE === NULL");
    }
    return outputMove;
}