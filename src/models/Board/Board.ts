import { Square } from '../Square';
import { Colors } from '../Colors';
import { King } from '../King';
import { FigureConstructor } from '../Figure';
import { initializeFinalSquares } from './helpers/initializeFinalSquares';
import { placeInitialFigures } from './helpers/placeInitialFigures';

export default class Board {
  squares: Square[][] = [];
  whiteChecks: Square[] = [];
  blackChecks: Square[] = [];
  whiteKing!: King;
  blackKing!: King;

  FINAL_WHITE_SQUARES: Square[] = [];
  FINAL_BLACK_SQUARES: Square[] = [];

  constructor() {
    this.initSquares();
  }

  public initSquares(): void {
    this.squares = Array.from({ length: 8 }, (_, row) =>
      Array.from(
        { length: 8 },
        (_, col) =>
          new Square(
            this,
            row,
            col,
            (row + col) % 2 === 0 ? Colors.White : Colors.Black,
            null
          )
      )
    );
  }

  public setChecks(): void {
    this.whiteChecks = [];
    this.blackChecks = [];

    for (const row of this.squares) {
      for (const square of row) {
        const figure = square.figure;
        if (!figure) continue;

        const moves = figure.canGoPush();
        if (!moves) continue;

        if (figure.color === Colors.White) {
          this.whiteChecks.push(...moves);
        } else {
          this.blackChecks.push(...moves);
        }
      }
    }
  }

  public getSquare(x: number, y: number): Square {
    return this.squares[x][y];
  }

  public pawnEvolution(square: Square, Figure: FigureConstructor): void {
    new Figure(square.figure!.color, square);
  }

  public placeFigure(
    position: number[],
    color: Colors,
    Figure: FigureConstructor
  ): void {
    const [x, y] = position;
    new Figure(color, this.getSquare(x, y));
  }

  public placeFigures(): void {
    initializeFinalSquares(this);
    placeInitialFigures(this);
  }
}
