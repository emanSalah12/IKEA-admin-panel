import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin-service/admin.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
})
export class LogoutDialogComponent implements OnInit {
  isLogged: boolean = false;
  email: string = '';
  name: string = '';

  constructor(private adminServ: AdminService, private router: Router) {}

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
  }

  confirmLogout() {
    this.adminServ.logout();
    this.isLogged = this.adminServ.isLogged;
    this.router.navigate(['/Login']);
  }
}
