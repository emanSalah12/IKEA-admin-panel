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
  ) { }

  deleteProduct(recordID)
  {
    var sureMessage = confirm('Are you sure to delete record of product..!')
    if(sureMessage)
    {
      this.productServices.deleteProduct(recordID)
    }
  }

  editProduct(record)
  {

  }

  ngOnInit(): void {
    this.productServices.getAllProducts().subscribe((Products) => {
      this.listOfProducts = Products;
      console.log(this.listOfProducts[0].Name);
      
    });
  }

  ngOnChanges() {
    
  }   


}
