import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAccountEditComponent } from './d-account-edit.component';

describe('DAccountEditComponent', () => {
  let component: DAccountEditComponent;
  let fixture: ComponentFixture<DAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAccountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
