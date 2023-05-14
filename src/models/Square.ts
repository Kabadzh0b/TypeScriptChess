import { Bishop } from "./Bishop";
import Board from "./Board";
import { Colors } from "./Colors";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Square {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: King | Rook | Bishop | Knight | Queen | Pawn | null;
  id: number;
  board: Board;

  public isEmpty(): boolean {
    return this.figure === null;
  }

  constructor(
    board: Board,
    x: number,
    y: number,
    Color: Colors,
    Figure: King | Rook | Bishop | Knight | Queen | Pawn | null
  ) {
    this.x = x;
    this.y = y;
    this.color = Color;
    this.figure = Figure;
    this.id = x + y;
    this.board = board;
  }
}
