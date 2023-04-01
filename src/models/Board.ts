import { Square } from "./Square";
import { Colors } from "./Colors";
import { Pawn } from "./Pawn";
import { Rook } from "./Rook";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Queen } from "./Queen";
import { King } from "./King";
export default class Board{
    squares: Square[][] = [];

    public initCells(){
        for(let i = 0; i < 8; i++){
            const row: Square[] = [];
            for(let j = 0; j < 8; j++){
                if((i+j)%2 === 0){
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
            new Pawn(Colors.BLACK,this.getSquare(1,i));
            new Pawn(Colors.WHITE,this.getSquare(6,i));
        }
    }
    
    public placeRooks(){
        new Rook(Colors.BLACK, this.getSquare(0,0));
        new Rook(Colors.BLACK, this.getSquare(0,7));
        new Rook(Colors.WHITE, this.getSquare(7,0));
        new Rook(Colors.WHITE, this.getSquare(7,7));
    }

    public placeKnights(){
        new Knight(Colors.BLACK, this.getSquare(0,1));
        new Knight(Colors.BLACK, this.getSquare(0,6));
        new Knight(Colors.WHITE, this.getSquare(7,1));
        new Knight(Colors.WHITE, this.getSquare(7,6));
    }

    public placeBishops(){
        new Bishop(Colors.BLACK, this.getSquare(0,2));
        new Bishop(Colors.BLACK, this.getSquare(0,5));
        new Bishop(Colors.WHITE, this.getSquare(7,2));
        new Bishop(Colors.WHITE, this.getSquare(7,5));
    }

    public placeQueen(){
        new Queen(Colors.BLACK, this.getSquare(0,3));
        new Queen(Colors.WHITE, this.getSquare(7,3));
    }

    public placeKing(){
        new King(Colors.BLACK, this.getSquare(0,4));
        new King(Colors.WHITE, this.getSquare(7,4));
    }

    public placeFigures(){
        this.placePawns();
        this.placeRooks();
        this.placeKnights();
        this.placeBishops();
        this.placeQueen();
        this.placeKing();
    }
}
