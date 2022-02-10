import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/Models/iuser';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { UserService } from 'src/app/Services/user-service/user.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  listOfUsers: Iuser[];
  listOfAdmins: IAdmin[];
  displayedColumns: string[] = [
    'position',
    'Name',
    'Email',
    'PhoneNumber',
    'Address',
    'BirthDate',
    'addAdmin',
  ];
  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) {
    this.listOfUsers = this.userService.getAllUsers();
    this.listOfAdmins = this.adminService.getAllAdmins();
  }
  ngOnInit(): void {}
  checkIfAdmin(userId: string) {
    for (let admin of this.listOfAdmins) {
      if (admin.id == userId) return true;
    }
    return false;
  }
  addNewAdmin(user: Iuser) {
    this.adminService.addAdmin({
      id: user.id,
      Email: user.Email,
      FullName: `${user.FirstName} ${user.LastName}`,
      Password: user.Password,
    });
  }
}
