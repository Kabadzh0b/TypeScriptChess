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
        const canGoArray:Square[] = super.canGoPushDiagonal();
        canGoArray.push(...super.canGoPushHorizontalVertical());
        return canGoArray;
    }
}