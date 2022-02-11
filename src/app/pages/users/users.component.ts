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
  listOfAdmins!: IAdmin[];
  searchText: string;
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
    this.searchText = '';
  }
  ngOnInit(): void {
    this.adminService.getAdmins.subscribe((admins) => {
      this.listOfAdmins = admins;
    });
  }
  onTextChange() {
    if (this.searchText == '') {
      this.listOfUsers = this.userService.getAllUsers();
    } else {
      this.listOfUsers = this.userService.getMatchingUsers(this.searchText);
    }
  }
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
      // Password: user.Password,
    });
  }
}
