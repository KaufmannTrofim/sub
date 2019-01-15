import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-delete',
  templateUrl: './event-delete.component.html',
  styleUrls: ['./event-delete.component.css']
})
export class EventDeleteComponent implements OnInit {

  @Input() event: Event;

  @Output() deleteEvent = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() {
  }

  removeEvent() {
    this.deleteEvent.emit(this.event);
  }
}
