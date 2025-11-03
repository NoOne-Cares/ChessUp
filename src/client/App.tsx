// import { navigateTo } from '@devvit/web/client';
// import { useCounter } from './hooks/useCounter';
import NewPuzzle from './components/newPuuzzle';
import ChessPuzzlesContainer from './components/Puzzle';
import ChessPuzzle from './components/Puzzle';
const puzzles: Puzzle[] = [
  {
    id: 'puzzle1',
    description: 'White to move, checkmate in 2',
    initialFEN: '8/8/8/8/8/1bq2k/1cN2Q/1N6 w - - 0 1', // example FEN
    solutionMoves: [
      { from: 'd2', to: 'c3' },
      { from: 'e4', to: 'c3' },
      { from: 'b1', to: 'd2' },
    ],
  },
  {
    id: 'puzzle2',
    description: 'Another puzzle example',
    initialFEN: '8/8/8/8/8/8/8/8 w - - 0 1',
    solutionMoves: [
      { from: 'a2', to: 'a4' },
      { from: 'b7', to: 'b5' },
    ],
  },
];

export const App = () => {
  // const { count, username, loading, increment, decrement } = useCounter();
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4">
      <NewPuzzle />
      {/* <div>
        {puzzles.map((p) => (
          <ChessPuzzlesContainer />
        ))}
      </div> */}
      {/* <img className="object-contain w-1/2 max-w-[250px] mx-auto" src="/snoo.png" alt="Snoo" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center text-gray-900 ">
          {username ? `Hey ${username} 👋` : ''}
        </h1>
        <p className="text-base text-center text-gray-600 ">
          Edit <span className="bg-[#e5ebee]  px-1 py-0.5 rounded">src/client/App.tsx</span> to get
          started.
        </p>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button
          className="flex items-center justify-center bg-[#d93900] text-white w-14 h-14 text-[2.5em] rounded-full cursor-pointer font-mono leading-none transition-colors"
          onClick={decrement}
          disabled={loading}
        >
          -
        </button>
        <span className="text-[1.8em] font-medium mx-5 min-w-[50px] text-center leading-none text-gray-900">
          {loading ? '...' : count}
        </span>
        <button
          className="flex items-center justify-center bg-[#d93900] text-white w-14 h-14 text-[2.5em] rounded-full cursor-pointer font-mono leading-none transition-colors"
          onClick={increment}
          disabled={loading}
        >
          +
        </button>
      </div>
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 text-[0.8em] text-gray-600">
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://developers.reddit.com/docs')}
        >
          Docs
        </button>
        <span className="text-gray-300">|</span>
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
        >
          r/Devvit
        </button>
        <span className="text-gray-300">|</span>
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
        >
          Discord
        </button>
      </footer> */}
    </div>
  );
};
