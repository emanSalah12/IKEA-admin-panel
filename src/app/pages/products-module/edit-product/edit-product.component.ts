import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  updateProdList: IProduct|null={} as IProduct
  prodSent: IProduct[]
  ID:string = ''

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

      this.updateProdList = this.productServices.getProdById(this.ID)
      console.log(this.updateProdList)

    
    })
  }

  updateProduct(){
    
  }


  EditProduct()
  {
   this.clearInput()
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
