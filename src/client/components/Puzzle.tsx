// import React, { useEffect, useState } from 'react';
// import { Chessboard, PieceDropHandlerArgs, PositionDataType } from 'react-chessboard';
// // default import

// type Move = {
//     from: string;
//     to: string;
// };

// type Puzzle = {
//     id: string;
//     description: string;
//     initialFEN: string;
//     solutionMoves: Move[];
// };

// type ChessPuzzleProps = {
//     puzzle: Puzzle;
// };

// const ChessPuzzle: React.FC<ChessPuzzleProps> = ({ puzzle }) => {
//     // Type the game as 'any' or as 'Chess' (the class) if you need strict typing
//     const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
//     const [position, setPosition] = useState({
//         a4: {
//             pieceType: 'bR'
//         },
//         c4: {
//             pieceType: 'bK'
//         },
//         e4: {
//             pieceType: 'bN'
//         },
//         d3: {
//             pieceType: 'bP'
//         },
//         f3: {
//             pieceType: 'bQ'
//         },
//         c2: {
//             pieceType: 'wN'
//         },
//         d2: {
//             pieceType: 'wQ'
//         },
//         b1: {
//             pieceType: 'wN'
//         }
//     } as PositionDataType);

//     // as the squareStyles prop applies within a square instead of the whole square, we wouldn't be able to hide the squares with this prop
//     // instead, we hide the squares by getting the square elements by their id and setting the display to none
//     // "mini-puzzles" being the id we gave to the chessboard
//     // useEffect(() => {
//     //     const e1 = document.getElementById('mini-puzzles-square-e1');
//     //     const f1 = document.getElementById('mini-puzzles-square-f1');
//     //     if (e1) {
//     //         e1.style.display = 'none';
//     //     }
//     //     if (f1) {
//     //         f1.style.display = 'none';
//     //     }
//     // }, []);

//     // moves for the puzzle
//     const moves = [{
//         sourceSquare: 'd2',
//         targetSquare: 'c3'
//     }, {
//         sourceSquare: 'e4',
//         targetSquare: 'c3'
//     }, {
//         sourceSquare: 'b1',
//         targetSquare: 'd2'
//     }];

//     // handle piece drop
//     function onPieceDrop({
//         sourceSquare,
//         targetSquare,
//         piece
//     }: PieceDropHandlerArgs) {
//         const requiredMove = moves[currentMoveIndex];

//         // check if the move is valid
//         if (requiredMove?.sourceSquare !== sourceSquare || requiredMove.targetSquare !== targetSquare) {
//             // return false as the move is not valid
//             return false;
//         }

//         // update the position
//         const newPosition = {
//             ...position
//         };
//         newPosition[targetSquare] = {
//             pieceType: piece.pieceType
//         };
//         delete newPosition[sourceSquare];
//         setPosition(newPosition);

//         // increment the current move index
//         setCurrentMoveIndex(prev => prev + 1);

//         // define makeCpuMove inside onPieceDrop to capture current values
//         const makeCpuMove = () => {
//             const nextMoveIndex = currentMoveIndex + 1;

//             // if there is another move, make it
//             if (nextMoveIndex < moves.length) {
//                 const move = moves[nextMoveIndex];
//                 const updatedPosition = {
//                     ...newPosition
//                 };
//                 updatedPosition[move.targetSquare] = {
//                     pieceType: updatedPosition[move.sourceSquare].pieceType
//                 };
//                 delete updatedPosition[move.sourceSquare];
//                 setPosition(updatedPosition);
//                 setCurrentMoveIndex(nextMoveIndex + 1);
//             }
//         };

//         // make the cpu move
//         setTimeout(makeCpuMove, 200);

//         // return true as the move was successful
//         return true;
//     }

//     // only allow white pieces to be dragged
//     function canDragPiece({
//         piece
//     }: PieceHandlerArgs) {
//         return piece.pieceType[0] === 'w';
//     }

//     // set the chessboard options
//     const chessboardOptions = {
//         canDragPiece,
//         onPieceDrop,
//         chessboardRows: 4,
//         chessboardColumns: 6,
//         position,
//         id: 'mini-puzzles'
//     };

//     // render the chessboard
//     return <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//         alignItems: 'center'
//     }}>
//         <div style={{
//             fontSize: '1.5rem',
//             fontWeight: 'bold'
//         }}>
//             White to move, checkmate in 2
//         </div>

//         <Chessboard options={chessboardOptions} />
//     </div>;
// };

// export default ChessPuzzle;

import React, { useEffect, useRef, useState } from 'react';
import { Chessboard, PieceDropHandlerArgs, PositionDataType } from 'react-chessboard';
import { Chess } from 'chess.js';
type Move = {
    from: string;
    to: string;
};

type Puzzle = {
    id: string;
    description: string;
    initialPosition: PositionDataType;
    solutionMoves: Move[];
};

// ---- Puzzle Data ----
const puzzles: Puzzle[] = [
    {
        id: 'puzzle1',
        description: 'White to move, mate in 2',
        initialPosition: {
            c8: { pieceType: 'bR' },
            f8: { pieceType: 'bK' },

            a7: { pieceType: 'bP' },
            d7: { pieceType: 'bP' },
            f7: { pieceType: 'bP' },
            g7: { pieceType: 'bP' },
            h7: { pieceType: 'bP' },

            a6: { pieceType: 'bB' },
            e6: { pieceType: 'bP' },

            d5: { pieceType: 'bP' },
            e5: { pieceType: 'wP' },

            b3: { pieceType: 'wP' },
            g3: { pieceType: 'wR' },

            a2: { pieceType: 'bQ' },
            f2: { pieceType: 'wP' },
            g2: { pieceType: 'wP' },
            h2: { pieceType: 'wP' },

            a1: { pieceType: 'wQ' },
            g1: { pieceType: 'wK' }
        },
        solutionMoves: [
            { from: 'a1', to: 'a2' },
            { from: 'c8', to: 'c1' }
        ]
    }

    ,
    {
        id: 'puzzle2',
        description: 'White to move, win material then mate in 2',
        initialPosition: {
            e5: { pieceType: 'bQ' },
            g7: { pieceType: 'bK' },
            d4: { pieceType: 'wQ' },
            f3: { pieceType: 'wN' },
            h2: { pieceType: 'wR' }
        },
        solutionMoves: [
            { from: 'd4', to: 'g7' },
            { from: 'e5', to: 'g7' },
            { from: 'f3', to: 'g5' }
        ]
    },
    {
        id: 'puzzle3',
        description: 'White to move, simple fork tactic then mate',
        initialPosition: {
            f6: { pieceType: 'bK' },
            d6: { pieceType: 'bP' },
            e5: { pieceType: 'bQ' },
            c4: { pieceType: 'wN' },
            e4: { pieceType: 'wB' },
            g4: { pieceType: 'wP' }
        },
        solutionMoves: [
            { from: 'c4', to: 'e5' },
            { from: 'f6', to: 'd5' },
            { from: 'e4', to: 'd5' }
        ]
    },
    {
        id: 'puzzle4',
        description: 'White to move, back-rank weakness',
        initialPosition: {
            g8: { pieceType: 'bK' },
            f8: { pieceType: 'bR' },
            h7: { pieceType: 'bP' },
            g7: { pieceType: 'wR' },
            f6: { pieceType: 'wQ' },
            e6: { pieceType: 'wB' }
        },
        solutionMoves: [
            { from: 'g7', to: 'g8' },
            { from: 'f8', to: 'g8' },
            { from: 'f6', to: 'f8' }
        ]
    },
    {
        id: 'puzzle5',
        description: 'White to move, strong queen sacrifice then mate',
        initialPosition: {
            h8: { pieceType: 'bK' },
            g8: { pieceType: 'bR' },
            f7: { pieceType: 'bP' },
            e7: { pieceType: 'wQ' },
            g6: { pieceType: 'wB' },
            f6: { pieceType: 'wN' }
        },
        solutionMoves: [
            { from: 'e7', to: 'f7' },
            { from: 'g8', to: 'f7' },
            { from: 'f6', to: 'h7' }
        ]
    },
    {
        id: 'puzzle6',
        description: 'White to move, smothered mate theme',
        initialPosition: {
            g1: { pieceType: 'bK' },
            f3: { pieceType: 'wN' },
            h3: { pieceType: 'wN' },
            g2: { pieceType: 'wP' },
            f2: { pieceType: 'wP' }
        },
        solutionMoves: [
            { from: 'h3', to: 'f4' },
            { from: 'g1', to: 'f2' },
            { from: 'f3', to: 'h2' }
        ]
    },
    {
        id: 'puzzle7',
        description: 'White to move, discovered check then mate',
        initialPosition: {
            e1: { pieceType: 'bK' },
            d3: { pieceType: 'wB' },
            e3: { pieceType: 'wQ' },
            c2: { pieceType: 'wP' },
            f2: { pieceType: 'wN' }
        },
        solutionMoves: [
            { from: 'e3', to: 'e1' },
            { from: 'd3', to: 'e2' },
            { from: 'c2', to: 'c4' }
        ]
    },
    {
        id: 'puzzle8',
        description: 'White to move, pin tactic then mate',
        initialPosition: {
            d8: { pieceType: 'bK' },
            c7: { pieceType: 'bP' },
            b6: { pieceType: 'wR' },
            d6: { pieceType: 'wB' },
            e5: { pieceType: 'wQ' }
        },
        solutionMoves: [
            { from: 'e5', to: 'd6' },
            { from: 'c7', to: 'd6' },
            { from: 'b6', to: 'b8' }
        ]
    },
    {
        id: 'puzzle9',
        description: 'White to move, double-check and mate',
        initialPosition: {
            h1: { pieceType: 'bK' },
            g2: { pieceType: 'wR' },
            f2: { pieceType: 'wB' },
            e3: { pieceType: 'wQ' }
        },
        solutionMoves: [
            { from: 'g2', to: 'g1' },
            { from: 'h1', to: 'g1' },
            { from: 'e3', to: 'e2' }
        ]
    },
    {
        id: 'puzzle10',
        description: 'White to move, classic rook lift then mate',
        initialPosition: {
            a8: { pieceType: 'bK' },
            a7: { pieceType: 'bP' },
            g1: { pieceType: 'wR' },
            h2: { pieceType: 'wN' },
            e4: { pieceType: 'wQ' }
        },
        solutionMoves: [
            { from: 'g1', to: 'g7' },
            { from: 'a7', to: 'a6' },
            { from: 'e4', to: 'a8' }
        ]
    },
    {
        id: 'puzzle11',
        description: 'White to move, cross-pin then mate',
        initialPosition: {
            d1: { pieceType: 'bK' },
            d2: { pieceType: 'bQ' },
            c3: { pieceType: 'wB' },
            e3: { pieceType: 'wR' },
            f4: { pieceType: 'wN' }
        },
        solutionMoves: [
            { from: 'e3', to: 'd3' },
            { from: 'd2', to: 'e2' },
            { from: 'f4', to: 'd2' }
        ]
    },
    {
        id: 'puzzle12',
        description: 'White to move, decoy then mate',
        initialPosition: {
            g5: { pieceType: 'bK' },
            g6: { pieceType: 'bP' },
            e7: { pieceType: 'wQ' },
            f6: { pieceType: 'wR' },
            h4: { pieceType: 'wB' }
        },
        solutionMoves: [
            { from: 'f6', to: 'f7' },
            { from: 'g6', to: 'f7' },
            { from: 'e7', to: 'g7' }
        ]
    },
    {
        id: 'puzzle13',
        description: 'White to move, bridge sacrifice then mate',
        initialPosition: {
            h6: { pieceType: 'bK' },
            g6: { pieceType: 'bP' },
            h4: { pieceType: 'wR' },
            g4: { pieceType: 'wB' },
            f5: { pieceType: 'wQ' }
        },
        solutionMoves: [
            { from: 'h4', to: 'h5' },
            { from: 'g6', to: 'h5' },
            { from: 'f5', to: 'h6' }
        ]
    },
    {
        id: 'puzzle14',
        description: 'White to move, clearance sacrifice then mate',
        initialPosition: {
            b8: { pieceType: 'bK' },
            a7: { pieceType: 'bP' },
            c7: { pieceType: 'wB' },
            d5: { pieceType: 'wQ' },
            e3: { pieceType: 'wN' }
        },
        solutionMoves: [
            { from: 'd5', to: 'b7' },
            { from: 'a7', to: 'b7' },
            { from: 'e3', to: 'b7' }
        ]
    },
    {
        id: 'puzzle15',
        description: 'White to move, interference theme then mate',
        initialPosition: {
            f8: { pieceType: 'bK' },
            g8: { pieceType: 'bR' },
            e6: { pieceType: 'wQ' },
            d5: { pieceType: 'wB' },
            c4: { pieceType: 'wP' }
        },
        solutionMoves: [
            { from: 'd5', to: 'g8' },
            { from: 'g8', to: 'f8' },
            { from: 'e6', to: 'f8' }
        ]
    }
];


// ---- ChessPuzzle Component ----
type ChessPuzzleProps = {
    puzzle: Puzzle;
};

const ChessPuzzle: React.FC<ChessPuzzleProps> = ({ puzzle }) => {
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
    const [position, setPosition] = useState<PositionDataType>(puzzle.initialPosition);
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;
    const [chessPosition, setChessPosition] = useState(chessGame.fen(`8/P7/7K/8/8/8/8/k7 w - - 0 1`))
    const [orientation, setOrientation] = useState<"white" | "black">("white");
    // hide specific squares (example)
    // useEffect(() => {
    //     const e1 = document.getElementById('mini-puzzles-square-e1');
    //     const f1 = document.getElementById('mini-puzzles-square-f1');
    //     if (e1) e1.style.display = 'none';
    //     if (f1) f1.style.display = 'none';
    // }, [puzzle.id]);

    useEffect(() => {
        setPosition(puzzle.initialPosition);
        const turn = chessPosition.split(" ")[1]; // "w" or "b"
        setOrientation(turn === "w" ? "black" : "white");
        setCurrentMoveIndex(0);
    }, [puzzle]);

    const moves = puzzle.solutionMoves;

    // handle piece drop
    function onPieceDrop({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) {
        const requiredMove = moves[currentMoveIndex];


        if (!requiredMove || requiredMove.from !== sourceSquare || requiredMove.to !== targetSquare) {
            return false;
        }

        // update position
        const newPosition = { ...position };
        newPosition[targetSquare] = { pieceType: piece.pieceType };
        delete newPosition[sourceSquare];
        setPosition(newPosition);

        // increment move index
        setCurrentMoveIndex((prev) => prev + 1);

        // CPU move
        const makeCpuMove = () => {
            const nextMoveIndex = currentMoveIndex + 1;
            if (nextMoveIndex < moves.length) {
                const move = moves[nextMoveIndex];
                const updatedPosition = { ...newPosition };
                if (updatedPosition[move.from]) {
                    updatedPosition[move.to] = { pieceType: updatedPosition[move.from].pieceType };
                    delete updatedPosition[move.from];
                    setPosition(updatedPosition);
                    setCurrentMoveIndex(nextMoveIndex + 1);
                }
            }
        };

        setTimeout(makeCpuMove, 300);
        return true;
    }

    function canDragPiece({ piece }: { piece: { pieceType: string } }) {
        return piece.pieceType[0] === 'w';
    }

    const chessboardOptions = {
        canDragPiece,
        onPieceDrop,
        boardOrientation: orientation,
        chessboardRows: 8,
        chessboardColumns: 8,
        position,
        id: 'mini-puzzles'
    };


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
            }}
        >
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{puzzle.description}</div>
            <Chessboard options={chessboardOptions} />
        </div>
    );
};

// ---- Container Component ----
const ChessPuzzlesContainer: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => setCurrentIndex((prev) => (prev < puzzles.length - 1 ? prev + 1 : prev));
    const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const currentPuzzle = puzzles[currentIndex];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}
        >
            <h2>Mini Chess Puzzles</h2>
            <ChessPuzzle puzzle={currentPuzzle} key={currentPuzzle.id} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={handlePrev} disabled={currentIndex === 0}>
                    ⬅ Previous
                </button>
                <span>
                    Puzzle {currentIndex + 1} of {puzzles.length}
                </span>
                <button onClick={handleNext} disabled={currentIndex === puzzles.length - 1}>
                    Next ➡
                </button>
            </div>
        </div>
    );
};

export default ChessPuzzlesContainer;
