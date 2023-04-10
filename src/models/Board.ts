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
    whiteChecks:Square[] = []; 
    blackChecks:Square[] = [];
    whiteKing!:King;
    blackKing!:King; 

    public setChecks = ():void => {
        this.whiteChecks = [];
        this.blackChecks = [];
        this.squares.map((row:Square[], index:number) =>  
            {row.map(square=> {
                if(square.figure?.color === "white"){
                    const canGoPush = square.figure.canGoPush();
                    if (canGoPush !== null) this.whiteChecks.push(...canGoPush);
            }
                else if(square.figure?.color === "black"){
                    const canGoPush = square.figure.canGoPush();
                    if (canGoPush !== null) this.blackChecks.push(...canGoPush);
                }
        })})
    };

    public initCells():void{
        for(let i = 0; i < 8; i++){
            const row: Square[] = [];
            for(let j = 0; j < 8; j++){
                if((i+j)%2 === 0){
                    row.push(new Square(this,i,j,Colors.White,null))
                }
                else{
                    row.push(new Square(this,i,j,Colors.Black,null))
                }
            }
            this.squares.push(row);
        }
    }
    
    public getSquare(x:number, y:number):Square{
        return this.squares[x][y];
    }

    public placePawns():void{
        for(let i = 0; i < 8; i++){
            new Pawn(Colors.Black,this.getSquare(1,i));
            new Pawn(Colors.White,this.getSquare(6,i));
        }
    }
    
    public placeRooks():void{
        new Rook(Colors.Black, this.getSquare(0,0));
        new Rook(Colors.Black, this.getSquare(0,7));
        new Rook(Colors.White, this.getSquare(7,0));
        new Rook(Colors.White, this.getSquare(7,7));
    }

    public placeKnights():void{
        new Knight(Colors.Black, this.getSquare(0,1));
        new Knight(Colors.Black, this.getSquare(0,6));
        new Knight(Colors.White, this.getSquare(7,1));
        new Knight(Colors.White, this.getSquare(7,6));
    }

    public placeBishops():void{
        new Bishop(Colors.Black, this.getSquare(0,2));
        new Bishop(Colors.Black, this.getSquare(0,5));
        new Bishop(Colors.White, this.getSquare(7,2));
        new Bishop(Colors.White, this.getSquare(7,5));
    }

    public placeQueen():void{
        new Queen(Colors.Black, this.getSquare(0,3));
        new Queen(Colors.White, this.getSquare(7,3));
    }

    public placeKing():void{
        this.blackKing = new King(Colors.Black, this.getSquare(0,4));
        this.whiteKing = new King(Colors.White, this.getSquare(7,4));
    }

    public placeFigures():void{
        this.placePawns();
        this.placeRooks();
        this.placeKnights();
        this.placeBishops();
        this.placeQueen();
        this.placeKing();
    }
}
