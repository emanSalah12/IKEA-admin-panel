import { Component, ElementRef, OnInit, ViewChild, Input, EventEmitter , OnChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  ID:string = ''
  message = ''
  listOfProducts: IProduct = {} as IProduct

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
    private productServices: ProductsCrudService,
    private router: Router ,
    private activeRouter : ActivatedRoute ,
  ) { }
  

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap) => {
      this.ID = paramMap.get('id')
      console.log(this.ID)

      // this.listOfProducts = this.productServices.getProductById(this.ID)
      // console.log(this.listOfProducts)
    
    })
  }


  ngAfterViewInit(): void {

    if (this.ID) {
      const listOfProducts = this.productServices.getProductById(
        this.ID
      );
      console.log(listOfProducts);

      // listOfProducts.subscribe((product) => {
      //   this.listOfProducts.Name = product.Name
      //   this.listOfProducts.Price = product.Price
      //   this.listOfProducts.Quantity = product.Quantity
      // });
    }
  }

  updateProduct(prdName: string, prdQuantity: string, prdPrice: string, prdMaterial:string, prdAval: string, prdDesc: string, prdLength: string, prdWidth: string, prdColor: string,prdDate: string, prdURL: string, prdSubCatg: string,){
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

    this.productServices.updateProduct(this.ID , recordData).then(res => {

      console.log(res);
      this.message = ('Product Successfully Updateeed...')
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
