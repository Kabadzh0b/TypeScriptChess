import { Colors } from "./Colors";
import { Square } from "./Square";
import logoType from "../pictures/bb.png";

export enum figureNames{
    KING = "king",
    QUEEN = "queen",
    ROOK = "rook",
    BISHOP = "bishop",
    KNIGHT = "knight",
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

    private canGoPushDiagonal(){
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

    private canGoPushHorizontal(){
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
    
    public canGoPush(){
        if(this.name === "bishop"){
            return this.canGoPushDiagonal();
        }
        else if (this.name === "pawn"){
            const canGoArray:Square[] | null = [];
            let x = this.square.x;
            let y = this.square.y;
            if(this.color === "white"){
                if (x === 6){
                    let sq:Square = this.square.board.getSquare(x-1,y);
                    if (sq.figure === null){
                        canGoArray.push(sq)
                        sq = this.square.board.getSquare(x-2,y);
                        if (sq.figure === null){
                            canGoArray.push(sq)
                        }
                    }
                }
                else{
                    let sq:Square = this.square.board.getSquare(x-1,y);
                    if (sq.figure === null){
                        canGoArray.push(sq);
                    }
                }
                if(y === 7){
                    let sq:Square = this.square.board.getSquare(x-1,y-1);
                    if(sq.figure?.color === "black") canGoArray.push(sq);
                }
                else if (y === 0){
                    let sq = this.square.board.getSquare(x-1,y+1);
                    if(sq.figure?.color === "black") canGoArray.push(sq);
                }
                else{
                    let sq:Square = this.square.board.getSquare(x-1,y-1);
                    if(sq.figure?.color === "black") canGoArray.push(sq);
                    sq = this.square.board.getSquare(x-1,y+1);
                    if(sq.figure?.color === "black") canGoArray.push(sq);
                }
            }
            else{
                if (x === 1){
                    let sq:Square = this.square.board.getSquare(x+1,y);
                    if (sq.figure === null){
                        canGoArray.push(sq)
                        sq = this.square.board.getSquare(x+2,y);
                        if (sq.figure === null){
                            canGoArray.push(sq)
                        }
                    }
                }
                else{
                    let sq:Square = this.square.board.getSquare(x+1,y);
                    if (sq.figure === null){
                        canGoArray.push(sq);
                    }
                }
                if(y === 7){
                    let sq:Square = this.square.board.getSquare(x+1,y-1);
                    if(sq.figure?.color === "white") canGoArray.push(sq);
                }
                else if (y === 0){
                    let sq = this.square.board.getSquare(x+1,y+1);
                    if(sq.figure?.color === "white") canGoArray.push(sq);
                }
                else{
                    let sq:Square = this.square.board.getSquare(x+1,y-1);
                    if(sq.figure?.color === "white") canGoArray.push(sq);
                    sq = this.square.board.getSquare(x+1,y+1);
                    if(sq.figure?.color === "white") canGoArray.push(sq);
                }
            }
            return canGoArray;
        }
        else if(this.name === "queen"){
            const canGoArray:Square[] | null = this.canGoPushDiagonal();
            canGoArray.push(...this.canGoPushHorizontal());
            return canGoArray;
        }
        else if(this.name === "rook"){
            return this.canGoPushHorizontal();
        }
        return null;
    }
}