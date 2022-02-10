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
      {Id: 1, name: 'first', price: 1.0079, quantity: 12, material: 'cotton', avail: true},
      {Id: 2, name: 'second', price: 4.0026, quantity: 12, material: 'cotton', avail: true},
      {Id: 3, name: 'third', price: 6.941, quantity: 15, material: 'cotton', avail: false},
      {Id: 4, name: 'fourth', price: 9.0122, quantity: 24, material: 'cotton', avail: true},
      {Id: 5, name: 'fifth', price: 10.811, quantity: 5, material: 'cotton', avail: false},
      {Id: 6, name: 'sixth', price: 12.0107, quantity: 2, material: 'cotton', avail: true},
      {Id: 7, name: 'seventh', price: 14.0067, quantity: 7, material: 'cotton' , avail: false},
      {Id: 8, name: 'eighth', price: 15.9994, quantity: 5, material: 'cotton', avail: false},
      {Id: 9, name: 'ninth', price: 18.9984, quantity: 1, material: 'cotton', avail: true},
      {Id: 10, name: 'tenth', price: 20.1797, quantity: 10, material: 'cotton', avail: true},
    ];
    
  }

  ngOnInit(): void {
  }

}
