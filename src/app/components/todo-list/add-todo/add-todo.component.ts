import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Todo } from "../../../models/todo";
import { TodoListService } from "../../../services/todo-list.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.scss"],
})
export class AddTodoComponent implements OnInit {
  @Input() todoListId: number;
  todo: Todo;

  constructor(private TodoListService: TodoListService) {}

  ngOnInit() {
    this.todo = { id: null, completed: false, note: "" } as Todo;
  }

  addTodo(input: ElementRef) {
    this.TodoListService.addTodo(this.todoListId, this.todo).then(todo => {
      this.todo.note = "";
    });
  }
}
