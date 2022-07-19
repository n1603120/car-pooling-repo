import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  // updateForm: FormGroup;
  // @Input() trip!: Trip;
  // // Line below needs looked at again
  // @Output() tripEntered = new EventEmitter<Trip>();
  title = 'ReactiveForms';
  reactiveForm: FormGroup;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      tripPostcode: new FormControl(null),
      tripDestination: new FormControl(null),
      tripDate: new FormControl(null),
      tripTime: new FormControl(null),

    })
  }

  // constructor(private formBuilder: FormBuilder) {
  //   this.updateForm = formBuilder.group({
  //     tripPostcode: ['', Validators.required],
  //     tripDestination: ['', Validators.required],
  //     tripDate: ['', Validators.required],
  //     tripTime: ['', Validators.required]
  //   });
  // }

  // ngOnInit(): void {
  //   this.updateFromModel(this.trip);
  // }
  // private updateFromModel(trip: Trip): void {
  //   this.updateForm.setValue({
  //     tripPostcode: trip.postcode,
  //     tripDestination: trip.destination,
  //     tripDate: trip.date,
  //     tripTime: trip.time
  //   });
  // }
  // tripDetailsCompleted(): void {
  //   this.tripEntered.emit(this.trip);
  // }
}
