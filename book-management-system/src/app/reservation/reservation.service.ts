import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];

  // CRUD operations
  constructor() {
    this.getLocalStorage('reservations');
  }
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(reservation => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    this.setLocalStorage('reservations',this.reservations);
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(reservation => reservation.id === id);
    this.reservations.splice(index, 1);
    this.setLocalStorage('reservations',this.reservations);
  }

  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(reservation => reservation.id === updatedReservation.id);
    this.reservations[index] = updatedReservation;
    console.log(updatedReservation);
    this.setLocalStorage('reservations',this.reservations);
  }

  setLocalStorage(key: string, value: Reservation[]): void {
    localStorage.setItem(key, JSON.stringify(value)); 
    this.reservations = value;
  }
  getLocalStorage(key: string) {
    this.reservations = JSON.parse(localStorage.getItem(key) || '[]');
  }

}
