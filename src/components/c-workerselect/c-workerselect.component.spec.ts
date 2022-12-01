import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CWorkerselectComponent } from './c-workerselect.component';

describe('CWorkerselectComponent', () => {
  let component: CWorkerselectComponent;
  let fixture: ComponentFixture<CWorkerselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CWorkerselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CWorkerselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
