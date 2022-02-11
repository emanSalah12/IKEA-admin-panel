
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { _MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/Services/orders.service';
import { MatDialog } from '@angular/material/dialog'; //import matDialog
import { IProduct } from 'src/app/Models/iProducts';
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog/reusable-dialog.component';
// import { LogoutDialogComponent } from './../logout-dialog/logout-dialog.component';//import our Dialog Component
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'index',
    'total',
    'purchaseDate',
    'status',
    'action',
  ];

  ordersList: IProduct[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orders: OrdersService, private dialog: MatDialog) {
    // this.ordersList = this.orders.getOrders();
    this.dataSource = new _MatTableDataSource(this.ordersList);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator);
  }

  completeOrder(order: IProduct) {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      // data displayed in dialog
      data: {
        title: 'complete Order',
        content: 'Are you sure you want to complete Order ?',
        yes: 'complete',
        no: 'cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`); //'true' or 'false'

      if (result == 'true') {  //confirm case
        // this.confirmComplete(order);
      }else{
        console.log('cancelled');
      }
    });
  }

  ngOnInit(): void {}
}
