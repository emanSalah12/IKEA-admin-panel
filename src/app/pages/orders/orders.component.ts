import { OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { _MatTableDataSource } from '@angular/material/table';
import { IOrder } from 'src/app/Models/iorder';
import { OrdersService } from 'src/app/Services/orders.service';
import { MatDialog } from '@angular/material/dialog'; //import matDialog
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'index',
    'total',
    'purchaseDate',
    'status',
    'action',
  ];

  ordersList?: IOrder[];
  dataSource: any;
  loading: boolean = true;
  selected = '';
  private subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orders: OrdersService, private dialog: MatDialog) {
    this.setOrders();
  }

  setOrders() {
    this.loading = true;
    let getSubscription = this.orders
      .getAllOrders(this.selected)
      ?.subscribe((arg) => {
        console.log('observables filter', arg);
        this.ordersList = arg;
        this.dataSource = new _MatTableDataSource(this.ordersList);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });

    this.subscriptions.push(getSubscription);
  }

  ngOnInit(): void {}

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

      if (result == 'true') {
        this.confirmComplete(order);
      } else {
        console.log('cancelled');
      }
    });
  }

  confirmComplete(order: IOrder) {
    // console.log(this.subscriptions);
    for (let i in this.subscriptions) {
      // console.log(i);
      +i < this.subscriptions.length - 1 && this.subscriptions[i].unsubscribe();
    }

    this.orders.completeOrder(order.id);
  }

  filter() {
    // console.log('in filter', this.selected);
    this.setOrders();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
