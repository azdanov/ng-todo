import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-edit-todo-dialog",
  templateUrl: "./edit-todo-dialog.component.html",
  styleUrls: ["./edit-todo-dialog.component.scss"],
})
export class EditTodoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close(null);
  }
}
