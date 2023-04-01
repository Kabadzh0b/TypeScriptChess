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
    name: figureNames | null;
    logo:typeof logoType | null;
    id: number;

    constructor(color: Colors, square: Square){
        this.color = color;
        this.square = square;
        this.square.figure = this;
        this.logo = null;
        this.name = null;
        this.id = Math.random();
    }
}