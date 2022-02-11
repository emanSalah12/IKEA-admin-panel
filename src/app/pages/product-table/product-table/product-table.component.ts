import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/iProducts';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})

export class ProductTableComponent implements OnInit {

  prdList: IProduct[];

  constructor() { 
    this.prdList = [
      {id: '1h', name: 'first', price: 1.0079, quantity: 12, material: 'cotton', avail: true},
      {id: '2h', name: 'second', price: 4.0026, quantity: 12, material: 'cotton', avail: true},
      {id: '3h', name: 'third', price: 6.941, quantity: 15, material: 'cotton', avail: false},
      {id: '4h', name: 'fourth', price: 9.0122, quantity: 24, material: 'cotton', avail: true},
      {id: '5h', name: 'fifth', price: 10.811, quantity: 5, material: 'cotton', avail: false},
      {id: '6h', name: 'sixth', price: 12.0107, quantity: 2, material: 'cotton', avail: true},
      {id: '7h', name: 'seventh', price: 14.0067, quantity: 7, material: 'cotton' , avail: false},
      {id: '8h', name: 'eighth', price: 15.9994, quantity: 5, material: 'cotton', avail: false},
      {id: '9h', name: 'ninth', price: 18.9984, quantity: 1, material: 'cotton', avail: true},
      {id: '1h', name: 'tenth', price: 20.1797, quantity: 10, material: 'cotton', avail: true},
    ];
    
  }

  ngOnInit(): void {
  }

}
