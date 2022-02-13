import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

enum loginError {
  NOT_ADMIN = 'You are not an admin',
  WRONG_PASSWORD = 'The password is wrong or the email does not have a password',
}

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

  @ViewChild('loginForm') form: ElementRef;

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

    this.form.nativeElement.click(); // To make sure the validation works correctly
  }

  openSnackBar(loginErrMessage: string) {
    this._snackBar.open(loginErrMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-alert'],
      duration: 3000,
    });
  }

  async login() {
    this.isAdmin = this.admins.some((admin) => admin.Email === this.email);

    if (this.isAdmin) {
      await this.adminServ.login(this.email, this.password);
      this.isLogged = this.adminServ.isLogged;

      if (this.isLogged) {
        if (localStorage.getItem('routeURL')) {
          this.router.navigate([`${localStorage.getItem('routeURL')}`]);
          localStorage.removeItem('routeURL');
        } else {
          this.router.navigate(['/Dashboard']);
        }
      } else {
        this.openSnackBar(loginError.WRONG_PASSWORD);
      }
    } else {
      this.openSnackBar(loginError.NOT_ADMIN);
    }
  }
}
