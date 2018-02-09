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
      } else {
        id = Number(id);
      }

      this.todoList = null;

      this.TodoListService.todoLists.subscribe(lists => {
        if (lists.length === 0) {
          return;
        }

        /**
         * FIXME: Remove timeout for real application
         * Used to disable progress bar flickering on local machine
         */
        setTimeout(() => {
          this.todoList = this.TodoListService.todoListById(id);
        }, Math.floor(Math.random() * (1000 - 250 + 1) + 250));
      });
    });
  }
}
