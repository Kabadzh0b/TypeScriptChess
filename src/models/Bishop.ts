import { Colors } from "./Colors";
import { Figure, FigureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bb.png";
import whiteLogo from "../pictures/wb.png";

export class Bishop extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.White? whiteLogo : blackLogo;
        this.name = FigureNames.Bishop;
    }
    
    public canGoPush(): Square[]{
        const canGoArray:Square[] = [];
        this.square.board.squares.forEach(row => {
            row.forEach(square => {
                if(super.canGoDiagonal(square))canGoArray.push(square);
            });
        });
        return canGoArray;
    }
}