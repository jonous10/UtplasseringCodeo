
export function normalOperations(op_idx: number) {
    const operations = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8],  // Identity
      [0, 3, 6, 1, 4, 7, 2, 5, 8],  // Flipped (keeping 0 in TR corner)
      
      [2, 1, 0, 5, 4, 3, 8, 7, 6],  // Rotated left
      [2, 5, 8, 1, 4, 7, 0, 3, 6],  // Rotated left (keeping 2 at TR corner)
      
      [6, 3, 0, 7, 4, 1, 8, 5, 2],  // Rotated right
      [6, 7, 8, 3, 4, 5, 0, 1, 2],  // Rotated right (keeping 6 at TR corner)

      [8, 5, 2, 7, 4, 1, 6, 3, 0],  // Rotated 180
      [8, 7, 6, 5, 4, 3, 2, 1, 0]   // Rotated 180 (keeping 8 at TR corner)
    ];
    //console.log("Normal operations!!!", op_idx);
    return operations[op_idx];
  }