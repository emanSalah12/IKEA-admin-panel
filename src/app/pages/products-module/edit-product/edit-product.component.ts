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
  listOfProducts: IProduct|null={} as IProduct

  @ViewChild('prdName') changeName !:ElementRef
  @ViewChild('prdQuan') changeQuan !:ElementRef
  @ViewChild('prdPrice') changePrice !:ElementRef
  @ViewChild('prdMaterial') changeMaterial !:ElementRef
  @ViewChild('prdAval') changeAval !:ElementRef

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

  updateProduct(prdName: string, prdPrice: string, prdQuantity: string, prdMaterial:string, prdAval: string){
    let recordData={}
    recordData['Name'] = prdName
    recordData['Price'] = prdPrice
    recordData['Quantity'] = prdQuantity
    recordData['Material'] = prdMaterial
    recordData['Online'] = prdAval

    this.productServices.updateProduct(this.ID ,recordData).then(res => {

      console.log(res);
      this.message = ('Product Successfully Updateed...')
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
