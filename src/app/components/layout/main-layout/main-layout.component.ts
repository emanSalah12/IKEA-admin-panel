import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openLogoutDialog() {
    this.dialog.open(LogoutDialogComponent);
  }
}
