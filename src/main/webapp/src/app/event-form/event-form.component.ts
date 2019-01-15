import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Inject } from '@angular/core';
import { Event } from '../model/event';
import { EventService } from '../services/event.service';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { Theme } from '../model/theme';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  event: Event = new Event();

  themeList: Theme[] = new Array();
  themeCtrl = new FormControl();
  filteredThemes: Observable<Theme[]>;

  @ViewChild('themeInput') themeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  today: Date = new Date();
  isEdit: Boolean = false;

  @Output() updateListEvent = new EventEmitter<Event>();

  constructor(private eventService: EventService,
              private themeService: ThemeService,
              public formRef: MatDialogRef<EventFormComponent>,
              @Inject(MAT_DIALOG_DATA) event: Event) {
                if (event !== null) {
                  this.event = event;
                  this.isEdit = true;
                }
              }

  ngOnInit() {
    this.getThemes();
  }

  postEvent() {
    this.eventService.postEvent(this.event).subscribe(
      result => {
        this.formRef.close(result);
      },
      error => {
        console.log(error);
      });
  }

  updateEvent() {
    this.eventService.updateEvent(this.event).subscribe(
      () => {
        this.formRef.close(this.event);
      },
      error => {
        console.log(error);
      });
  }

  getThemes() {
    this.themeService.getThemes().subscribe(themes => {
      themes.forEach(theme => {
        if (this.event.themesSPA.every(t => t.topic.trim().toLowerCase() !== theme.topic.trim().toLowerCase())) {
          this.themeList.push(theme);
        }
      });
      this.filteredThemes = this.themeCtrl.valueChanges.pipe(
        startWith(null),
        map((filter: string | null) => filter ? this._search(filter) : this.themeList));
      });
  }

  onClose(): void {
    this.formRef.close();
  }

  private _search(value: any): Theme[] {
    if (value.topic === null || value.topic === undefined) {
      return this.themeList.filter(theme => theme.topic.trim().toLowerCase().indexOf(value.toLowerCase()) === 0);
    } else {
      return this.themeList.filter(theme => theme.topic.trim().toLowerCase().indexOf(value.topic.toLowerCase()) === 0);
    }
  }

  addTheme(inputEvent: MatChipInputEvent): void {
      const input = inputEvent.input;
      const value = inputEvent.value.trim().toLowerCase();

      if ((value || '').trim()) {
        if (this.event.themesSPA.every(theme => theme.topic.trim().toLowerCase() !== value)) {
          this.themeList.some(theme => {
            if (theme.topic.trim().toLowerCase() === value) {
              this.event.themesSPA.push(theme);
              this.themeList = this.themeList.filter(t => value !== t.topic.trim().toLowerCase());
              return true;
            }
          });
        }
      }

      if (input) {
        input.value = '';
      }

      this.themeCtrl.setValue(null);
  }

  removeTheme(value: Theme): void {
    if (value.id !== null && value.id !== undefined) {
      this.themeList.push(value);
    }
    this.event.themesSPA = this.event.themesSPA.filter(theme => theme.topic.trim().toLowerCase() !== value.topic.trim().toLowerCase());
  }

  selectedTheme(event: MatAutocompleteSelectedEvent): void {
    const theme: Theme = event.option.value;
    this.event.themesSPA.push(theme);
    this.themeList = this.themeList.filter(t => theme.topic.trim().toLowerCase() !== t.topic.trim().toLowerCase());
    this.themeInput.nativeElement.value = '';
    this.themeCtrl.setValue(null);
  }
}
