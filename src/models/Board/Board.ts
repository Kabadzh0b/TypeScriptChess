import { Square } from '../Square';
import { Colors } from '../Colors';
import { Pawn } from '../Pawn';
import { Rook } from '../Rook';
import { Knight } from '../Knight';
import { Bishop } from '../Bishop';
import { Queen } from '../Queen';
import { King } from '../King';
import { FigureConstructor } from '../Figure';
export default class Board {
  squares: Square[][] = [];
  whiteChecks: Square[] = [];
  blackChecks: Square[] = [];
  whiteKing!: King;
  blackKing!: King;

  FINAL_WHITE_SQUARES: Square[] = [];
  FINAL_BLACK_SQUARES: Square[] = [];

  private initFinalCells = () => {
    for (let i = 0; i < 8; i++) {
      this.FINAL_WHITE_SQUARES.push(this.getSquare(0, i));
      this.FINAL_BLACK_SQUARES.push(this.getSquare(7, i));
    }
  };

  public setChecks = (): void => {
    this.whiteChecks = [];
    this.blackChecks = [];
    this.squares.forEach((row: Square[]) => {
      row.forEach((square) => {
        if (square.figure?.color === Colors.White) {
          const canGoPush = square.figure.canGoPush();
          if (canGoPush !== null) this.whiteChecks.push(...canGoPush);
        } else if (square.figure?.color === Colors.Black) {
          const canGoPush = square.figure.canGoPush();
          if (canGoPush !== null) this.blackChecks.push(...canGoPush);
        }
      });
    });
  };

  public initSquares(): void {
    for (let i = 0; i < 8; i++) {
      const row: Square[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Square(this, i, j, Colors.White, null));
        } else {
          row.push(new Square(this, i, j, Colors.Black, null));
        }
      }
      this.squares.push(row);
    }
  }

  public getSquare(x: number, y: number): Square {
    return this.squares[x][y];
  }

  public pawnEvolution(square: Square, Figure: FigureConstructor) {
    new Figure(square.figure!.color, square);
  }

  public placeFigure(
    positions: number[],
    color: Colors,
    Figure: FigureConstructor
  ): void {
    const x: number = positions[0];
    const y: number = positions[1];
    new Figure(color, this.getSquare(x, y));
  }

  public placeFigures(
    WKPos: number[] = [7, 4],
    WRPos: number[][] = [
      [7, 0],
      [7, 7],
    ],
    WKnPos: number[][] = [
      [7, 1],
      [7, 6],
    ],
    WBPos: number[][] = [
      [7, 2],
      [7, 5],
    ],
    WQPos: number[][] = [[7, 3]],
    WPPos: number[][] = [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
    ],
    BKPos: number[] = [0, 4],
    BRPos: number[][] = [
      [0, 0],
      [0, 7],
    ],
    BKnPos: number[][] = [
      [0, 1],
      [0, 6],
    ],
    BBPos: number[][] = [
      [0, 2],
      [0, 5],
    ],
    BQPos: number[][] = [[0, 3]],
    BPPos: number[][] = [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ]
  ): void {
    this.initFinalCells();
    const WHITE_PLAYER_POSITIONS = [WRPos, WKnPos, WBPos, WQPos, WPPos];
    const BLACK_PLAYER_POSITIONS = [BRPos, BKnPos, BBPos, BQPos, BPPos];
    const TYPES = [Rook, Knight, Bishop, Queen, Pawn];
    for (let i = 0; i < 5; i++) {
      const FigureConstructor = TYPES[i];
      const WPos: number[][] = WHITE_PLAYER_POSITIONS[i];
      const BPos: number[][] = BLACK_PLAYER_POSITIONS[i];
      for (const position of WPos) {
        this.placeFigure(position, Colors.White, FigureConstructor);
      }
      for (const position of BPos) {
        this.placeFigure(position, Colors.Black, FigureConstructor);
      }
    }
    this.whiteKing = new King(Colors.White, this.getSquare(WKPos[0], WKPos[1]));
    this.blackKing = new King(Colors.Black, this.getSquare(BKPos[0], BKPos[1]));
  }
}
