import { Todo } from "./todo";

export class TodoList {
  id: number;
  listName: string;
  todos: Todo[];

  constructor() {
    this.id = null;
    this.listName = null;
    this.todos = [];
  }
}
