import { Todo } from "./todo";

export interface TodoList {
  id: number;
  listName: string;
  todos: Todo[];
}
