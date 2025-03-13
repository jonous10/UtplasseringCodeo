
export function normalOperations(op_idx: number) {
    const operations = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [6, 7, 8, 3, 4, 5, 0, 1, 2],
      [2, 1, 0, 5, 4, 3, 8, 7, 6],
      [6, 3, 0, 7, 4, 1, 8, 5, 2],
      [2, 5, 8, 1, 4, 7, 0, 3, 6],
      [8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    return operations[op_idx];
  }