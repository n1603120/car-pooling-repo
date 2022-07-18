import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerResultsComponent } from './passenger-results.component';

describe('PassengerResultsComponent', () => {
  let component: PassengerResultsComponent;
  let fixture: ComponentFixture<PassengerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
