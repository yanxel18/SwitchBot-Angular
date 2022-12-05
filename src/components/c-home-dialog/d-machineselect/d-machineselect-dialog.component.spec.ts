import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMachineselectDialogComponent } from './d-machineselect-dialog.component';

describe('DMachineselectDialogComponent', () => {
  let component: DMachineselectDialogComponent;
  let fixture: ComponentFixture<DMachineselectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMachineselectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMachineselectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
