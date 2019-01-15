import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../model/event';
import { AppService } from '../services/app.service';
import { MatDialog, DialogPosition } from '@angular/material';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[];
  userRoles: string[] = new Array();

  constructor(private eventService: EventService,
              private appService: AppService,
              private addForm: MatDialog) { }

  ngOnInit() {
    this.getEvents();
    this.appService.userRoles$.subscribe(roles => this.userRoles = roles);
  }

  openAddForm(): void {
    const dialogRef = this.addForm.open(EventFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(event => {
        if (event !== null && event !== undefined) {
          this.events.push(event);
        }
      },
      error => {
        console.log(error);
      });
  }

  getEvents(): void {
    this.eventService.getEvents()
        .subscribe(events => this.events = events);
  }

  removeEvent(event: Event) {
    this.eventService.deleteEvent(event).subscribe(() => {
      this.events = this.events.filter(e => e !== event);
    },
    error => {
      console.log(error);
    });
  }
}
