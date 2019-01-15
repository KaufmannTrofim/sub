import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
