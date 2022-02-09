import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMachineViewComponent } from './d-machine-view.component';

describe('DMachineViewComponent', () => {
  let component: DMachineViewComponent;
  let fixture: ComponentFixture<DMachineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMachineViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMachineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
