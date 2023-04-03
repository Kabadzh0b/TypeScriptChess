import React, { FunctionComponent } from "react";
import { Square } from "../models/Square";

interface SquareProps{
    square: Square;
    isSelected: boolean;
    setIsSelected: (square:Square) => void
}

const SquareComponent: FunctionComponent<SquareProps> = ({square, isSelected, setIsSelected}) => {
    return(
        <div onClick={() => setIsSelected(square)}  className={['square', square.color, isSelected ? "selected" : ""].join(' ')}>
            <div className="figure" >
                {square.figure?.logo && <img src={square.figure.logo} alt="figure"/>}
            </div>
        </div>
    )

}
export default SquareComponent;
