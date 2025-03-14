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
    for (let op_idx = 0; op_idx < 8; op_idx++) {
        // Initialize the normalized state and key
        let normStates = normState(squares, op_idx);
        let key = JSON.stringify(normStates);

        console.log("KEY: ", key);
        
        // if the aiMemory data has the normalized state
        if (!aiMemory[key]) aiMemory[key] = {};

        
        availableMoves.forEach(move => {
            const normMove = normOperations(op_idx)[move];
            // Goes through all available moves and finds the one with the best score
            if (!aiMemory[key][normMove]) aiMemory[key][normMove] = { wins: 0, losses: 0 };
            
            // Define score from the aiMemory at state (key) at move
            const score = aiMemory[key][normMove].wins - aiMemory[key][normMove].losses;
            
            // Define the move normalized back to output
            
            
            if (score > bestScore) {
                
                bestAvaliableMoves = [move];
                bestScore = score;
            }
            if (score == bestScore) {
                bestAvaliableMoves.push(move);
                //console.log("Added best move", bestAvaliableMoves.length);
            }
        });
        
    }
    bestMove = bestAvaliableMoves[Math.floor(Math.random() * bestAvaliableMoves.length)];
    if (bestAvaliableMoves.length > 1) console.log("BIAS/RAND: Choosing ", bestMove, " among the best moves!!!");
    else console.log("BIASED: Choosing the best move: ", bestMove);
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
        //console.log("BIASED MOVE", bestMove);
        outputMove = bestMove;
    }
    else {
        //console.log("ERROR!!!!, BESTMOVE === NULL");
    }
    return outputMove;
}