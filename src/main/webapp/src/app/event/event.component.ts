import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../model/event';
import { MatDialog } from '@angular/material';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event, [app-event]',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event;
  @Input() userRoles: string[]  = new Array();

  @Output() deleteEvent = new EventEmitter<Event>();

  date: string;

  constructor(private addForm: MatDialog) { }

  ngOnInit() {
    this.formatDate();
  }

  formatDate() {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Майя', 'Июня', 'Июля', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    if (this.event.date !== null && this.event.date !== undefined) {
      this.event.date = new Date(this.event.date);
      this.date = days[this.event.date.getDay()] + ', ' + this.event.date.getDate() + ' ' +
                  months[this.event.date.getMonth()] + ', ' + this.event.date.getHours() + ':' +
                  (this.event.date.getMinutes() / 10 === 0  ? '0' : '') + this.event.date.getMinutes();
    } else {
      this.date = 'Скоро';
    }
  }

  openAddForm(): void {
    const dialogRef = this.addForm.open(EventFormComponent, {
      width: '600px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(event => {
      if (event !== null && event !== undefined) {
        this.event = event;
        this.formatDate();
      }},
      error => {
        console.log(error);
      });
  }
}
