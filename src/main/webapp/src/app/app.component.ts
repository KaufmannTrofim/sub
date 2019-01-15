import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;
  authorized: Boolean = false;
  observableUser: Observable<User>;
  currentPage: String = 'events';

  ngOnInit() {
  }

  constructor(private appService: AppService,
              public router: Router) {
  }

  getUser() {
    this.observableUser = this.appService.getUser().pipe(share());
    this.observableUser.subscribe(user => {
      if (user !== null) {
        this.user = user;
        this.authorized = true;
        this.appService.shareUserRoles(user.roles);
      }
    });
  }

  SignIn() {
    window.location.href = '/login';
  }

  Logout() {
    window.location.href = '/logout';
  }
}
