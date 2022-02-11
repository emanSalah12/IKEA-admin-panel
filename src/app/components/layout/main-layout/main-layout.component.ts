import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog'; //import matDialog
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component'; //import our Dialog Component
import { LogoutDialogComponent } from './../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openLogoutDialog() {
    // this.dialog.open(LogoutDialogComponent , {data:{message:'Are you sure you want to log out?'}});

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
        //confirm case
        //call logout func here
      } else {
        console.log('cancelled');
      }
    });

  }
}
