import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild("sidenavButton") sidenavButton: ElementRef;

  constructor() {}

  ngOnInit() {}
}
