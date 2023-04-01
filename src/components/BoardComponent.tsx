import React, { FunctionComponent } from 'react';
import SquareComponent from './SquareComponent';
import Board from '../models/Board';
import { Square } from '../models/Square';


interface BoardProps{
    board: Board;
    setBoard: (board:Board) => void;
}
const BoardComponent: FunctionComponent<BoardProps> = ({board,setBoard}) =>{
    return(
        <div className='board'>
            {board.squares.map((row:Square[], index:number) =>  
                <React.Fragment key={index}>
                    {row.map(square=>   
                        <SquareComponent 
                            square={square}
                            key = {square.id}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}
export default BoardComponent;