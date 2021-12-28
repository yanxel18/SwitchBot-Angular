import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CQrscanComponent } from './c-qrscan.component';

describe('CQrscanComponent', () => {
  let component: CQrscanComponent;
  let fixture: ComponentFixture<CQrscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CQrscanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CQrscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
