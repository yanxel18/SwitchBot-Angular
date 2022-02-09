import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAccountViewComponent } from './d-account-view.component';

describe('DAccountViewComponent', () => {
  let component: DAccountViewComponent;
  let fixture: ComponentFixture<DAccountViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAccountViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
