import data from '../data.json';

export function getBoards() {
  return data.boards;
}

export function getLists(boardId: Number) {
  return data.lists.filter((list) => list.boardId === boardId);
}

export function getTasks(listId: Number) {
  return data.tasks.filter((task) => task.listId === listId);
}
