import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "../../models/todo";
import { TodoList } from "../../models/todo-list";
import { TodoListService } from "../../services/todo-list.service";
import { EditTodoDialogComponent } from "./edit-todo-dialog/edit-todo-dialog.component";
import { RemoveTodoListComponent } from "./remove-todo-list/remove-todo-list.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  todoList: TodoList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TodoListService: TodoListService,
    public dialog: MatDialog,
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

  openEditDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: "250px",
      data: { todo: Object.assign({}, todo) },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.TodoListService.editTodo(this.todoList, result.todo);
    });
  }

  removeTodo(todoList: TodoList, todo: Todo) {
    this.TodoListService.removeTodo(todoList, todo);
  }

  openRemoveTodoListDialog(todoList: TodoList) {
    const dialogRef = this.dialog.open(RemoveTodoListComponent, {
      width: "250px",
      data: { todoList },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.TodoListService.removeTodoList(todoList).then(() => {
        this.router.navigate([""]);
      });
    });
  }
}
