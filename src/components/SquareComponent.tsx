import React, { FunctionComponent } from "react";
import { Square } from "../models/Square";

interface SquareProps{
    square: Square;
    isSelected: boolean;
    selectedSquare:Square | null;
    setIsSelected: (square:Square) => void
    move: (selectedSquare:Square, squareTo:Square) => void
    canGo: Square[] | null
    setCanGo: (squares:Square[] | null) => void
}

const SquareComponent: FunctionComponent<SquareProps> = ({square, isSelected, setIsSelected, move, selectedSquare, canGo}) => {
    return(
        <div onClick={() => {selectedSquare !== square && selectedSquare !==null && selectedSquare.figure !== null? move(selectedSquare, square) : setIsSelected(square); }}  className={['square', square.color, isSelected ? "selected" : "", canGo !== null ? canGo.includes(square) ? "canGo" : "" : ""].join(' ')}>
            <div className="figure" >
                {square.figure?.logo && <img src={square.figure.logo} alt="figure"/>}
            </div>
        </div>
    )

}
export default SquareComponent;
