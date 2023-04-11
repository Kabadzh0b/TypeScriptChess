import React, { FunctionComponent, useState } from 'react';
import SquareComponent from './SquareComponent';
import Board from '../models/Board';
import { Square } from '../models/Square';
import { Colors } from '../models/Colors';
import { King } from '../models/King';


interface BoardProps{
    board: Board;
    setBoard: (board:Board) => void;
}
const BoardComponent: FunctionComponent<BoardProps> = ({board,setBoard}) =>{
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [canGo, setCanGo] = useState<Square[] | null>(null);
    const [turn, setTurn] = useState<Colors>(Colors.White)

    let whiteKing:King = board.whiteKing;
    let blackKing:King = board.blackKing;

    const click = (square:Square) =>{
        if(square === selectedSquare){
            setSelectedSquare(null);
            setCanGo(null);
        }
        else{
            setSelectedSquare(square);
            if(square.figure === null) setCanGo(null);
            else setCanGo(square.figure.canGoPush());
        }
    };

    const move = (selectedSquare:Square, squareTo:Square) => {
        if(selectedSquare.figure?.color === turn && canGo?.includes(squareTo)){
            squareTo.figure = selectedSquare.figure;
            selectedSquare.figure.square = squareTo; 
            selectedSquare.figure = null;
            board.setChecks();
            if (turn === "white" ? !whiteKing.isChecked() : !blackKing.isChecked()){
                if(turn === Colors.White) setTurn(Colors.Black);
                else setTurn(Colors.White);
            }
            else{
                selectedSquare.figure = squareTo.figure;
                squareTo.figure.square = selectedSquare;
                squareTo.figure = null;
            } 
            setSelectedSquare(null);
            setCanGo(null);
            
            
        }
    };

    return(
        <div className='board'>
            {board.squares.map((row:Square[], index:number) =>  
                <React.Fragment key={index}>
                    {row.map(square=>   
                        <SquareComponent 
                            square={square}
                            key = {square.id}
                            isSelected = {selectedSquare===square}
                            selectedSquare={selectedSquare}
                            setIsSelected={click}
                            move = {move}
                            canGo = {canGo}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
}
export default BoardComponent;