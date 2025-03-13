import { normalOperations } from "./normalOperations";



export function normalizeState(inputState: any, op_idx: number) {
  let result = Array(9).fill(null);
  for (let i = 0; i < 9; i++) {
      result[i] = inputState[normalOperations(op_idx)[i]];
  }
  return result;
}