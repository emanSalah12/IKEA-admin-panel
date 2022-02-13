import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { _MatTableDataSource } from '@angular/material/table';
import { IOrder } from 'src/app/Models/iorder';
import { OrdersService } from 'src/app/Services/orders.service';
import { MatDialog } from '@angular/material/dialog'; //import matDialog
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component';
// import { LogoutDialogComponent } from './../logout-dialog/logout-dialog.component';//import our Dialog Component

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'total',
    'purchaseDate',
    'status',
    'action',
  ];

  ordersList?: IOrder[];
  dataSource: any;
  loading:boolean=true;
  selected = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orders: OrdersService, private dialog: MatDialog) {

      this.orders.getAllOrders()?.subscribe(arg => {
        console.log("observables",arg);
        this.ordersList = arg;    
        this.dataSource = new _MatTableDataSource(this.ordersList);
        this.dataSource.paginator = this.paginator;
        this.loading=false
  
      });   
  }

  ngOnInit(): void {
  }

  completeOrder(order: IOrder) {
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
        this.confirmComplete(order);
      }else{
        console.log('cancelled');
      }
    });
  }

  confirmComplete(order: IOrder) {
    this.orders.completeOrder(order.id);
  }

  filter(){
    this.dataSource.filter = this.selected.trim().toLowerCase();;
  }

}
