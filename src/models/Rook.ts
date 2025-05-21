import { Colors } from './Colors';
import { Figure, FigureNames } from './Figure';
import { Square } from './Square';
import blackLogo from '../pictures/br.png';
import whiteLogo from '../pictures/wr.png';

export class Rook extends Figure {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.logo = color === Colors.White ? whiteLogo : blackLogo;
    this.name = FigureNames.Rook;
    this.moved = false;
  }

  moved: boolean;

  public canGoPush(): Square[] {
    const canGoArray: Square[] = [];
    this.square.board.squares.forEach((row) => {
      row.forEach((square) => {
        if (super.canGoVertical(square)) canGoArray.push(square);
        else if (super.canGoHorizontal(square)) canGoArray.push(square);
      });
    });
    return canGoArray;
  }
}
