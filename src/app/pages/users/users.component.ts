import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
  listOfNonAdmins: IAdmin[] = [];
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
  loading: boolean = true;
  selected = '1';
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
      this.loading = false;
    });
    this.adminService.getAdmins.subscribe((admins) => {
      this.listOfAdmins = admins;
    });
  }

  changeViewedList() {
    if (this.selected == '1') {
      this.dataSource = new _MatTableDataSource(this.listOfUsers);
    } else if (this.selected == '2') {
      this.dataSource = new _MatTableDataSource(this.listOfAdmins);
    } else if (this.selected == '3') {
      this.listOfNonAdmins = this.listOfUsers.filter(
        (user) => !this.adminService.getAdminsIds.includes(user.id)
      );
      this.dataSource = new _MatTableDataSource(this.listOfNonAdmins);
    }
    this.dataSource.paginator = this.paginator;
    this.searchText = '';
  }
  onTextChange() {
    if (this.searchText == '') {
      this.changeViewedList();
    } else {
      if (this.selected == '1') {
        this.dataSource = new _MatTableDataSource(
          this.listOfUsers.filter((user) =>
            `${user.FirstName} ${user.LastName}`
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          )
        );
      } else if (this.selected == '2') {
        this.dataSource = new _MatTableDataSource(
          this.listOfAdmins.filter((admin) =>
            `${admin.FirstName} ${admin.LastName}`
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          )
        );
      } else if (this.selected == '3') {
        this.dataSource = new _MatTableDataSource(
          this.listOfNonAdmins.filter((user) =>
            `${user.FirstName} ${user.LastName}`
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          )
        );
      }
      this.dataSource.paginator = this.paginator;
    }
  }
  checkIfAdmin(userId: string) {
    if (this.adminService.getAdminsIds.includes(userId)) return true;
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
          FirstName: user.FirstName,
          LastName: user.LastName,
        });
      }
    });
  }

  deleteAdmin(adminID: string) {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      data: {
        title: 'Remove Admin',
        content: 'Are you sure you want to remove this admin?',
        yes: 'Yes',
        no: 'cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.adminService.removeAdmin(adminID);
      }
    });
  }
}
