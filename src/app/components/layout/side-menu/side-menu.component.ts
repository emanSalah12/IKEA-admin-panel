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
   darkMode:boolean;
  constructor(
    private adminServ: AdminService,
    public firebaseAuth: AngularFireAuth,
    private darkmodeSer:DarkModeService

  ) {
    darkmodeSer.darkModeSubject.subscribe(status=>{
          this.darkMode=status;
    })
  }

  ngOnInit(): void {
    this.adminData = localStorage.getItem('admin_data')
      ? JSON.parse(localStorage.getItem('admin_data'))
      : JSON.parse(sessionStorage.getItem('admin_data'));
  }
}
