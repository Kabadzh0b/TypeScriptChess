import { Colors } from "./Colors";
import { Figure, FigureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bn.png";
import whiteLogo from "../pictures/wn.png";

export class Knight extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.White ? whiteLogo : blackLogo;
    this.name = FigureNames.Knight;
  }

  public canGo(square: Square): boolean {
    if (!super.canGo(square)) return false;
    const dx = Math.abs(square.x - this.square.x);
    const dy = Math.abs(square.y - this.square.y);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }

  public canGoPush() {
    const canGoArray: Square[] = [];
    this.square.board.squares.forEach((row) => {
      row.forEach((square) => {
        if (this.canGo(square)) canGoArray.push(square);
      });
    });
    return canGoArray;
  }
}
