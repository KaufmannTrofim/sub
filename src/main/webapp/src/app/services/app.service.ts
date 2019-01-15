import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userRolesSource = new Subject<string[]>();

  userRoles$ = this.userRolesSource.asObservable();

  constructor(private http: HttpClient,
              public router: Router) { }

  public getUser() {
    return this.http.get<User>('/user');
  }

  shareUserRoles(userRoles: string[]) {
    return this.userRolesSource.next(userRoles);
  }
}
