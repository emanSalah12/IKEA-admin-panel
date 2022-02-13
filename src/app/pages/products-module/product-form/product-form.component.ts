import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  message = ''

  @ViewChild('prdName') changeName !:ElementRef
  @ViewChild('prdQuantity') changeQuan !:ElementRef
  @ViewChild('prdPrice') changePrice !:ElementRef
  @ViewChild('prdMaterial') changeMaterial !:ElementRef
  @ViewChild('prdAvail') changeAval !:ElementRef

  constructor(
    private productServices : ProductsCrudService
  ) { }

  ngOnInit(): void {
  }

  saveProduct(prdName: string, prdQuantity: string, prdPrice: string, prdMaterial:string, prdAval: string){
    let recordData={}
    recordData['Name'] = prdName
    recordData['Price'] = prdPrice
    recordData['Quantity'] = prdQuantity
    recordData['Material'] = prdMaterial
    recordData['Online'] = prdAval

    this.productServices.createNewProduct(recordData).then(res => {

      console.log(res);
      this.message = ('Product Successfully added...')
      this.clearInput()
      
    }).catch(error => {
      console.log(error)
    })
  }

  private clearInput()
  {
    this.changeName.nativeElement.value = ''
    this.changeQuan.nativeElement.value = ''
    this.changePrice.nativeElement.value = ''
    this.changeMaterial.nativeElement.value = ''
    this.changeAval.nativeElement.value = ''
  }
}
