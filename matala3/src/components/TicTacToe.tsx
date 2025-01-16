import { useState } from "react";
import Confetti from "react-confetti";


function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);


  const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  const checkWinner = (board: string[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return; 
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      return;
    }

    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div>
      <h1>X Mix Drix</h1>
      {winner ? ( <h2>The winner is: {winner} {showConfetti && <Confetti />}  </h2>) 
      : (<h2>Current Player: {currentPlayer}</h2>)}


      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
        {board.map((cell, index) => (
          
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              border : "1px solid black",
            }}
          >
            {cell && (
                <img
                style={{
                  width: "50px",
                  height: "50px",
                  position: "relative",
                }}
                  src={cell === "X" ? "/Ximg.png" : "/Oimg.png"}
                />
              )}
        </button>
        ))}


      </div>
      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe;
