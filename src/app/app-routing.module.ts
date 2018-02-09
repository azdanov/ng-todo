import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IntroComponent } from "./components/intro/intro.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";

const routes: Routes = [
  {
    path: "",
    component: IntroComponent,
  },
  {
    path: ":id",
    component: TodoListComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
