import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  newProdList: any 
  @ViewChild('IDp') changeID !:ElementRef
  @ViewChild('prdName') changeName !:ElementRef
  @ViewChild('prdQuan') changeQuan !:ElementRef
  @ViewChild('prdPrice') changePrice !:ElementRef
  @ViewChild('prdMaterial') changeMaterial !:ElementRef
  @ViewChild('prdAval') changeImg !:ElementRef

  constructor(
    private productServices : ProductsCrudService
  ) { }

  ngOnInit(): void {
  }

  addNewProduct(IDp: string, nameProd: string, quanPrpd: string, priceProd: string, materPrd:string, avlProd: string)
  {
    this.newProdList = {
      ID: IDp,
      Name: nameProd,
      Quantity: Number(quanPrpd),
      Price: Number(priceProd),
      Material: materPrd,
      Online: avlProd,
    }
    console.log(this.newProdList)
    this.productServices.addNewProduct(this.newProdList) 
    this.clearInput()
  }

  private clearInput()
  {
    this.changeID.nativeElement.value = ''
    this.changeName.nativeElement.value = ''
    this.changeQuan.nativeElement.value = ''
    this.changePrice.nativeElement.value = ''
    this.changeMaterial.nativeElement.value = ''
    this.changeImg.nativeElement.value = ''
  }
}
