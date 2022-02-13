import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../Services/admin-service/admin.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private adminServ: AdminService,
    private router: Router,
    private auth: AngularFireAuth,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      if (this.adminServ.isLogged) {
        resolve(true);
      } else {
        setTimeout(() => {
          if (this.adminServ.errorMessage !== undefined) {
            console.log('Guard ERROR: ' + this.adminServ.errorMessage);
            this.adminServ.errorMessage = undefined;
          } else if (this.adminServ.isLogged) {
            resolve(true);
          } else {
            localStorage.setItem('routeURL', state.url);

            this.router.navigate(['/Login']);

            this._snackBar.open(
              `You must log in first so you can go to ${state.url}`,
              '',
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['snackbar-alert'],
                duration: 3000,
              }
            );

            resolve(false);
          }
        }, 2500);
      }
    });
  }
}
