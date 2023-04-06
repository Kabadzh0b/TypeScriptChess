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
    public canGo(canGoArray:Square[],x:number,y:number){
        const sq:Square = this.square.board.getSquare(x,y);
        if (sq.figure === null)canGoArray.push(sq)
        else if (sq.figure.color !== this.color){
            canGoArray.push(sq)
        }
    }
    public canGoPush(){
        if(this.name === "bishop"){
            const canGoArray:Square[] | null = [];
            let x:number = this.square.x+1;
            let y:number = this.square.y+1;
            
            while(x < 8 && y < 8){
                this.canGo(canGoArray,x,y);
                x++;
                y++;
            }
            x = this.square.x+1;
            y = this.square.y-1;
            while(x < 8 && y >= 0){
                this.canGo(canGoArray,x,y);
                x++;
                y--;
            }
            x = this.square.x-1;
            y = this.square.y+1;
            while(x >= 0 && y < 8){
                this.canGo(canGoArray,x,y);
                x--;
                y++;
            }
            x = this.square.x-1;
            y = this.square.y-1;
            while(x >= 0 && y >= 0){
                this.canGo(canGoArray,x,y);
                x--;
                y--;
            }
        if (canGoArray.length === 0) return null;
        return canGoArray;
        }
        else return null;
    }
}