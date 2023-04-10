import { Colors } from "./Colors";
import { Figure, figureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bk.png";
import whiteLogo from "../pictures/wk.png";

export class King extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = figureNames.KING;
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

    public canGoPush(){
        const canGoArray:Square[] | null = [];
        let x:number = this.square.x;
        let y:number = this.square.y;
        if(x > 0 && y > 0){
            this.canGo(canGoArray,x-1,y-1);
        }
        if(x > 0 && y < 7){
            this.canGo(canGoArray,x-1,y+1);
        }
        if(x > 0){
            this.canGo(canGoArray,x-1,y);
        }
        if(x < 7 && y > 0){
            this.canGo(canGoArray,x+1,y-1);
        }
        if(x < 7){
            this.canGo(canGoArray,x+1,y);
        }
        if(x < 7 && y < 7){
            this.canGo(canGoArray,x+1,y+1);
        }
        if(y>0){
            this.canGo(canGoArray,x,y-1);
        }
        if(y<7){
            this.canGo(canGoArray,x,y+1);
        }
        return canGoArray;
    }
}