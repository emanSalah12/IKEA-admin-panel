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
    // this.prodListMatchCategID = this.productServices.getAllProducts();
    this.productServices.getAllProducts().subscribe((Products) => {
      this.listOfProducts = Products;
    });
  }

  ngOnChanges() {
    
  }   


}
