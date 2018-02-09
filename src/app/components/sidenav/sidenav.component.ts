import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { TodoList } from "../../models/todo-list";
import { TodoListService } from "../../services/todo-list.service";

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  todoLists: Observable<TodoList[]>;
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`,
  );

  constructor(
    private TodoListService: TodoListService,
    private ngZone: NgZone,
    private router: Router,
  ) {}

  ngOnInit() {
    this.todoLists = this.TodoListService.todoLists;
    this.TodoListService.loadAll();
    this.mediaMatcher.addListener(mql =>
      this.ngZone.run(() => (this.mediaMatcher = mql)),
    );
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
