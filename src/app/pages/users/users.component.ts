import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { _MatTableDataSource } from '@angular/material/table';
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component';
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
  listOfUsers: Iuser[] = [];
  listOfAdmins: IAdmin[] = [];
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
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.searchText = '';
  }

  ngOnInit(): void {
    this.userService.getAllUsers.subscribe((users) => {
      this.listOfUsers = users;
      this.dataSource = new _MatTableDataSource(this.listOfUsers);
      this.dataSource.paginator = this.paginator;
    });
    this.adminService.getAdmins.subscribe((admins) => {
      this.listOfAdmins = admins;
    });
  }

  onTextChange() {
    if (this.searchText == '') {
      this.dataSource = new _MatTableDataSource(this.listOfUsers);
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource.filter = this.searchText.trim().toLowerCase();
    }
  }
  checkIfAdmin(userId: string) {
    for (let admin of this.listOfAdmins) {
      if (admin.id == userId) return true;
    }
    return false;
  }
  addNewAdmin(user: Iuser) {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      data: {
        title: 'Add Admin',
        content: 'Are you sure you want to add this user as an admin?',
        yes: 'Yes',
        no: 'cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.adminService.addAdmin({
          id: user.id,
          Email: user.Email,
          FirstName:user.FirstName, 
          LastName:user.LastName
        });
      }
    });
  }
}
