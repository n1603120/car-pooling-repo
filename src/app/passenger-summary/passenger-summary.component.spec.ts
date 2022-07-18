import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerSummaryComponent } from './passenger-summary.component';

describe('PassengerSummaryComponent', () => {
  let component: PassengerSummaryComponent;
  let fixture: ComponentFixture<PassengerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
