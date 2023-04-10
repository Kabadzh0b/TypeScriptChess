import { Colors } from "./Colors";
import { Figure, figureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bn.png";
import whiteLogo from "../pictures/wn.png";

export class Knight extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = figureNames.KNIGHT;
    }

    public canGoPush(){
        const canGoArray:Square[] | null = [];
        let x:number = this.square.x;
        let y:number = this.square.y;
        if(x > 1 && y > 0 && y < 7){
            this.canGo(canGoArray,x-2,y-1);
            this.canGo(canGoArray,x-2,y+1);
        }
        if(x < 6 && y > 0 && y < 7){
            this.canGo(canGoArray,x+2,y-1);
            this.canGo(canGoArray,x+2,y+1);
        }
        if(y > 1 && x > 0 && x < 7){
            this.canGo(canGoArray,x+1,y-2);
            this.canGo(canGoArray,x-1,y-2);
        }
        if(y < 6 && x > 0 && x < 7){
            this.canGo(canGoArray,x+1,y+2);
            this.canGo(canGoArray,x-1,y+2);
        }
        if(x === 0 && y === 0){
            this.canGo(canGoArray, x+1, y+2);
            this.canGo(canGoArray, x+2, y+1);
        }
        if(x === 0 && y === 7){
            this.canGo(canGoArray, x+1, y-2);
            this.canGo(canGoArray, x+2, y-1);
        }
        if(x === 7 && y === 0){
            this.canGo(canGoArray, x-1, y+2);
            this.canGo(canGoArray, x-2, y+1);
        }
        if(x === 7 && y === 7){
            this.canGo(canGoArray, x-1, y-2);
            this.canGo(canGoArray, x-2, y-1);
        }
        return canGoArray;
    }
}