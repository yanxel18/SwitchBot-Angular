import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMachineRegComponent } from './d-machine-reg.component';

describe('DMachineRegComponent', () => {
  let component: DMachineRegComponent;
  let fixture: ComponentFixture<DMachineRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMachineRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMachineRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
