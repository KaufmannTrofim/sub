import { Injectable } from '@angular/core';
import { Event } from '../model/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvent(id: number) {
    return this.http.get<Event>('/events/spa/' + id);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('/events/spa');
  }

  postEvent(event: Event) {
    return this.http.post('/events/spa', event);
  }

  deleteEvent(event: Event): Observable<{}> {
    return this.http.delete('/events/' + event.id);
  }

  updateEvent(event: Event) {
    return this.http.patch('/events/spa', event);
  }
}
