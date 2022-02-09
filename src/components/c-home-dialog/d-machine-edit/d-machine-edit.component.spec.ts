import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMachineEditComponent } from './d-machine-edit.component';

describe('DMachineEditComponent', () => {
  let component: DMachineEditComponent;
  let fixture: ComponentFixture<DMachineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMachineEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMachineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
