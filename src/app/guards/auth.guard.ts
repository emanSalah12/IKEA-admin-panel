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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private adminServ: AdminService,
    private router: Router,
    private auth: AngularFireAuth
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
      setTimeout(() => {
        if (this.adminServ.isLogged) {
          resolve(true);
        } else {
          alert(`You must log in first so you can go to ${state.url}`);
          localStorage.setItem('routeURL', state.url);
          this.router.navigate(['/Login']);
          resolve(false);
        }
      }, 1200);
    });
  }
}
