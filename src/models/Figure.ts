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

    public canGo(canGoArray:Square[],x:number,y:number): boolean{
        const sq:Square = this.square.board.getSquare(x,y);
        if (sq.figure === null){
            canGoArray.push(sq)
            return true;
        }
        else if (sq.figure.color !== this.color){
            canGoArray.push(sq)
            return false;
        }
        return false;
    }

    public canGoPushDiagonal(){
        const canGoArray:Square[] | null = [];
        let x:number = this.square.x+1;
        let y:number = this.square.y+1;
        
        while(x < 8 && y < 8){
            if(!this.canGo(canGoArray,x,y)) break;
            x++;
            y++;
        }
        x = this.square.x+1;
        y = this.square.y-1;
        while(x < 8 && y >= 0){
            if(!this.canGo(canGoArray,x,y)) break;
            x++;
            y--;
        }
        x = this.square.x-1;
        y = this.square.y+1;
        while(x >= 0 && y < 8){
            if(!this.canGo(canGoArray,x,y)) break;
            x--;
            y++;
        }
        x = this.square.x-1;
        y = this.square.y-1;
        while(x >= 0 && y >= 0){
            if(!this.canGo(canGoArray,x,y)) break;
            x--;
            y--;
        }   
        return canGoArray;
    }

    public canGoPushHorizontalVertical(){
        const canGoArray:Square[] | null = [];
        let x:number = this.square.x+1;
        let y:number = this.square.y;
        while(x < 8){
            if(!this.canGo(canGoArray,x,y)) break;
            x++;
        }
        x = this.square.x-1;
        while(x >= 0){
            if(!this.canGo(canGoArray,x,y)) break;
            x--;
        }
        x = this.square.x;
        y = this.square.y+1;
        while(y < 8){
            if(!this.canGo(canGoArray,x,y)) break;
            y++;
        }
        y = this.square.y-1;
        while(y >= 0){
            if(!this.canGo(canGoArray,x,y)) break;
            y--;
        }   
        return canGoArray;
    }
    
    public canGoPush():Square[] | null{
        return this.canGoPush();
    }


}