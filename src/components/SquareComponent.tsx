import React, { FunctionComponent } from "react";
import { Square } from "../models/Square";

interface SquareProps{
    square: Square;
}

const SquareComponent: FunctionComponent<SquareProps> = ({square}) => {
    return(
        <div className={['square', square.color].join(' ')}>

        </div>
    )

}
export default SquareComponent;
