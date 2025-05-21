import React, { FunctionComponent } from 'react';
import { Square } from '../models/Square';

interface SquareProps {
  square: Square;
  isSelected: boolean;
  selectedSquare: Square | null;
  setIsSelected: (square: Square) => void;
  move: (selectedSquare: Square, squareTo: Square) => void;
  canGo: Square[] | null;
}

const SquareComponent: FunctionComponent<SquareProps> = ({
  square,
  isSelected,
  setIsSelected,
  move,
  selectedSquare,
  canGo,
}) => {
  const onClick = () => {
    if (selectedSquare && selectedSquare !== square && selectedSquare.figure) {
      move(selectedSquare, square);
      return;
    }
    setIsSelected(square);
  };

  return (
    <div
      onClick={onClick}
      className={[
        'square',
        square.color,
        isSelected ? 'selected' : '',
        canGo !== null ? (canGo.includes(square) ? 'canGo' : '') : '',
      ].join(' ')}
    >
      <div className="figure">
        {square.figure?.logo && <img src={square.figure.logo} alt="figure" />}
      </div>
    </div>
  );
};
export default SquareComponent;
