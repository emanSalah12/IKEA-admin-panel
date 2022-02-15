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
  @ViewChild('prdDesc') changeDesc !:ElementRef
  @ViewChild('prdLength') changeLength !:ElementRef
  @ViewChild('prdWidth') changeWidth !:ElementRef
  @ViewChild('prdColor') changeColor !:ElementRef
  @ViewChild('prdDate') changeDate !:ElementRef
  @ViewChild('prdURL') changeURL !:ElementRef
  @ViewChild('prdSubCatg') changeSubCatg !:ElementRef

  constructor(
    private productServices : ProductsCrudService
  ) { }

  ngOnInit(): void {
  }

  saveProduct(prdName: string, prdQuantity: string, prdPrice: string, prdMaterial:string, prdAval: string, prdDesc: string, prdLength: string, prdWidth: string, prdColor: string,prdDate: string, prdURL: string, prdSubCatg: string,){
    let recordData={}
    recordData['Name'] = prdName
    recordData['Price'] = prdPrice
    recordData['Quantity'] = prdQuantity
    recordData['Material'] = prdMaterial
    recordData['Online'] = prdAval
    recordData['Description'] = prdDesc
    recordData['CreatedAt'] = prdDate
    recordData['Color'] = prdColor
    recordData['Images'] = prdURL
    recordData['Length'] = prdLength
    recordData['Width'] = prdWidth
    recordData['SubCategory'] = prdSubCatg

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
    this.changeDesc.nativeElement.value = ''
    this.changeLength.nativeElement.value = ''
    this.changeWidth.nativeElement.value = ''
    this.changeColor.nativeElement.value = ''
    this.changeURL.nativeElement.value = ''
    this.changeDate.nativeElement.value = ''
    this.changeSubCatg.nativeElement.value = ''
  }
}
