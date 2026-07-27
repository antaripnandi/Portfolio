import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Sudoku difficulty levels, removed cell counts, and max hint allocations
export type Difficulty = 'very easy' | 'easy' | 'mid' | 'hard' | 'very very hard';

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; removed: number; maxHints: number; desc: string }> = {
  'very easy': { label: 'Very Easy', removed: 30, maxHints: 5, desc: '51 clues given · 5 hints available' },
  'easy': { label: 'Easy', removed: 40, maxHints: 4, desc: '41 clues given · 4 hints available' },
  'mid': { label: 'Mid', removed: 48, maxHints: 3, desc: '33 clues given · 3 hints available' },
  'hard': { label: 'Hard', removed: 54, maxHints: 2, desc: '27 clues given · 2 hints available' },
  'very very hard': { label: 'Very Very Hard', removed: 60, maxHints: 1, desc: '21 clues given · 1 hint available' }
};

// --- Fast Instant Sudoku Generator (0ms execution, 0 recursion) ---
const BASE_SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

function generateFastSudoku(difficulty: Difficulty) {
  // 1. Copy base solution
  let solution = BASE_SOLUTION.map(row => [...row]);

  // 2. Permute digits randomly (1..9 -> random mapping)
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
  const map: Record<number, number> = {};
  for (let i = 0; i < 9; i++) {
    map[i + 1] = digits[i];
  }
  solution = solution.map(row => row.map(val => map[val]));

  // 3. Randomly swap rows within 3x3 blocks
  for (let b = 0; b < 3; b++) {
    const r1 = b * 3 + Math.floor(Math.random() * 3);
    const r2 = b * 3 + Math.floor(Math.random() * 3);
    if (r1 !== r2) {
      const temp = solution[r1];
      solution[r1] = solution[r2];
      solution[r2] = temp;
    }
  }

  // 4. Randomly swap columns within 3x3 blocks
  for (let b = 0; b < 3; b++) {
    const c1 = b * 3 + Math.floor(Math.random() * 3);
    const c2 = b * 3 + Math.floor(Math.random() * 3);
    if (c1 !== c2) {
      for (let r = 0; r < 9; r++) {
        const temp = solution[r][c1];
        solution[r][c1] = solution[r][c2];
        solution[r][c2] = temp;
      }
    }
  }

  // 5. Random transpose (50% chance)
  if (Math.random() > 0.5) {
    const transposed = Array.from({ length: 9 }, () => Array(9).fill(0));
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        transposed[c][r] = solution[r][c];
      }
    }
    solution = transposed;
  }

  // Create puzzle by clearing cells
  const puzzle = solution.map(row => [...row]);
  const removeCount = DIFFICULTY_CONFIG[difficulty].removed;
  let removed = 0;

  while (removed < removeCount) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }

  const fixed = puzzle.map(row => row.map(val => val !== 0));

  return { solution, puzzle, fixed };
}

// Fast Conflict Checking
function checkConflicts(board: number[][]): boolean[][] {
  const conflicts = Array.from({ length: 9 }, () => Array(9).fill(false));
  if (!board || board.length < 9) return conflicts;

  for (let r = 0; r < 9; r++) {
    if (!board[r]) continue;
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (!val) continue;

      // Check row duplicate
      for (let c2 = 0; c2 < 9; c2++) {
        if (c2 !== c && board[r][c2] === val) {
          conflicts[r][c] = true;
        }
      }
      // Check col duplicate
      for (let r2 = 0; r2 < 9; r2++) {
        if (r2 !== r && board[r2] && board[r2][c] === val) {
          conflicts[r][c] = true;
        }
      }
      // Check box duplicate
      const br = Math.floor(r / 3) * 3;
      const bc = Math.floor(c / 3) * 3;
      for (let r2 = br; r2 < br + 3; r2++) {
        for (let c2 = bc; c2 < bc + 3; c2++) {
          if ((r2 !== r || c2 !== c) && board[r2] && board[r2][c2] === val) {
            conflicts[r][c] = true;
          }
        }
      }
    }
  }

  return conflicts;
}

// Separate Timer Sub-Component to avoid re-rendering grid every second
const SudokuTimerDisplay: React.FC<{
  isRunning: boolean;
  onTick: () => void;
  timerSeconds: number;
}> = React.memo(({ isRunning, onTick, timerSeconds }) => {
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(onTick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  const s = (timerSeconds % 60).toString().padStart(2, '0');

  return <span className="font-bold text-xs sm:text-sm tracking-wider">{m}:{s}</span>;
});

export const SudokuGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialPuzzle, setInitialPuzzle] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>([]);
  const [fixed, setFixed] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [dismissedVictory, setDismissedVictory] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Memoize conflicts so they only recompute when board changes
  const conflicts = useMemo(() => checkConflicts(board), [board]);

  const handleTimerTick = useCallback(() => {
    setTimer(t => t + 1);
  }, []);

  // Start a fresh new board game
  const handleNewBoard = (diff?: Difficulty) => {
    const targetDiff = diff || difficulty || 'easy';
    const { solution: sol, puzzle, fixed: fix } = generateFastSudoku(targetDiff);
    setSolution(sol);
    setInitialPuzzle(puzzle.map(row => [...row]));
    setBoard(puzzle.map(row => [...row]));
    setFixed(fix);
    setDifficulty(targetDiff);
    setSelectedCell(null);
    setTimer(0);
    setIsPaused(false);
    setHintsUsed(0);
    setIsWon(false);
    setDismissedVictory(false);
    setMessage('New board generated!');
    setTimeout(() => setMessage(null), 2000);
  };

  // Reset current board to initial state
  const handleResetCurrentBoard = () => {
    if (!initialPuzzle.length) return;
    setBoard(initialPuzzle.map(row => [...row]));
    setTimer(0);
    setHintsUsed(0);
    setSelectedCell(null);
    setIsWon(false);
    setIsPaused(false);
    setMessage('Board reset to start!');
    setTimeout(() => setMessage(null), 2000);
  };

  // Check victory condition
  const checkVictory = useCallback((currentBoard: number[][], currentConflicts: boolean[][]) => {
    if (!currentBoard || currentBoard.length < 9) return false;
    for (let r = 0; r < 9; r++) {
      if (!currentBoard[r]) return false;
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] === 0 || (currentConflicts[r] && currentConflicts[r][c])) return false;
      }
    }
    return true;
  }, []);

  // Handle cell number input
  const handleInput = useCallback((num: number) => {
    if (!selectedCell || !difficulty || isWon) return;
    const { r, c } = selectedCell;

    if (fixed[r][c]) return;

    const newBoard = board.map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? num : val))
    );

    const newConflicts = checkConflicts(newBoard);
    setBoard(newBoard);

    if (checkVictory(newBoard, newConflicts)) {
      setIsWon(true);
    }
  }, [selectedCell, difficulty, isWon, fixed, board, checkVictory]);

  // Delete cell input
  const handleDelete = useCallback(() => {
    if (!selectedCell || !difficulty || isWon) return;
    const { r, c } = selectedCell;
    if (fixed[r][c]) return;

    const newBoard = board.map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? 0 : val))
    );

    setBoard(newBoard);
  }, [selectedCell, difficulty, isWon, fixed, board]);

  // Provide hint with strict difficulty limit
  const handleHint = () => {
    if (!difficulty || isWon) return;

    const maxAllowed = DIFFICULTY_CONFIG[difficulty].maxHints;
    if (hintsUsed >= maxAllowed) {
      setMessage(`No hints remaining (${hintsUsed}/${maxAllowed} used)`);
      setTimeout(() => setMessage(null), 2200);
      return;
    }

    let targetR = -1;
    let targetC = -1;

    if (selectedCell) {
      const { r, c } = selectedCell;
      if (!fixed[r][c] && board[r][c] !== solution[r][c]) {
        targetR = r;
        targetC = c;
      }
    }

    if (targetR === -1) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (!fixed[r][c] && board[r][c] !== solution[r][c]) {
            targetR = r;
            targetC = c;
            break;
          }
        }
        if (targetR !== -1) break;
      }
    }

    if (targetR !== -1) {
      const correctVal = solution[targetR][targetC];
      const newBoard = board.map((row, ri) =>
        row.map((val, ci) => (ri === targetR && ci === targetC ? correctVal : val))
      );
      const newConflicts = checkConflicts(newBoard);
      setBoard(newBoard);
      setSelectedCell({ r: targetR, c: targetC });
      setHintsUsed(h => h + 1);
      setMessage(`Hint applied at R${targetR + 1}, C${targetC + 1}!`);
      setTimeout(() => setMessage(null), 2200);

      if (checkVictory(newBoard, newConflicts)) {
        setIsWon(true);
      }
    } else {
      setMessage('Board is already completely correct!');
      setTimeout(() => setMessage(null), 2200);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!difficulty || isWon) return;

      if (e.key >= '1' && e.key <= '9') {
        handleInput(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        handleDelete();
      } else if (selectedCell) {
        let { r, c } = selectedCell;
        if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
        if (e.key === 'ArrowDown') r = Math.min(8, r + 1);
        if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
        if (e.key === 'ArrowRight') c = Math.min(8, c + 1);
        setSelectedCell({ r, c });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [difficulty, isWon, selectedCell, handleInput, handleDelete]);

  // Render Difficulty Selection Screen
  if (!difficulty) {
    return (
      <div className="bg-[#16130f] border border-white/10 rounded-2xl p-4 sm:p-8 space-y-5 text-[#eae1db]">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f2c08d]/10 border border-[#f2c08d]/30 rounded-full text-[#f2c08d] font-mono-tech text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">grid_on</span>
            <span>Sudoku Engine</span>
          </div>
          <h3 className="font-anton text-2xl sm:text-4xl text-[#eae1db] tracking-wide uppercase">
            Select Difficulty
          </h3>
          <p className="text-xs sm:text-sm text-[#d4c4b7]/70 max-w-md mx-auto">
            Choose a difficulty mode to generate a fresh randomized board instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map(key => {
            const conf = DIFFICULTY_CONFIG[key];
            return (
              <button
                key={key}
                onClick={() => handleNewBoard(key)}
                className="group relative bg-[#231f1b] hover:bg-[#2c2722] border border-white/10 hover:border-[#f2c08d]/60 rounded-xl p-3.5 text-left transition-all duration-150 hover:-translate-y-0.5 shadow-md cursor-pointer touch-manipulation"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-anton text-base sm:text-lg tracking-wide text-[#f2c08d] group-hover:text-white uppercase">
                    {conf.label}
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#d4c4b7]/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {conf.removed} Blanks
                  </span>
                </div>
                <p className="text-xs text-[#d4c4b7]/80 font-mono-tech">
                  {conf.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const maxHints = DIFFICULTY_CONFIG[difficulty].maxHints;
  const hintsRemaining = Math.max(0, maxHints - hintsUsed);
  const selectedVal = selectedCell && board[selectedCell.r] ? board[selectedCell.r][selectedCell.c] : 0;

  return (
    <div className="bg-[#16130f] border border-white/10 rounded-2xl p-3 sm:p-5 space-y-3.5 text-[#eae1db] relative overflow-hidden max-w-full">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDifficulty(null)}
            className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-mono-tech text-xs uppercase text-[#d4c4b7] hover:text-[#f2c08d] transition flex items-center gap-1 cursor-pointer touch-manipulation"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="hidden sm:inline">Menu</span>
          </button>

          <span className="font-mono-tech text-xs uppercase font-bold text-[#f2c08d] bg-[#f2c08d]/10 border border-[#f2c08d]/30 px-2.5 py-1 rounded-md">
            {DIFFICULTY_CONFIG[difficulty].label}
          </span>
        </div>

        {/* Live Timer & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 bg-[#231f1b] border border-white/10 px-2.5 py-1.5 rounded-lg font-mono-tech text-xs text-[#eae1db]">
            <span className="material-symbols-outlined text-sm text-[#f2c08d]">timer</span>
            <SudokuTimerDisplay isRunning={!isPaused && !isWon} onTick={handleTimerTick} timerSeconds={timer} />
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-[#d4c4b7] hover:text-white transition cursor-pointer touch-manipulation"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            <span className="material-symbols-outlined text-base">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
          </button>

          <button
            onClick={handleHint}
            disabled={hintsRemaining <= 0}
            className={`px-2.5 py-1.5 border rounded-lg font-mono-tech text-xs uppercase font-bold transition flex items-center gap-1 cursor-pointer touch-manipulation active:scale-95 ${
              hintsRemaining > 0
                ? 'bg-[#f2c08d]/20 hover:bg-[#f2c08d]/30 border-[#f2c08d]/40 text-[#f2c08d]'
                : 'bg-white/5 border-white/10 text-[#d4c4b7]/40 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-sm">lightbulb</span>
            <span>Hint ({hintsRemaining})</span>
          </button>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div className="bg-[#f2c08d]/15 border border-[#f2c08d]/40 text-[#f2c08d] text-xs font-mono-tech px-3 py-1 rounded-lg text-center">
          {message}
        </div>
      )}

      {/* Paused Overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-30 bg-[#16130f]/95 backdrop-blur-md flex flex-col items-center justify-center space-y-3 p-6">
          <span className="material-symbols-outlined text-4xl text-[#f2c08d]">pause_circle</span>
          <h3 className="font-anton text-2xl uppercase text-[#eae1db]">Game Paused</h3>
          <button
            onClick={() => setIsPaused(false)}
            className="px-5 py-2 bg-[#f2c08d] text-[#16130f] font-mono-tech text-xs uppercase font-bold rounded-lg hover:bg-[#e0b07d] transition cursor-pointer touch-manipulation"
          >
            Resume Game
          </button>
        </div>
      )}

      {/* Grid & Controls Stack */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 pt-1">
        {/* 9x9 Grid Container */}
        <div className="bg-[#0e0c0a] p-1.5 sm:p-2.5 rounded-xl border border-white/15 shadow-2xl relative max-w-full">
          <div className="grid grid-cols-9 gap-[1px] bg-white/15 p-[1px] rounded-lg overflow-hidden select-none">
            {board.map((row, r) =>
              row.map((val, c) => {
                const isFixedCell = fixed[r][c];
                const isConflict = conflicts[r][c];
                const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                const isSameRowOrCol = selectedCell && (selectedCell.r === r || selectedCell.c === c);
                const isSameBox =
                  selectedCell &&
                  Math.floor(selectedCell.r / 3) === Math.floor(r / 3) &&
                  Math.floor(selectedCell.c / 3) === Math.floor(c / 3);
                const isSameValue = selectedVal !== 0 && val === selectedVal;

                // Thick 3x3 box borders
                const borderRight = (c + 1) % 3 === 0 && c < 8 ? 'border-r-2 border-r-white/40' : '';
                const borderBottom = (r + 1) % 3 === 0 && r < 8 ? 'border-b-2 border-b-white/40' : '';

                // Background highlight logic
                let bgClass = 'bg-[#1c1814] hover:bg-[#26211c]';
                if (isSelected) {
                  bgClass = 'bg-[#f2c08d] text-[#16130f] font-bold';
                } else if (isConflict) {
                  bgClass = 'bg-rose-950/90 text-rose-300 font-bold';
                } else if (isSameValue) {
                  bgClass = 'bg-[#f2c08d]/35 text-white font-bold';
                } else if (isSameRowOrCol || isSameBox) {
                  bgClass = 'bg-[#26201a]';
                }

                // Text styling
                let textClass = 'text-[#f2c08d] font-medium';
                if (isFixedCell) {
                  textClass = 'text-[#eae1db] font-bold';
                }
                if (isSelected) {
                  textClass = 'text-[#16130f] font-extrabold';
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => setSelectedCell({ r, c })}
                    className={`w-7 h-7 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center font-mono-tech text-sm sm:text-base md:text-lg cursor-pointer touch-manipulation ${bgClass} ${textClass} ${borderRight} ${borderBottom}`}
                  >
                    {val !== 0 ? val : ''}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Controls Container */}
        <div className="flex flex-col items-center justify-between w-full lg:w-48 space-y-3">
          <div className="text-center w-full">
            <span className="font-mono-tech text-[10px] sm:text-[11px] text-[#d4c4b7]/60 uppercase tracking-widest block mb-0.5">
              {selectedCell ? `Row ${selectedCell.r + 1}, Col ${selectedCell.c + 1}` : 'Tap a cell'}
            </span>
            <span className="font-mono-tech text-[11px] text-[#f2c08d] font-semibold block">
              {selectedCell && fixed[selectedCell.r][selectedCell.c]
                ? 'Fixed Clue (Locked)'
                : selectedCell
                ? 'Editable Cell'
                : 'Select cell to enter digit'}
            </span>
          </div>

          {/* 1-9 Numpad Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-[210px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleInput(num)}
                disabled={!selectedCell || (selectedCell && fixed[selectedCell.r][selectedCell.c])}
                className="h-10 sm:h-11 bg-[#231f1b] hover:bg-[#f2c08d] hover:text-[#16130f] border border-white/10 disabled:opacity-30 disabled:hover:bg-[#231f1b] disabled:hover:text-[#eae1db] rounded-lg font-mono-tech font-bold text-base sm:text-lg text-[#eae1db] transition-colors cursor-pointer touch-manipulation active:scale-95 shadow"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Delete, Reset Board, New Board Actions */}
          <div className="flex flex-col gap-1.5 w-full max-w-[210px]">
            <button
              onClick={handleDelete}
              disabled={!selectedCell || (selectedCell && fixed[selectedCell.r][selectedCell.c])}
              className="h-9 sm:h-10 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 disabled:opacity-30 text-rose-300 rounded-lg font-mono-tech text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-95"
            >
              <span className="material-symbols-outlined text-base">backspace</span>
              <span>Delete</span>
            </button>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={handleResetCurrentBoard}
                className="h-9 sm:h-10 bg-white/5 hover:bg-white/15 border border-white/10 text-[#d4c4b7] rounded-lg font-mono-tech text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer touch-manipulation active:scale-95"
                title="Reset this board back to start"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Reset</span>
              </button>

              <button
                onClick={() => handleNewBoard()}
                className="h-9 sm:h-10 bg-[#f2c08d]/15 hover:bg-[#f2c08d]/25 border border-[#f2c08d]/30 text-[#f2c08d] rounded-lg font-mono-tech text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer touch-manipulation active:scale-95 font-semibold"
                title="Generate a brand new Sudoku puzzle"
              >
                <span className="material-symbols-outlined text-sm">casino</span>
                <span>New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Victory Celebration Overlay */}
      {isWon && !dismissedVictory && (
        <div className="absolute inset-0 z-40 bg-[#16130f]/95 backdrop-blur-md flex flex-col items-center justify-center space-y-3.5 p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-[#f2c08d]/20 border border-[#f2c08d] flex items-center justify-center text-[#f2c08d]">
            <span className="material-symbols-outlined text-2xl">workspace_premium</span>
          </div>

          <div className="space-y-0.5">
            <span className="font-mono-tech text-xs text-[#f2c08d] uppercase tracking-widest block">
              Puzzle Completed!
            </span>
            <h3 className="font-anton text-2xl sm:text-3xl uppercase text-[#eae1db]">
              Congratulations!
            </h3>
            <p className="text-xs text-[#d4c4b7]/80">
              You solved the {DIFFICULTY_CONFIG[difficulty].label} Sudoku puzzle!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-[#231f1b] border border-white/10 rounded-xl p-2.5 w-full max-w-xs font-mono-tech text-xs">
            <div>
              <span className="text-[#d4c4b7]/50 block text-[10px] uppercase">Time</span>
              <span className="text-[#f2c08d] font-bold text-xs sm:text-sm">
                {Math.floor(timer / 60)}m {timer % 60}s
              </span>
            </div>
            <div>
              <span className="text-[#d4c4b7]/50 block text-[10px] uppercase">Difficulty</span>
              <span className="text-white font-bold text-xs uppercase">{difficulty}</span>
            </div>
            <div>
              <span className="text-[#d4c4b7]/50 block text-[10px] uppercase">Hints</span>
              <span className="text-[#f2c08d] font-bold text-xs sm:text-sm">{hintsUsed}/{maxHints}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              onClick={() => setDismissedVictory(true)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-mono-tech text-xs uppercase font-bold text-[#eae1db] transition cursor-pointer touch-manipulation"
              title="Inspect solved board"
            >
              View Board
            </button>
            <button
              onClick={() => setDifficulty(null)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-mono-tech text-xs uppercase font-bold text-[#eae1db] transition cursor-pointer touch-manipulation"
            >
              Difficulty
            </button>
            <button
              onClick={() => handleNewBoard(difficulty)}
              className="px-4 py-2 bg-[#f2c08d] text-[#16130f] hover:bg-[#e0b07d] rounded-lg font-mono-tech text-xs uppercase font-bold transition cursor-pointer touch-manipulation shadow-lg"
            >
              New Game
            </button>
          </div>
        </div>
      )}

      {/* Small Banner when Victory is dismissed */}
      {isWon && dismissedVictory && (
        <div className="mt-3 flex items-center justify-between bg-[#f2c08d]/15 border border-[#f2c08d]/30 px-3.5 py-2 rounded-lg font-mono-tech text-xs text-[#f2c08d]">
          <span>🎉 Puzzle Solved!</span>
          <button
            onClick={() => setDismissedVictory(false)}
            className="underline font-bold text-white hover:text-[#f2c08d] ml-2 cursor-pointer"
          >
            View Stats
          </button>
        </div>
      )}
    </div>
  );
};
