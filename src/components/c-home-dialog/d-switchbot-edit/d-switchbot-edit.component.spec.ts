import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSwitchbotEditComponent } from './d-switchbot-edit.component';

describe('DSwitchbotEditComponent', () => {
  let component: DSwitchbotEditComponent;
  let fixture: ComponentFixture<DSwitchbotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSwitchbotEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DSwitchbotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
