import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTabletmsgViewComponent } from './d-tabletmsg-view.component';

describe('DTabletmsgViewComponent', () => {
  let component: DTabletmsgViewComponent;
  let fixture: ComponentFixture<DTabletmsgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DTabletmsgViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DTabletmsgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
