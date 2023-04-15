import { Colors } from "./Colors";
import { Square } from "./Square";
import logoType from "../pictures/bb.png";

export enum FigureNames{
    King = "king",
    Queen = "queen",
    Rook = "rook",
    Bishop = "bishop",
    Knight = "knight",
    Pawn = "pawn",
    Null = "null",
}

export class Figure{
    color:Colors;
    square:Square;
    name: FigureNames | null;
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

    public canGo(square:Square): boolean{
        if (square.figure === null){
            return true;
        }
        else if (square.figure.color !== this.color){
            return true;
        }
        return false;
    }

    public canGoDiagonal(square:Square):boolean{
        if(!this.canGo(square))return false;
        const maxX = Math.max(square.x, this.square.x);
        const minX = Math.min(square.x, this.square.x);
        const maxY = Math.max(square.y, this.square.y);
        const minY = Math.min(square.y, this.square.y);
        if(maxX-minX !== maxY-minY) return false;
        let x = minX + 1;
        let y = minY + 1;
        while(x < maxX){
            if(!this.square.board.getSquare(x,y).isEmpty()){
                return false;
            }
            x++;
            y++;
        }
        debugger;
        return true;
    }

    public canGoVertical(square:Square):boolean{
        if(!this.canGo(square))return false;
        if(square.y !== this.square.y)return false;
        const maxX = Math.max(square.x, this.square.x);
        const minX = Math.min(square.x, this.square.x);
        let x = minX + 1;
        while(x < maxX){
            if(!this.square.board.getSquare(x,square.y).isEmpty()){
                return false;
            }
            x++;
        }
        return true;
    }

    public canGoHorizontal(square:Square):boolean{
        if(!this.canGo(square))return false;
        if(square.x !== this.square.x)return false;
        const maxY = Math.max(square.y, this.square.y);
        const minY = Math.min(square.y, this.square.y);
        let y = minY + 1;
        while(y < maxY){
            if(!this.square.board.getSquare(square.x,y).isEmpty()){
                return false;
            } 
            y++;
        }
        return true;
    }

    public canGoPush():Square[]{
        return [];
    }
}