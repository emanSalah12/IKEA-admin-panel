import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  listOfProducts: IProduct[];
  loading: boolean = true;
  filterProduct: any[];
  subscriber: Subscription;

  constructor(private productServices: ProductsCrudService) {}

  deleteProduct(recordID) {
    var sureMessage = confirm('Are you sure to delete record of product..!');
    if (sureMessage) {
      this.productServices.deleteProduct(recordID);
    }
  }

  ngOnInit(): void {
    this.subscriber = this.productServices
      .getAllProducts()
      .subscribe((Products) => {
        this.filterProduct = this.listOfProducts = Products;
        this.loading = false;
        console.log(this.listOfProducts[0].Name);
      });
  }

  filterData(quaryString: string) {
    if (quaryString) {
      this.filterProduct = this.listOfProducts.filter((prd) =>
        prd.Name.toLowerCase().includes(quaryString.toLowerCase())
      );
    } else {
      this.filterProduct = this.listOfProducts;
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
