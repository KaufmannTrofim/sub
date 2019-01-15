import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventService } from '../services/event.service';
import { AppService } from '../services/app.service';
import { MatDialog } from '@angular/material';
import { ThemeFormComponent } from '../theme-form/theme-form.component';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../model/theme';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  event$: Observable<Event>;
  event: Event;

  userRoles: string[] = new Array();
  date: string;
  daysLeft: string;
  hover: Boolean = false;
  themeList: Theme[] = new Array();
  suggestedThemes: Theme[] = new Array();

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private themeService: ThemeService,
              private appService: AppService,
              private addForm: MatDialog) { }

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getEvent(Number(params.get('id')))
      )
    );
    this.event$.subscribe(event => {
        this.event = event;
        this.formatDate();
        if (!this.date.includes('Скоро')) {
          this.daysLeft = this.calcDaysLeft();
        }
      });
    this.appService.userRoles$.subscribe(roles => this.userRoles = roles);
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
    const dialogRef = this.addForm.open(ThemeFormComponent, {
      width: '500px',
      maxHeight: '780px'
    });

    dialogRef.afterClosed().subscribe(theme => {
      if (theme !== null && theme !== undefined) {
        if (theme.lecturer === null || theme.lecturer === undefined) {
          theme.lecturer = 'Лектор не назначен';
        }
        this.event.themesSPA.push(theme);
        this.eventService.updateEvent(this.event).subscribe();
        this.event$ = of(this.event);
      }
    });
  }

  getThemes() {
    this.themeService.getThemes().subscribe(themes => {
      this.themeList = themes;
    });
  }

  checkTheme(theme: Theme): boolean {
    return this.event.themesSPA.some(themeSPA => themeSPA.id === theme.id);
  }

  chooseTheme(checked: boolean, theme: Theme) {
    if (checked) {
      this.suggestedThemes.push(theme);
    } else {
      this.suggestedThemes = this.suggestedThemes.filter(suggestedTheme => suggestedTheme !== theme);
    }
  }

  addThemes() {
    if (this.suggestedThemes.length > 0) {
      this.event.themesSPA = this.event.themesSPA.concat(this.suggestedThemes);
      this.eventService.updateEvent(this.event).subscribe();
      this.event$ = of(this.event);
    }
  }

  calcDaysLeft(): string {
    const left: number = Math.floor((this.event.date.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (left === 0) {
      const difference = this.event.date.getTime() - new Date().getTime();
      if (difference > 0) {
        return 'Через ' + Math.floor(difference / (1000 * 3600)) + 'ч.'
                + Math.ceil((difference - Math.floor(difference / (1000 * 3600)) * 1000 * 3600) / (1000 * 60)) + 'м.';
      } else {
        return'';
      }
    }
    if (left === 1) {
      return 'Завтра';
    }
    if (left > 1 && left % 10 === 1 && Math.floor(left / 10) !== 11) {
      return 'Через ' + left + ' д.';
    }
    if (left > 1) {
      return 'Через ' + left + ' дн.';
    }
    return '';
  }
}
