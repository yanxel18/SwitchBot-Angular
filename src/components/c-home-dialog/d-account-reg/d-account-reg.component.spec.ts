import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAccountRegComponent } from './d-account-reg.component';

describe('DAccountRegComponent', () => {
  let component: DAccountRegComponent;
  let fixture: ComponentFixture<DAccountRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAccountRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAccountRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
