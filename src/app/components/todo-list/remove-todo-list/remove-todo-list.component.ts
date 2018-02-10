import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-remove-todo-list",
  templateUrl: "./remove-todo-list.component.html",
  styleUrls: ["./remove-todo-list.component.scss"],
})
export class RemoveTodoListComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveTodoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close(null);
  }
}
