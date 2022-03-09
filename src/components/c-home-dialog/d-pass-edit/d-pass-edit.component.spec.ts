import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPassEditComponent } from './d-pass-edit.component';

describe('DPassEditComponent', () => {
  let component: DPassEditComponent;
  let fixture: ComponentFixture<DPassEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPassEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DPassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
