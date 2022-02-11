import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReusableDialogComponent } from './materialComponents/reusable-dialog/reusable-dialog/reusable-dialog.component';

const MaterialComponents=[
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatDialogModule
]

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents],
  declarations: [
    ReusableDialogComponent
  ]
})
export class MaterialModule { }