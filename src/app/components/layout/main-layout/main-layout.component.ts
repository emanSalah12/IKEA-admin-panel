import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @HostBinding('class') className = '';
  isLogged: boolean = false;
  email: string = '';
  name: string = '';
  toggleControl = new FormControl(false);
  constructor(
    private adminServ: AdminService,
    private router: Router,
    public dialog: MatDialog,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.adminServ.getLoggedStatus.subscribe((status) => {
      this.isLogged = status;

      if (this.isLogged) {
        if (localStorage.getItem('email'))
          this.email = localStorage.getItem('email')!;
        else this.email = this.adminServ.email;
        localStorage.setItem('email', this.email);
      } else {
        this.email = '';
        localStorage.removeItem('email');
      }
    });

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      sessionStorage.setItem('darkMode',darkMode);
      console.log(darkMode);
      
      
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });

  }

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
        this.adminServ.logout();
        this.isLogged = this.adminServ.isLogged;
        this.router.navigate(['/Login']);
      } else {
        console.log('cancelled');
      }
    });
  }
}
