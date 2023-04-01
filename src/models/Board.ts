import { Square } from "./Square";
import { Colors } from "./Colors";
import { Pawn } from "./Pawn";
export default class Board{
    squares: Square[][] = [];

    public initCells(){
        for(let i = 0; i < 8; i++){
            const row: Square[] = [];
            for(let j = 0; j < 8; j++){
                if((i+j)%2 !== 0){
                    row.push(new Square(this,i,j,Colors.WHITE,null))
                }
                else{
                    row.push(new Square(this,i,j,Colors.BLACK,null))
                }
            }
            this.squares.push(row);
        }
    }
    
    public getSquare(x:number, y:number){
        return this.squares[x][y];
    }

    public placePawns(){
        for(let i = 0; i < 8; i++){
            console.log(1);
            new Pawn(Colors.BLACK,this.getSquare(1,i));
            new Pawn(Colors.WHITE,this.getSquare(6,i));
        }
    }
}
