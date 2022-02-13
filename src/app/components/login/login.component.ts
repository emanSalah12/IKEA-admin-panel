import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';
import { LoadingService } from './../../Services/loading.service';

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
export class LoginComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  admins!: IAdmin[];

  email: string = '';
  password: string = '';

  loading: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private adminServ: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private loadingServ: LoadingService
  ) {}

  ngOnInit() {
    this.isLogged = this.adminServ.isLogged;

    this.adminServ.getAdmins.subscribe((admins) => {
      this.admins = admins;
    });

    this.adminServ.isLogged
      ? this.router.navigate(['/Dashboard'])
      : this.router.navigate(['/Login']);

    this.loadingServ.getLoadingStatus.subscribe((status) => {
      this.loading = status;
    });
  }

  ngOnDestroy(): void {
    this.loadingServ.loadingSubject.next(false);
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
    this.loading = true;

    this.isAdmin = this.admins.some((admin) => admin.Email === this.email);

    if (this.isAdmin) {
      await this.adminServ.login(this.email, this.password);
      this.isLogged = this.adminServ.isLogged;

      if (this.isLogged) {
        this.loadingServ.loadingSubject.next(false);

        if (localStorage.getItem('routeURL')) {
          this.router.navigate([`${localStorage.getItem('routeURL')}`]);
          localStorage.removeItem('routeURL');
        } else {
          this.router.navigate(['/Dashboard']);
        }
      } else {
        this.openSnackBar(loginError.WRONG_PASSWORD);
        this.loadingServ.loadingSubject.next(false);
      }
    } else {
      this.openSnackBar(loginError.NOT_ADMIN);
      this.loadingServ.loadingSubject.next(false);
    }
  }
}
