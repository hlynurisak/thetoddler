import { Dispatch, SetStateAction } from 'react';

// Define the Board type
export type Board = {
  id: number;
  name: string;
  description?: string;
  thumbnailPhoto: string;
};

// Function to create a new board
export function createBoard(
  boards: Board[],
  setBoards: Dispatch<SetStateAction<Board[]>>,
  name: string,
  description: string,
  photo: string
) {
  const newBoard: Board = {
    id: boards.length + 1,
    name,
    description,
    thumbnailPhoto: photo,
  };
  setBoards([...boards, newBoard]);
}

// Function to edit/update an existing board
export function updateBoard(
  boards: Board[],
  setBoards: Dispatch<SetStateAction<Board[]>>,
  id: number,
  name: string,
  description: string,
  photo: string
) {
  const updatedBoards = boards.map((board) => {
    if (board.id === id) {
      return {
        ...board,
        name,
        description,
        thumbnailPhoto: photo,
      };
    }
    return board;
  });
  setBoards(updatedBoards);
}
