import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Colors } from "../models/Colors";
import Board from "../models/Board";

interface TimerComponentProps {
  turn: Colors | string
  board: Board
  setTurn: any
}

export const TimerComponent: FunctionComponent<TimerComponentProps> = ({ turn, board, setTurn }: TimerComponentProps) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);

  useEffect(() => {
    setBlackTime(300);
    setWhiteTime(300);
  }, [board]);

  useEffect(() => {
    const callback = () => {
      if (turn === Colors.White) {
        setWhiteTime(prev => (prev > 0 ? prev - 1 : 0));
      } else if (turn === Colors.Black) {
        setBlackTime(prev => (prev > 0 ? prev - 1 : 0));
      }
    };

    const interval = window.setInterval(callback, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [turn]);

  useEffect(() => {
    if (whiteTime === 0) setTurn("Black wins");
    if (blackTime === 0) setTurn("White wins");
  }, [whiteTime, blackTime, setTurn])

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }

  return (
    <div className="timer-container">
      <div
        className={`player-card is-black ${turn === Colors.Black ? 'active' : ''}`}
      >
        <span className="player-name">Black</span>
        <span className="player-time">{formatTime(blackTime)}</span>
      </div>

      <div
        className={`player-card is-white ${turn === Colors.White ? 'active' : ''}`}
      >
        <span className="player-name">White</span>
        <span className="player-time">{formatTime(whiteTime)}</span>
      </div>
    </div>
  );
}
