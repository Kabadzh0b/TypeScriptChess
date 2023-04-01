import { Colors } from "./Colors";
import { Square } from "./Square";
import logoType from "../pictures/bb.png";

export enum figureNames{
    KING = "king",
    QUEEN = "queen",
    ROOK = "rook",
    BISHOP = "bishop",
    KNIGHT = "knigth",
    PAWN = "pawn",
}

export class Figure{
    color:Colors;
    square:Square;
    logo: typeof logoType;
    name: figureNames;
    
    constructor(color: Colors, name:figureNames, square: Square, logo:typeof logoType){
        this.color = color;
        this.square = square;
        this.logo = logo;
        this.name = name;
    }
}