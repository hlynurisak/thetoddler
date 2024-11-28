import { Dispatch, SetStateAction } from 'react';

/* Custom type declarations */
export type Board = {
  id: number;
  name: string;
  description?: string;
  thumbnailPhoto: string;
};

export type List = {
  id: number;
  name: string;
  color: string;
  boardId: number;
};

export type Task = {
  id: number;
  name: string;
  description?: string;
  isFinished: boolean;
  listId: number;
};


/* Create and update data */
// Create a new board with given parameters and auto-incremented ID
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

// Update the board with the given ID
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

export function createList(
  lists: List[],
  setLists: Dispatch<SetStateAction<List[]>>,
  name: string,
  color: string,
  boardId: number
) {
  const newList: List = {
    id: lists.length + 1,
    name,
    color,
    boardId,
  };
  setLists([...lists, newList]);
}

export function updateList(
  lists: List[],
  setLists: Dispatch<SetStateAction<List[]>>,
  id: number,
  name: string,
  color: string
) {
  const updatedLists = lists.map((list) => {
    if (list.id === id) {
      return {
        ...list,
        name,
        color,
      };
    }
    return list;
  });
  setLists(updatedLists);
}
