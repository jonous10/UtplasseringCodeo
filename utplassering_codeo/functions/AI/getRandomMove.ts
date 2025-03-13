// Handle AI movement

export function getRandomMove(squares: any[]) {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}