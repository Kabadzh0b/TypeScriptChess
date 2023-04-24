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

    let delayTurn:boolean = false;

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

    const move = (selectedSquare:Square, squareTo:Square) => {
        if(selectedSquare.figure?.color === turn && canGo?.includes(squareTo)){
            setSelectedSquare(null);
            setCanGo(null);
            let squareToFigure = squareTo.figure;
            squareTo.figure = selectedSquare.figure;
            selectedSquare.figure.square = squareTo; 
            selectedSquare.figure = null;
            board.setChecks();

            if (turn === "white" ? !whiteKing.isChecked() : !blackKing.isChecked()){
                for(let i = 0; i < 8; i++){
                    if(turn === Colors.White){
                        if(board.FINAL_WHITE_SQUARES[i].figure?.name === FigureNames.Pawn){
                            setChooseFigureMenu(Colors.White);
                            setPawnEvolutionSquare(board.FINAL_WHITE_SQUARES[i]);
                            delayTurn = true;
                        }
                    }
                    else{
                        if(board.FINAL_BLACK_SQUARES[i].figure?.name === FigureNames.Pawn){
                            setChooseFigureMenu(Colors.Black);
                            setPawnEvolutionSquare(board.FINAL_BLACK_SQUARES[i]);
                            delayTurn = true;
                        }
                    }
                }
                if(delayTurn === false){
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
                else{
                    setTurn("Choose figure");
                }
            }
            else{
                selectedSquare.figure = squareTo.figure;
                squareTo.figure.square = selectedSquare;
                squareTo.figure = squareToFigure;
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