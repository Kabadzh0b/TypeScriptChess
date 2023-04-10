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

    public canGoPush(){
        const canGoArray:Square[] | null = [];
        let x:number = this.square.x;
        let y:number = this.square.y;
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
}