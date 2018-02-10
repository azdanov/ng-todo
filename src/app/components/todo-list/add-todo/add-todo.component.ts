import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Todo } from "../../../models/todo";
import { TodoList } from "../../../models/todo-list";
import { TodoListService } from "../../../services/todo-list.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.scss"],
})
export class AddTodoComponent implements OnInit {
  @Input() todoList: TodoList;
  todo: Todo;

  constructor(private TodoListService: TodoListService) {}

  ngOnInit() {
    this.initTodo();
  }

  initTodo() {
    this.todo = { id: null, completed: false, note: "" } as Todo;
  }

  addTodo(input) {
    if (!this.todo.note.trim()) {
      return;
    }
    this.TodoListService.addTodo(this.todoList, this.todo).then(todo => {
      this.initTodo();
    });
  }
}
