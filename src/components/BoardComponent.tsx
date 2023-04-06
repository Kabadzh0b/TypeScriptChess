import React, { FunctionComponent, useState } from 'react';
import SquareComponent from './SquareComponent';
import Board from '../models/Board';
import { Square } from '../models/Square';


interface BoardProps{
    board: Board;
    setBoard: (board:Board) => void;
}
const BoardComponent: FunctionComponent<BoardProps> = ({board,setBoard}) =>{
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [canGo, setCanGo] = useState<Square[] | null>(null); 

    const click = (square:Square) =>{
        square === selectedSquare ? setSelectedSquare(null) : setSelectedSquare(square);
    }

    const move = (selectedSquare:Square, squareTo:Square) => {
        squareTo.figure = selectedSquare?.figure;
        selectedSquare.figure = null;
        setSelectedSquare(squareTo);
    }

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
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}
export default BoardComponent;