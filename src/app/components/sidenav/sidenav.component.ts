import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatSidenav } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { TodoList } from "../../models/todo-list";
import { TodoListService } from "../../services/todo-list.service";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { NewListDialogComponent } from "./new-list-dialog/new-list-dialog.component";

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  todoLists: Observable<TodoList[]>;
  @ViewChild(MatSidenav) private sidenav: MatSidenav;
  @ViewChild(ToolbarComponent) private toolbar: ToolbarComponent;
  @ViewChild("newListButton") private newListButton: ElementRef;
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`,
  );

  constructor(
    private TodoListService: TodoListService,
    private ngZone: NgZone,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.todoLists = this.TodoListService.todoLists;
    this.TodoListService.loadAll();
    this.mediaMatcher.addListener(mql =>
      this.ngZone.run(() => (this.mediaMatcher = mql)),
    );
  }

  ngAfterViewInit() {
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
        // Fix for ripple effect staying on
        const menuButton = this.toolbar.sidenavButton as any;
        menuButton._elementRef.nativeElement.classList.remove("cdk-program-focused");
        menuButton._elementRef.nativeElement.classList.add("cdk-mouse-focused");
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  openNewTodoListDialog(): void {
    const todoList: TodoList = new TodoList();
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      width: "250px",
      data: { todoList },
    });

    dialogRef.afterClosed().subscribe(result => {
      // Fix for ripple effect staying on
      const button = this.newListButton as any;
      button._elementRef.nativeElement.classList.remove("cdk-program-focused");
      button._elementRef.nativeElement.classList.add("cdk-mouse-focused");
      if (!result) {
        return;
      }
      this.TodoListService.addTodoList(result.todoList);
    });
  }
}
