import { Square } from "./Square";
import { Colors } from "./Colors";
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
}
