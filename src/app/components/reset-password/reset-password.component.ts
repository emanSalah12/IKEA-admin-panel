import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { DarkModeService } from 'src/app/Services/dark-mode.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  darkMode: boolean;
  loading: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  email: string = '';
  isAdmin: boolean = false;
  admins!: IAdmin[];

  constructor(
    private adminServ: AdminService,
    private router: Router,
    private loadingServ: LoadingService,
    private _snackBar: MatSnackBar,
    private darkmodeSer: DarkModeService
  ) {
    this.darkmodeSer.darkModeSubject.subscribe((status) => {
      this.darkMode = status;
    });
  }

  ngOnInit(): void {
    this.loadingServ.getLoadingStatus.subscribe((status) => {
      this.loading = status;
    });

    this.adminServ.getAdmins.subscribe((admins) => {
      this.admins = admins;
    });
  }

  openSnackBar(loginErrMessage: string) {
    this._snackBar.open(loginErrMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-alert'],
      duration: 4500,
    });
  }

  resetPassword() {
    this.isAdmin = this.admins.some((admin) => admin.Email === this.email);

    if (this.isAdmin) {
      this.adminServ.resetPassword(this.email);
    }

    this.openSnackBar(
      'If you are an admin and entered a valid email, you will find an email sent to you to reset your password.'
    );

    this.email = '';

    setTimeout(() => {
      this.router.navigate(['/Login']);
    }, 5000);
  }
}
