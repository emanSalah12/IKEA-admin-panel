import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';
import { Subscription } from 'rxjs';
import { _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogComponent } from 'src/app/material/materialComponents/reusable-dialog/reusable-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  listOfProducts: IProduct[] = [];
  loading: boolean = true;
  // filterProduct: any[];
  subscriber: Subscription;
  dataSource: any;
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Price',
    'Quantity',
    'Material',
    'Action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productServices: ProductsCrudService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriber = this.productServices
      .getAllProducts()
      .subscribe((Products) => {
        this.listOfProducts = Products;
        this.dataSource = new _MatTableDataSource(this.listOfProducts);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        // console.log(this.listOfProducts[0].Name);
      });
  }

  filterData(quaryString: string) {
    if (quaryString) {
      this.dataSource = new _MatTableDataSource(
        this.listOfProducts.filter((prd) =>
          prd?.Name?.toLocaleLowerCase().includes(
            quaryString.toLocaleLowerCase()
          )
        )
      );
    } else {
      this.dataSource = new _MatTableDataSource(this.listOfProducts);
    }
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  deleteProduct(recordID) {
    let dialogRef = this.dialog.open(ReusableDialogComponent, {
      data: {
        title: 'Remove Product',
        content: 'Are you sure to delete record of product..!',
        yes: 'Yes',
        no: 'cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.productServices.deleteProduct(recordID);
      }
    });
  }

  editProduct(prdId: string) {
    // this.productServices.getProductById(prdId)
    console.log(prdId);
  }
}
