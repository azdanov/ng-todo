import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Todo } from "../models/todo";
import { TodoList } from "../models/todo-list";

@Injectable()
export class TodoListService {
  private dataStore: {
    todoLists: TodoList[];
  };

  private _todoLists: BehaviorSubject<TodoList[]>;

  get todoLists(): Observable<TodoList[]> {
    return this._todoLists.asObservable();
  }

  constructor() {
    this.dataStore = { todoLists: [] };
    this._todoLists = new BehaviorSubject<TodoList[]>([]);
  }

  addTodoList(list: TodoList): Promise<TodoList> {
    return new Promise((resolve, reject) => {
      if (this.dataStore.todoLists.length) {
        list.id = this.dataStore.todoLists[this.dataStore.todoLists.length - 1].id + 1;
      } else {
        list.id = 1;
      }
      this.dataStore.todoLists.push(list);
      this._todoLists.next(Object.assign({}, this.dataStore).todoLists);
      resolve(list);
    });
  }

  addTodo(todoList: TodoList, aTodo: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      if (todoList.todos.length) {
        aTodo.id = todoList.todos[todoList.todos.length - 1].id + 1;
      } else {
        aTodo.id = 1;
      }
      todoList.todos.push(Object.assign({}, aTodo));
      this._todoLists.next(Object.assign({}, this.dataStore).todoLists);
      resolve(aTodo);
    });
  }

  editTodo(todoList: TodoList, eTodo: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      todoList.todos = todoList.todos.map(todo => {
        if (todo.id === eTodo.id) {
          return eTodo;
        }
        return todo;
      });
      this._todoLists.next(Object.assign({}, this.dataStore).todoLists);
      resolve(eTodo);
    });
  }

  removeTodo(todoList: TodoList, rTodo: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      todoList.todos = todoList.todos.filter(todo => todo.id !== rTodo.id);
      this._todoLists.next(Object.assign({}, this.dataStore).todoLists);
      resolve(rTodo);
    });
  }

  todoListById(id: number) {
    return this.dataStore.todoLists.find(x => x.id === +id);
  }

  loadAll() {
    this.dataStore.todoLists = [
      {
        id: 1,
        listName: "Chores",
        todos: [
          { id: 1, note: "Groceries", completed: true },
          { id: 2, note: "Laundry", completed: false },
          { id: 3, note: "Ironing", completed: false },
        ],
      },
      {
        id: 2,
        listName: "Fun",
        todos: [
          { id: 1, note: "Read Book", completed: false },
          { id: 2, note: "Play Video Games", completed: false },
        ],
      },
      {
        id: 3,
        listName: "Work",
        todos: [
          { id: 1, note: "Learn Angular", completed: false },
          { id: 2, note: "Learn Express.js", completed: false },
        ],
      },
    ];
    this._todoLists.next(Object.assign({}, this.dataStore).todoLists);
  }
}
