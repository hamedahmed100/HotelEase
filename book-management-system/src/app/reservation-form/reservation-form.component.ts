import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      let reservation = this.reservationService.getReservation(id);

      // this one line will populate the form with the reservation data
      if(reservation)
        this.reservationForm.patchValue(reservation); 
    }
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if(id) {
        let reservation = this.reservationForm.value;     
        if(reservation) {
          reservation.id = id;
          this.reservationService.updateReservation(reservation);
        }
          
      } else {
        this.reservationService.addReservation(reservation);
      }

      this.router.navigate(['/list']);
      
    } else {
      console.log("Invalid reservation form submitted");
    }
  }
}
