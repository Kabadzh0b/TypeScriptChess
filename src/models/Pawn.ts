import { Colors } from "./Colors";
import { Figure, figureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bp.png";
import whiteLogo from "../pictures/wp.png";

export class Pawn extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = figureNames.PAWN;
    }
}