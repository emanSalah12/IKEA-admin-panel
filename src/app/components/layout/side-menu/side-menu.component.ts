import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AdminService } from 'src/app/Services/admin-service/admin.service';
import { DarkModeService } from 'src/app/Services/dark-mode.service';
import { IAdmin } from 'src/app/ViewModels/iadmin';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  adminData!: IAdmin;
  darkMode: boolean;

  FullName!: string;
  email!: string;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private darkmodeSer: DarkModeService,
    private adminServ: AdminService
  ) {
    this.darkmodeSer.darkModeSubject.subscribe((status) => {
      this.darkMode = status;
    });
  }
  ngOnInit(): void {
    this.adminServ
      .getAdminById(
        localStorage.getItem('uid')
          ? localStorage.getItem('uid')
          : sessionStorage.getItem('uid')
      )
      .subscribe((admin) => {
        this.FullName = `${admin.FirstName} ${admin.LastName}`;
        this.email = admin.Email;
      });
  }
}
