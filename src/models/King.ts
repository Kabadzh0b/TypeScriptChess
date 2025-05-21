import { Colors } from './Colors';
import { Figure, FigureNames } from './Figure';
import { Square } from './Square';
import blackLogo from '../pictures/bk.png';
import whiteLogo from '../pictures/wk.png';
import { Rook } from './Rook';

export class King extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.White ? whiteLogo : blackLogo;
    this.name = FigureNames.King;
    this.moved = false;
  }

  moved: boolean;

  public isChecked() {
    if (
      this.color === Colors.White &&
      this.square.board.blackChecks.includes(this.square)
    ) {
      return true;
    } else if (
      this.color === Colors.Black &&
      this.square.board.whiteChecks.includes(this.square)
    ) {
      return true;
    }
    return false;
  }

  public isCheckmate = (): boolean => {
    return !this.square.board.squares.some((row: Square[]) =>
      row.some((square: Square) => {
        if (square.figure !== null && square.figure.color === this.color) {
          const canGoPush: Square[] = square.figure.canGoPush();
          if (canGoPush) {
            for (const squareTo of canGoPush) {
              const squareToFigure = squareTo.figure;
              squareTo.figure = square.figure;
              square.figure.square = squareTo;
              square.figure = null;
              this.square.board.setChecks();
              if (!this.isChecked()) {
                square.figure = squareTo.figure;
                squareTo.figure.square = square;
                squareTo.figure = squareToFigure;
                this.square.board.setChecks();
                return true; // not a checkmate position
              }
              square.figure = squareTo.figure;
              squareTo.figure.square = square;
              squareTo.figure = squareToFigure;
              this.square.board.setChecks();
            }
          }
        }
        return false; // continue searching
      })
    );
  };

  private isShortCastlingPossible(): boolean {
    if (this.moved) return false;
    if (this.isChecked()) return false;
    for (let i = this.square.y + 1; i < 7; i++) {
      const square = this.square.board.getSquare(this.square.x, i);
      if (
        !square.isEmpty() ||
        (this.color === Colors.White
          ? square.board.blackChecks.includes(square)
          : square.board.whiteChecks.includes(square))
      ) {
        return false;
      }
    }
    const rookSquare = this.square.board.getSquare(this.square.x, 7);
    return !(!(rookSquare.figure instanceof Rook) || rookSquare.figure.moved);
  }

  private isLongCastlingPossible(): boolean {
    if (this.moved) return false;
    if (this.isChecked()) return false;
    for (let i = this.square.y - 1; i > 0; i--) {
      const square = this.square.board.getSquare(this.square.x, i);
      if (
        !square.isEmpty() ||
        (this.color === Colors.White
          ? square.board.blackChecks.includes(square)
          : square.board.whiteChecks.includes(square))
      ) {
        return false;
      }
    }
    const rookSquare = this.square.board.getSquare(this.square.x, 0);
    return !(!(rookSquare.figure instanceof Rook) || rookSquare.figure.moved);
  }

  public canGo(square: Square): boolean {
    if (!super.canGo(square)) return false;
    const maxX = Math.max(square.x, this.square.x);
    const minX = Math.min(square.x, this.square.x);
    const maxY = Math.max(square.y, this.square.y);
    const minY = Math.min(square.y, this.square.y);
    if (maxX - minX <= 1 && maxY - minY <= 1) return true;

    if (square.y === this.square.y - 2 && square.x === this.square.x) {
      return this.isLongCastlingPossible();
    }
    if (square.y === this.square.y + 2 && square.x === this.square.x) {
      return this.isShortCastlingPossible();
    }

    return false;
  }

  public canGoPush(): Square[] {
    const canGoArray: Square[] = [];
    this.square.board.squares.forEach((row) => {
      row.forEach((square) => {
        if (this.canGo(square)) canGoArray.push(square);
      });
    });
    return canGoArray;
  }
}
