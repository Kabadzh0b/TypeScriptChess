import { Colors } from "./Colors";
import { Figure, figureNames } from "./Figure";
import { Square } from "./Square";
import blackLogo from "../pictures/bb.png";
import whiteLogo from "../pictures/wb.png";

export class Bishop extends Figure{
    constructor(color: Colors, square:Square){
        super(color, square);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = figureNames.BISHOP;
    }
    public canGo(canGoArray:Square[],x:number,y:number){
        const sq:Square = this.square.board.getSquare(x,y);
        if (sq.figure === null)canGoArray.push(sq)
        else if (sq.figure.color !== this.color){
            canGoArray.push(sq)
        }
    }
    public canGoPush(){
        const canGoArray:Square[] = [];
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
        return canGoArray;
    }
}