import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  admins!: IAdmin[];

  email: string = '';
  password: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private adminServ: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLogged = this.adminServ.isLogged;

    this.adminServ.getAdmins.subscribe((admins) => {
      this.admins = admins;
    });

    this.adminServ.isLogged
      ? this.router.navigate(['/Dashboard'])
      : this.router.navigate(['/Login']);
  }

  openSnackBar() {
    this._snackBar.open('You are not an admin!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-warning'],
      duration: 3000,
    });
  }

  login() {
    console.log(this.admins);
    console.log(this.email);

    this.isAdmin = this.admins.some((admin) => admin.Email === this.email);

    if (this.isAdmin) {
      this.adminServ.login(this.email, this.password);
      this.isLogged = this.adminServ.isLogged;
      if (localStorage.getItem('routeURL')) {
        this.router.navigate([`${localStorage.getItem('routeURL')}`]);
        localStorage.removeItem('routeURL');
      } else {
        this.router.navigate(['/Dashboard']);
      }
    } else {
      this.openSnackBar();
    }
  }
}
