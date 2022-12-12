import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DActionComponent } from './d-action.component';

describe('DActionComponent', () => {
  let component: DActionComponent;
  let fixture: ComponentFixture<DActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
