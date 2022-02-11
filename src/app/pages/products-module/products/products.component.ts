
// import {
//   AfterViewChecked,
//   AfterViewInit,
//   Component,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { _MatTableDataSource } from '@angular/material/table';
// import { OrdersService } from 'src/app/Services/orders.service';
// import { MatDialog } from '@angular/material/dialog'; //import matDialog
// import { IProduct } from 'src/app/Models/iProducts';
// import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog/reusable-dialog.component';
// // import { LogoutDialogComponent } from './../logout-dialog/logout-dialog.component';//import our Dialog Component
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.scss']
// })
// export class ProductsComponent implements OnInit, AfterViewInit {
//   displayedColumns: string[] = [
//     'index',
//     'total',
//     'purchaseDate',
//     'status',
//     'action',
//   ];

//   ordersList: IProduct[];
//   dataSource: any;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   constructor(private orders: OrdersService, private dialog: MatDialog) {
//     // this.ordersList = this.orders.getOrders();
//     this.dataSource = new _MatTableDataSource(this.ordersList);
//   }

//   ngAfterViewInit(): void {
//     this.dataSource.paginator = this.paginator;
//     console.log(this.paginator);
//   }

//   completeOrder(order: IProduct) {
//     let dialogRef = this.dialog.open(ReusableDialogComponent, {
//       // data displayed in dialog
//       data: {
//         title: 'complete Order',
//         content: 'Are you sure you want to complete Order ?',
//         yes: 'complete',
//         no: 'cancel',
//       },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(`Dialog result: ${result}`); //'true' or 'false'

//       if (result == 'true') {  //confirm case
//         // this.confirmComplete(order);
//       }else{
//         console.log('cancelled');
//       }
//     });
//   }

//   ngOnInit(): void {}
// }


// import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { IProduct } from 'src/app/Models/iProducts';
// import { ProductsCrudService } from 'src/app/Services/products-crud.service';

// @Component({
//     selector: 'app-products',
//     templateUrl: './products.component.html',
//     styleUrls: ['./products.component.scss']
//   })
// export class ProductsComponent implements OnInit{
//   listOfProducts: IProduct[];
//   searchText:string;
//   displayedColumns: string[] = [
//     'position',
//     'Name',
//     'Price',
//     'Material',
//     'Quantity',
//     'Availability',
//     'Action',
//   ];
//   constructor(
//     private prdService: ProductsCrudService,
//   ) {
//     this.listOfProducts = this.prdService.getAllProducts();
//     this.searchText="";
//   }
//   ngOnInit(): void {}
//   onTextChange(){
//     if(this.searchText=="")
//     {
//       this.listOfProducts= this.prdService.getAllProducts();
//     }
//     else{
//       this.listOfProducts=this.prdService.getMatchingproducts(this.searchText);
//     }
//   }
//   // checkIfAdmin(userId: string) {
//   //   for (let admin of this.listOfAdmins) {
//   //     if (admin.id == userId) return true;
//   //   }
//   //   return false;
//   // }
//   // addNewAdmin(user: IProduct) {
//   //   this.adminService.addAdmin({
//   //     id: user.id,
//   //     Email: user.Email,
//   //     FullName: `${user.FirstName} ${user.LastName}`,
//   //     Password: user.Password,
//   //   });
//   // }
// }

import { Component, OnInit, OnChanges } from '@angular/core';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';


@Component({
      selector: 'app-products',
      templateUrl: './products.component.html',
      styleUrls: ['./products.component.scss']
    })
  export class ProductsComponent implements OnInit, OnChanges{

  prdList: IProduct[];
  prodListMatchCategID: IProduct[] = [];
  listOfProducts: IProduct[];
  searchText:string;

  constructor(
    private productServices: ProductsCrudService
  ) { 
    // this.prdList = [
    //   {id: '1h', Name: 'first', Price: 1.0079, Quantity: 12, Material: 'cotton', Online: true},
    //   {id: '2h', Name: 'second', Price: 4.0026, Quantity: 12, Material: 'cotton', Online: true},
    //   {id: '3h', Name: 'third', Price: 6.941, Quantity: 15, Material: 'cotton', Online: false},
    //   {id: '4h', Name: 'fourth', Price: 9.0122, Quantity: 24, Material: 'cotton', Online: true},
    //   {id: '5h', Name: 'fifth', Price: 10.811, Quantity: 5, Material: 'cotton', Online: false},
    //   {id: '6h', Name: 'sixth', Price: 12.0107, Quantity: 2, Material: 'cotton', Online: true},
    //   {id: '7h', Name: 'seventh', Price: 14.0067, Quantity: 7, Material: 'cotton' , Online: false},
    //   {id: '8h', Name: 'eighth', Price: 15.9994, Quantity: 5, Material: 'cotton', Online: false},
    //   {id: '9h', Name: 'ninth', Price: 18.9984, Quantity: 1, Material: 'cotton', Online: true},
    //   {id: '1h', Name: 'tenth', Price: 20.1797, Quantity: 10, Material: 'cotton', Online: true},
    // ];
    
  }

  ngOnInit(): void {
    this.prodListMatchCategID = this.productServices.getAllProducts();
  }

  ngOnChanges() {
    
  }

  onTextChange(){
        if(this.searchText=="")
        {
          this.listOfProducts= this.productServices.getAllProducts();
        }
        else{
          this.listOfProducts=this.productServices.getMatchingproducts(this.searchText);
        }
      }
      


}
