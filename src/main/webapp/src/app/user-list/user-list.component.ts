import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material';
import { User } from '../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'lastVisit', 'role'];
  dataSource;
  changes: User[] = new Array();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
        .subscribe(users => {
          this.dataSource = new MatTableDataSource(users);
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addChanges(user: User, isAdmin: boolean) {
    if (isAdmin) {
      if (user.roles.indexOf('ROLE_ADMIN') === -1) {
        user.roles.push('ROLE_ADMIN');
        this.changes.push(user);
      }
    } else {
      const index = user.roles.indexOf('ROLE_ADMIN');
      if (index !== -1) {
        user.roles.splice(index, 1);
        this.changes.push(user);
      }
    }
  }

  save() {
    this.userService.updateUsers(this.changes).subscribe();
  }
}
