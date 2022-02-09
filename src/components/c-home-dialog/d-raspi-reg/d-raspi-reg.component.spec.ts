import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRaspiRegComponent } from './d-raspi-reg.component';

describe('DRaspiRegComponent', () => {
  let component: DRaspiRegComponent;
  let fixture: ComponentFixture<DRaspiRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRaspiRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRaspiRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
