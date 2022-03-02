import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CQrpageComponent } from './c-qrpage.component';

describe('CQrpageComponent', () => {
  let component: CQrpageComponent;
  let fixture: ComponentFixture<CQrpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CQrpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CQrpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
