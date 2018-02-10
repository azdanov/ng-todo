import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RemoveTodoListComponent } from "./remove-todo-list.component";

describe("RemoveTodoListComponent", () => {
  let component: RemoveTodoListComponent;
  let fixture: ComponentFixture<RemoveTodoListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RemoveTodoListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
