import { Colors } from "./Colors";
import { Figure, FigureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/br.png";
import whiteLogo from "../pictures/wr.png";

export class Rook extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.White? whiteLogo : blackLogo;
        this.name = FigureNames.Rook;
    }
    public canGoPush(): Square[] {
        const canGoArray:Square[] = super.canGoPushHorizontalVertical();
        return canGoArray;
    }
}