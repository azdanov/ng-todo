import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IntroComponent } from "./components/intro/intro.component";
import { NewListDialogComponent } from "./components/sidenav/new-list-dialog/new-list-dialog.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { AddTodoComponent } from "./components/todo-list/add-todo/add-todo.component";
import { EditTodoDialogComponent } from "./components/todo-list/edit-todo-dialog/edit-todo-dialog.component";
import { RemoveTodoListComponent } from "./components/todo-list/remove-todo-list/remove-todo-list.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { TodoListService } from "./services/todo-list.service";
import { MaterialModule } from "./shared/app-material.module";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    TodoListComponent,
    IntroComponent,
    AddTodoComponent,
    NewListDialogComponent,
    EditTodoDialogComponent,
    RemoveTodoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  entryComponents: [
    NewListDialogComponent,
    EditTodoDialogComponent,
    RemoveTodoListComponent,
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
