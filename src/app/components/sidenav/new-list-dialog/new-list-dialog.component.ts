import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-new-list-dialog",
  templateUrl: "./new-list-dialog.component.html",
  styleUrls: ["./new-list-dialog.component.scss"],
})
export class NewListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close(null);
  }
}
