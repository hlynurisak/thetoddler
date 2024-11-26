import { Dispatch, SetStateAction } from 'react';

// Define the Board type
type Board = {
  id: number;
  name: string;
  description?: string;
  thumbnailPhoto: string;
};

// Create Board function with proper types
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
