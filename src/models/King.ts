import { Colors } from "./Colors";
import { Figure, FigureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bk.png";
import whiteLogo from "../pictures/wk.png";

export class King extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.White? whiteLogo : blackLogo;
        this.name = FigureNames.King;
    }

    public isChecked(){
        if(this.color === "white" && this.square.board.blackChecks.includes(this.square)){
            console.log("White king is under attack!");
            return true;
        }
        else if(this.color === "black" && this.square.board.whiteChecks.includes(this.square)){
            console.log("Black king is under attack!");
            return true;
        }
        return false;
    }

    public isCheckmate = (): boolean => {
        return !this.square.board.squares.some((row: Square[], index: number) =>
          row.some((square: Square) => {
            if (square.figure !== null && square.figure.color === this.color) {
              const canGoPush: Square[] = square.figure.canGoPush();
              if (canGoPush) {
                for (const squareTo of canGoPush) {
                  const squareToFigure = squareTo.figure;
                  squareTo.figure = square.figure;
                  square.figure.square = squareTo;
                  square.figure = null;
                  this.square.board.setChecks();
                  if (!this.isChecked()) {
                    square.figure = squareTo.figure;
                    squareTo.figure.square = square;
                    squareTo.figure = squareToFigure;
                    this.square.board.setChecks();
                    return true; // not a checkmate position
                  }
                  square.figure = squareTo.figure;
                  squareTo.figure.square = square;
                  squareTo.figure = squareToFigure;
                  this.square.board.setChecks();
                }
              }
            }
            return false; // continue searching
          })
        );
    };

    public canGoPush(){
        const canGoArray:Square[] | null = [];
        let x:number = this.square.x;
        let y:number = this.square.y;
        if(x > 0 && y > 0){
            super.canGo(canGoArray,x-1,y-1);
        }
        if(x > 0 && y < 7){
            super.canGo(canGoArray,x-1,y+1);
        }
        if(x > 0){
            super.canGo(canGoArray,x-1,y);
        }
        if(x < 7 && y > 0){
            super.canGo(canGoArray,x+1,y-1);
        }
        if(x < 7){
            super.canGo(canGoArray,x+1,y);
        }
        if(x < 7 && y < 7){
            super.canGo(canGoArray,x+1,y+1);
        }
        if(y>0){
            super.canGo(canGoArray,x,y-1);
        }
        if(y<7){
            super.canGo(canGoArray,x,y+1);
        }
        return canGoArray;
    }
}