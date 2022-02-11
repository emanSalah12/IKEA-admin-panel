import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/Models/iorder';
import { OrdersService } from 'src/app/Services/orders.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})


export class OrdersComponent implements OnInit {
  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol','action'];
  displayedColumns: string[] = ['index', 'total', 'purchaseDate', 'status','action'];

  dataSource = ELEMENT_DATA;
  ordersList:IOrder[];

  constructor( private orders:OrdersService) {
    this.ordersList=this.orders.getOrders();
   }

   completeOrder(){
     alert('completed')
   }

  ngOnInit(): void {
  }

}
