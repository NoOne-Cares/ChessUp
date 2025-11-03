import React, { useState, useRef, useEffect } from 'react';
import { Chess } from 'chess.js';
import {
    Chessboard,
    PieceDropHandlerArgs,
} from 'react-chessboard';
import { PuzzleData } from '../public/PuzzlesData';

const NewPuzzle: React.FC = () => {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [chessPosition, setChessPosition] = useState(PuzzleData[0]!.fen);
    const [orientation, setOrientation] = useState<"white" | "black">("white");
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
    // ✅ Important: recreate a new Chess instance for each puzzle
    const chessGameRef = useRef(new Chess(PuzzleData[0]!.fen));

    const loadNextPuzzle = () => {
        setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
    const loadPreviousPuzzle = () => {
        if (currentPuzzleIndex == 0) return;
        setCurrentPuzzleIndex(currentPuzzleIndex - 1);
    }

    useEffect(() => {
        const newGame = new Chess(PuzzleData[currentPuzzleIndex]!.fen);
        chessGameRef.current = newGame;
        const turn = chessPosition.split(" ")[1];
        setOrientation(turn === "w" ? "black" : "white");
        setChessPosition(newGame.fen());
        setCurrentMoveIndex(0)
        setTimeout(() => playAutoMove(0), 500);
        console.log("it's running")
    }, [currentPuzzleIndex]);

    const playAutoMove = (moveIndex: number) => {
        if (!PuzzleData[currentPuzzleIndex]?.move.length) return
        if (currentMoveIndex < PuzzleData[currentPuzzleIndex]?.move.length) {
            const move = PuzzleData[currentPuzzleIndex]?.move[moveIndex]
            chessGameRef.current.move({ from: move!.slice(0, 2), to: move!.slice(2, 4) });
            setChessPosition(chessGameRef.current.fen());
            setCurrentMoveIndex(currentMoveIndex + 1);
        }
    }

    function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
        if (!targetSquare) {
            return false;
        }
        console.log(sourceSquare + " " + targetSquare)
        try {
            chessGameRef.current.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q' // always promote to a queen for example simplicity
            });


            // update the game state
            setChessPosition(chessGameRef.current.fen());

            // stop the engine (it will be restarted by the useEffect running findBestMove)


            // reset the best line




            // return true as the move was successful
            return true;
        } catch {
            // return false as the move was not successful
            return false;
        }
    }

    const chessboardOptions = {
        position: chessPosition,
        boardOrientation: orientation,
        onPieceDrop,
        id: 'piece-promotion'
    };
    console.log(orientation)
    return (
        <div>

            <div className="w-full max-w-150 aspect-square mx-auto">
                <Chessboard options={chessboardOptions} />
            </div>
            <div></div>
            <button onClick={loadPreviousPuzzle}>Previous</button>
            <button onClick={loadNextPuzzle}>Next</button>
        </div>
    );
};

export default NewPuzzle;
