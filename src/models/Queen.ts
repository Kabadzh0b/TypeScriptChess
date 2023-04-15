import { Colors } from "./Colors";
import { Figure, FigureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bq.png";
import whiteLogo from "../pictures/wq.png";

export class Queen extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.White? whiteLogo : blackLogo;
        this.name = FigureNames.Queen;
    }
    public canGoPush(): Square[]{
        const canGoArray:Square[] = [];
        this.square.board.squares.forEach(row => {
            row.forEach(square => {
                if(super.canGoDiagonal(square))canGoArray.push(square);
                else if(super.canGoVertical(square))canGoArray.push(square);
                else if(super.canGoHorizontal(square))canGoArray.push(square);
            });
        });
        return canGoArray;
    }
}