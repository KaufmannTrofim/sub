import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../model/theme';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-theme-into-event',
  templateUrl: './theme-into-event.component.html',
  styleUrls: ['./theme-into-event.component.css']
})
export class ThemeIntoEventComponent implements OnInit {

  @Input() theme: Theme;
  @Input() userRoles: string[];

  constructor() { }

  ngOnInit() {

  }

}
