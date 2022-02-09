import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRaspiViewComponent } from './d-raspi-view.component';

describe('DRaspiViewComponent', () => {
  let component: DRaspiViewComponent;
  let fixture: ComponentFixture<DRaspiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRaspiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRaspiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
