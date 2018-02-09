import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TodoList } from "../../models/todo-list";
import { TodoListService } from "../../services/todo-list.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  todoList: TodoList;

  constructor(
    private route: ActivatedRoute,
    private TodoListService: TodoListService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params["id"];
      if (!id) {
        id = 1;
      }

      this.todoList = null;

      this.TodoListService.todoLists.subscribe(lists => {
        if (lists.length === 0) {
          return;
        }

        this.todoList = this.TodoListService.todoListById(id);
      });
    });
  }
}
