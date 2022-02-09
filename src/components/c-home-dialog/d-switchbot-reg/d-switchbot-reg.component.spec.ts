import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSwitchbotRegComponent } from './d-switchbot-reg.component';

describe('DSwitchbotRegComponent', () => {
  let component: DSwitchbotRegComponent;
  let fixture: ComponentFixture<DSwitchbotRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSwitchbotRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DSwitchbotRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
