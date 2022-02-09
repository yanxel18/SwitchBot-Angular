import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRaspiEditComponent } from './d-raspi-edit.component';

describe('DRaspiEditComponent', () => {
  let component: DRaspiEditComponent;
  let fixture: ComponentFixture<DRaspiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRaspiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRaspiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
