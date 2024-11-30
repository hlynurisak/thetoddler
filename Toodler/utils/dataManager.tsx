import { Dispatch, SetStateAction } from 'react';

// Type definition for a Board
export type Board = {
  id: number;
  name: string;
  description?: string;
  thumbnailPhoto: string;
};

// Type definition for a List
export type List = {
  id: number;
  name: string;
  color: string;
  boardId: number;
};

// Type definition for a Task
export type Task = {
  id: number;
  name: string;
  description?: string;
  isFinished: boolean;
  listId: number;
};

// Adds a new board to the boards array
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

// Updates an existing board with the given ID
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

// Adds a new list to the lists array
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

// Updates an existing list with the given ID
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
