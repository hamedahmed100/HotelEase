import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiBaseUrl = 'http://localhost:3000';
  private reservations: Reservation[] = [];

  // CRUD operations
  constructor(private http: HttpClient) { }
  
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiBaseUrl + '/reservations');
  }

  getReservation(id: string): Observable<Reservation>{
    return this.http.get<Reservation>(this.apiBaseUrl + '/reservation/' + id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiBaseUrl + '/reservation', reservation);
  }

  deleteReservation(id: string): Observable<void> {
   return this.http.delete<void>(this.apiBaseUrl + '/reservation/' + id);
  }

  updateReservation(updatedReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.apiBaseUrl + '/reservation/' + updatedReservation.id, updatedReservation);
  }



}
