import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTabletselectViewComponent } from './d-tabletselect-view.component';

describe('DTabletselectViewComponent', () => {
  let component: DTabletselectViewComponent;
  let fixture: ComponentFixture<DTabletselectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DTabletselectViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DTabletselectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
