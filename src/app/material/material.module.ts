import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReusableDialogComponent } from './materialComponents/reusable-dialog/reusable-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: [ReusableDialogComponent],
})
export class MaterialModule {}
