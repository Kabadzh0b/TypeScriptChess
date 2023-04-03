import React, { FunctionComponent } from "react";
import { Square } from "../models/Square";

interface SquareProps{
    square: Square;
    isSelected: boolean;
    selectedSquare:Square | null;
    setIsSelected: (square:Square) => void
    move: (selectedSquare:Square, squareTo:Square) => void
}

const SquareComponent: FunctionComponent<SquareProps> = ({square, isSelected, setIsSelected, move, selectedSquare}) => {
    return(
        <div onClick={() => {selectedSquare !== square && selectedSquare !==null ? move(selectedSquare, square) : setIsSelected(square); }}  className={['square', square.color, isSelected ? "selected" : ""].join(' ')}>
            <div className="figure" >
                {square.figure?.logo && <img src={square.figure.logo} alt="figure"/>}
            </div>
        </div>
    )

}
export default SquareComponent;
