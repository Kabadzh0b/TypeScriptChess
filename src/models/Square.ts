import Board from './Board/Board';
import { Colors } from './Colors';
import { FigureType } from './Figure';

export class Square {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: FigureType | null;
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
    Figure: FigureType | null
  ) {
    this.x = x;
    this.y = y;
    this.color = Color;
    this.figure = Figure;
    this.id = x + y;
    this.board = board;
  }
}
