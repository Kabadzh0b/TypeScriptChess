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
    
    public canGoPush(): Square[] | null{
        const canGoArray:Square[] | null = super.canGoPushDiagonal();
        return canGoArray;
    }
}