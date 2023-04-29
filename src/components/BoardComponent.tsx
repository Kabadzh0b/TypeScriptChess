import React, { FunctionComponent, useState } from 'react';
import SquareComponent from './SquareComponent';
import Board from '../models/Board';
import { Square } from '../models/Square';
import { Colors } from '../models/Colors';
import { King } from '../models/King';
import { FigureNames } from '../models/Figure';
import { Queen } from '../models/Queen';
import { Bishop } from '../models/Bishop';
import { Knight } from '../models/Knight';
import { Rook } from '../models/Rook';

import blackQueenLogo from "../pictures/bq.png";
import whiteQueenLogo from "../pictures/wq.png";
import blackBishopLogo from "../pictures/bb.png";
import whiteBishopLogo from "../pictures/wb.png";
import blackKnightLogo from "../pictures/bn.png";
import whiteKnightLogo from "../pictures/wn.png";
import blackRookLogo from "../pictures/br.png";
import whiteRookLogo from "../pictures/wr.png";

interface BoardProps{
    board: Board;
    setBoard: (board:Board) => void;
}
const BoardComponent: FunctionComponent<BoardProps> = ({board,setBoard}) =>{
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [canGo, setCanGo] = useState<Square[] | null>(null);
    const [turn, setTurn] = useState<Colors | string>(Colors.White);
    const [chooseFigureMenu,setChooseFigureMenu] = useState<Colors | null>(null);
    const [pawnEvolutionSquare, setPawnEvolutionSquare] = useState<Square | null>(null);

    const whiteKing:King = board.whiteKing;
    const blackKing:King = board.blackKing;

    const click = (square:Square) =>{
        if(square === selectedSquare){
            setSelectedSquare(null);
            setCanGo(null);
        }
        else{
            setSelectedSquare(square);
            if(square.figure === null) setCanGo(null);
            else {
                setCanGo(square.figure.canGoPush());
            }
        }
    };

    const endTurn = () => {
        if(turn === Colors.White){
            if(blackKing.isChecked()){
                if(blackKing.isCheckmate()){
                    setTurn("White wins");
                    return; 
                }
            }
            setTurn(Colors.Black);
        } 
        else{
            if(whiteKing.isChecked()){
                if(whiteKing.isCheckmate()){
                    setTurn("Black wins");
                    return;
                }
            }
            setTurn(Colors.White);
        }
    }

    const isPawnCanEvolve = ():boolean => {
        for(let i = 0; i < 8; i++){
            if(turn === Colors.White){
                if(board.FINAL_WHITE_SQUARES[i].figure?.name === FigureNames.Pawn){
                    setPawnEvolutionSquare(board.FINAL_WHITE_SQUARES[i]);
                    return true;
                }
            }
            else{
                if(board.FINAL_BLACK_SQUARES[i].figure?.name === FigureNames.Pawn){
                    setPawnEvolutionSquare(board.FINAL_BLACK_SQUARES[i]);
                    return true;
                }
            }
        }
        return false;
    }

    const shortCastling = (selectedSquare:Square, squareTo:Square) => {
        squareTo.figure = selectedSquare.figure;
        selectedSquare.figure!.square = squareTo; 
        selectedSquare.figure = null;
        const ROOK_SQUARE = board.getSquare(squareTo.x,squareTo.y+1);
        const ROOK_SQUARE_TO = board.getSquare(squareTo.x,squareTo.y-1);
        ROOK_SQUARE_TO.figure = ROOK_SQUARE.figure;
        ROOK_SQUARE.figure!.square = ROOK_SQUARE_TO;
        ROOK_SQUARE.figure = null;
    }

    const longCastling = (selectedSquare:Square, squareTo:Square) => {
        squareTo.figure = selectedSquare.figure;
        selectedSquare.figure!.square = squareTo; 
        selectedSquare.figure = null;
        const ROOK_SQUARE = board.getSquare(squareTo.x,squareTo.y-2);
        const ROOK_SQUARE_TO = board.getSquare(squareTo.x,squareTo.y+1);
        ROOK_SQUARE_TO.figure = ROOK_SQUARE.figure;
        ROOK_SQUARE.figure!.square = ROOK_SQUARE_TO;
        ROOK_SQUARE.figure = null;
    }

    const move = (selectedSquare:Square, squareTo:Square) => {
        if(selectedSquare.figure?.color === turn && canGo?.includes(squareTo)){
            setSelectedSquare(null);
            setCanGo(null);
            if(selectedSquare.figure instanceof King && squareTo.y === selectedSquare.y + 2){
                shortCastling(selectedSquare,squareTo);
                endTurn();
            }
            else if(selectedSquare.figure instanceof King &&     squareTo.y === selectedSquare.y - 2){
                longCastling(selectedSquare,squareTo);
                endTurn();
            }
            else{
                let squareToFigure = squareTo.figure;
                squareTo.figure = selectedSquare.figure;
                selectedSquare.figure.square = squareTo; 
                selectedSquare.figure = null;
                board.setChecks();

                if (turn === Colors.White ? !whiteKing.isChecked() : !blackKing.isChecked()){
                    if(isPawnCanEvolve()){
                        turn === Colors.White ? 
                        setChooseFigureMenu(Colors.White) :
                        setChooseFigureMenu(Colors.Black);
                        setTurn("Choose figure");
                    }
                    else{
                        endTurn();
                        if(squareTo.figure instanceof Rook || squareTo.figure instanceof King){
                            squareTo.figure.moved = true;
                        }
                    }
                }
                else{
                    selectedSquare.figure = squareTo.figure;
                    squareTo.figure.square = selectedSquare;
                    squareTo.figure = squareToFigure;
                }
            }
            
        }
        else{
            setSelectedSquare(null);
            setCanGo(null);
        }
    };

    return(
        <div>
            <div>
                <h1>Turn: {turn}</h1>
            </div>
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
            <div className={chooseFigureMenu === null ? "hidden" : ""}>
                <div className={chooseFigureMenu === Colors.White ? "" : "hidden"}>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Queen); setTurn(Colors.Black)}} className="chooseFigure"><img className='square img' src={whiteQueenLogo} alt="figure"/></div>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Rook); setTurn(Colors.Black)}} className="chooseFigure"><img className='square img' src={whiteRookLogo} alt="figure"/></div>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Bishop); setTurn(Colors.Black)}} className="chooseFigure"><img className='square img' src={whiteBishopLogo} alt="figure"/></div>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Knight); setTurn(Colors.Black)}} className="chooseFigure"><img className='square img' src={whiteKnightLogo} alt="figure"/></div>
                </div>
                <div className={chooseFigureMenu === Colors.Black ? "" : "hidden"}>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Queen); setTurn(Colors.White)}} className="chooseFigure"><img className='square img' src={blackQueenLogo} alt="figure"/></div>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Rook); setTurn(Colors.White)}} className="chooseFigure"><img className='square img' src={blackRookLogo} alt="figure"/></div>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Bishop); setTurn(Colors.White)}} className="chooseFigure"><img className='square img' src={blackBishopLogo} alt="figure"/></div>
                    <div onClick={() =>{setChooseFigureMenu(null); board.pawnEvolution(pawnEvolutionSquare!, Knight); setTurn(Colors.White)}} className="chooseFigure"><img className='square img' src={blackKnightLogo} alt="figure"/></div>
                </div>
            </div>
        </div>
        
    );
}
export default BoardComponent;

/*

*/