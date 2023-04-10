import Board from "./Board";
import { Colors } from "./Colors"
import { Figure } from "./Figure"

export class Square{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    id: number;
    board:Board;

    constructor(board:Board, x:number,y:number,Color:Colors,Figure:Figure | null){
        this.x = x;
        this.y = y;
        this.color = Color;
        this.figure = Figure;
        this.id = x+y;
        this.board = board;
    }
}