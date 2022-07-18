import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSummaryComponent } from './driver-summary.component';

describe('DriverSummaryComponent', () => {
  let component: DriverSummaryComponent;
  let fixture: ComponentFixture<DriverSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
