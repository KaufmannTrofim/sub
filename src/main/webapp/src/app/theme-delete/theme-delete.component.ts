import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from '../model/theme';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css']
})
export class ThemeDeleteComponent implements OnInit {

  @Input() theme: Theme;

  @Output() deleteTheme = new EventEmitter<Theme>();

  constructor() { }

  ngOnInit() {
  }

  removeTheme() {
    this.deleteTheme.emit(this.theme);
  }
}
