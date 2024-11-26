import data from '../data.json';

export function getBoards() {
  return data.boards;
}

export function getLists(boardId: string) {
  return data.lists.filter((list) => list.boardId === boardId);
}

export function getTasks(listId: string) {
  return data.tasks.filter((task) => task.listId === listId);
}
