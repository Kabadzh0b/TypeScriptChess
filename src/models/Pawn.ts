import { Colors } from "./Colors";
import { Figure, figureNames } from "./Figure";
import { Square } from "./Square";
import blackPawnLogo from "../pictures/bp.png";
import whitePawnLogo from "../pictures/wp.png";

export class Pawn extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.WHITE ? whitePawnLogo : blackPawnLogo;
        this.name = figureNames.PAWN;
    }
}