// Handle AI movement

export function getRandomMove(squares: any[]) {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
    if (availableMoves.length === 0) {
        console.log("No available moves.");
        return null;
    }
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    console.log("RANDOM!!! Choosing random move: ", randomMove);
    return randomMove;
}