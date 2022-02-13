import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog'; //import matDialog
import { Router } from '@angular/router';
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component'; //import our Dialog Component
import { AdminService } from 'src/app/Services/admin-service/admin.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  isLogged: boolean = false;
  email: string = '';
  name: string = '';

  constructor(
    private adminServ: AdminService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openLogoutDialog() {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      // data displayed in dialog
      data: {
        title: 'Log Out',
        content: 'Are you sure you want to log out ?',
        yes: 'Logout',
        no: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`); //'true' or 'false'

      if (result == 'true') {
        this.adminServ.logout();
        this.isLogged = this.adminServ.isLogged;
        this.router.navigate(['/Login']);
      } else {
        console.log('cancelled');
      }
    });
  }
}
