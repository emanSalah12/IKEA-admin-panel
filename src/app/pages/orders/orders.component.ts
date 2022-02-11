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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'index',
    'total',
    'purchaseDate',
    'status',
    'action',
  ];

  ordersList: IOrder[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orders: OrdersService) {
    this.ordersList = this.orders.getOrders();
    this.dataSource = new _MatTableDataSource(this.ordersList);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator);
  }

  completeOrder(order: IOrder) {
    console.log('ele', this.dataSource.data); //array of data displayed in table
    this.dataSource.data.forEach((element: IOrder) => {
      if (element.id == order.id) 
          element.Status = true;
    });
  }

  ngOnInit(): void {}
}
