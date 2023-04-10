import { Colors } from "./Colors";
import { Figure, figureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bq.png";
import whiteLogo from "../pictures/wq.png";

export class Queen extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = figureNames.QUEEN;
    }
    public canGoPush(): Square[] | null{
        const canGoArray:Square[] | null = super.canGoPushDiagonal();
        canGoArray.push(...super.canGoPushHorizontalVertical());
        return canGoArray;
    }
}