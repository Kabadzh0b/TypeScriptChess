import Board from '../Board';

export function initializeFinalSquares(board: Board): void {
  for (let col = 0; col < 8; col++) {
    board.FINAL_WHITE_SQUARES.push(board.getSquare(0, col));
    board.FINAL_BLACK_SQUARES.push(board.getSquare(7, col));
  }
}
