import Board from '../Board';
import { Colors } from '../../Colors';
import { Bishop } from '../../Bishop';
import { Knight } from '../../Knight';
import { Pawn } from '../../Pawn';
import { Queen } from '../../Queen';
import { Rook } from '../../Rook';
import { King } from '../../King';
import {
  WKPos,
  BKPos,
  WRPos,
  BRPos,
  WKnPos,
  BKnPos,
  WBPos,
  BBPos,
  WQPos,
  BQPos,
  WPPos,
  BPPos,
} from '../constants/piecePositions';

export function placeInitialFigures(board: Board): void {
  const TYPES = [Rook, Knight, Bishop, Queen, Pawn];
  const WHITE_POSITIONS = [WRPos, WKnPos, WBPos, WQPos, WPPos];
  const BLACK_POSITIONS = [BRPos, BKnPos, BBPos, BQPos, BPPos];

  for (let i = 0; i < TYPES.length; i++) {
    const Figure = TYPES[i];
    WHITE_POSITIONS[i].forEach((pos) =>
      board.placeFigure(pos, Colors.White, Figure)
    );
    BLACK_POSITIONS[i].forEach((pos) =>
      board.placeFigure(pos, Colors.Black, Figure)
    );
  }

  board.whiteKing = new King(Colors.White, board.getSquare(WKPos[0], WKPos[1]));
  board.blackKing = new King(Colors.Black, board.getSquare(BKPos[0], BKPos[1]));
}
