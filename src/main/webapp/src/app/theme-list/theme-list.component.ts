import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../model/theme';
import { AppService } from '../services/app.service';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { ThemeFormComponent } from '../theme-form/theme-form.component';


@Component({
  selector: 'app-theme-list',
  templateUrl: 'theme-list.component.html',
  styleUrls: ['theme-list.component.css', '../css/common.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ThemeListComponent implements OnInit, AfterViewInit {

  dataSource;
  columnsToDisplay = ['Тема', 'Лектор', 'Кнопки'];
  expandedElement: Theme | null;
  themes: Theme[];

  userRoles: string[] = new Array();

  constructor(private themeService: ThemeService,
              private appService: AppService,
              private addForm: MatDialog) { }

  ngOnInit() {
    this.getThemes();
    this.appService.userRoles$.subscribe(roles => this.userRoles = roles);
  }

  ngAfterViewInit(): void {
    document.getElementsByTagName('tr').item(0).hidden = true;
  }

  getThemes(): void {
    this.themeService.getThemes()
        .subscribe(themes => {
          this.themes = themes;
          this.dataSource = new MatTableDataSource(themes);
        });
  }

  openAddForm(theme: Theme): void {
    const dialogRef = this.addForm.open(ThemeFormComponent, {
      width: '400px',
      maxHeight: '780px',
      data: theme
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== null && result !== undefined) {
        if (result.lecturer === null || result.lecturer === undefined) {
          result.lecturer = 'Лектор не назначен';
        }
        console.log(this.dataSource.data);
        if (theme !== null) {
          this.dataSource.data = this.dataSource.data.filter(element => element.id !== theme.id);
        }
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  deleteTheme(theme: Theme) {
    this.themeService.deleteTheme(theme).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(element => element.id !== theme.id);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    },
    error => {
      console.log(error);
    });
  }
}
