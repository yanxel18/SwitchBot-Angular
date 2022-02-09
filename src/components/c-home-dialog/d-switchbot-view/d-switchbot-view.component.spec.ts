import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSwitchbotViewComponent } from './d-switchbot-view.component';

describe('DSwitchbotViewComponent', () => {
  let component: DSwitchbotViewComponent;
  let fixture: ComponentFixture<DSwitchbotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSwitchbotViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DSwitchbotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
