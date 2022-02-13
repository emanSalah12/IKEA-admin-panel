import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit,AfterViewInit {

  updateProdList: IProduct|null={} as IProduct
  prodSent: IProduct|null={} as IProduct
  ID:string = ''
  @ViewChild('IDp') changeID !:ElementRef
  @ViewChild('prdName') changeName !:ElementRef
  @ViewChild('prdQuan') changeQuan !:ElementRef
  @ViewChild('prdPrice') changePrice !:ElementRef
  @ViewChild('prdMaaterial') changeMaterial !:ElementRef
  @ViewChild('prdAval') changeAval !:ElementRef

  constructor(
    private productServices: ProductsCrudService,
    private router: Router ,
    private activeRouter : ActivatedRoute ,
  ) { }
  ngAfterViewInit(): void {
    if(this.ID = '')
    {
      this.updateProduct()
    }
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap) => {
      this.ID = paramMap.get('id')
      console.log(this.ID)

      this.updateProdList = this.productServices.getProdById(this.ID)
      console.log(this.updateProdList)

    })
  }


  EditProduct(IDp:string, nameProd:string, quanPrpd:string, priceProd:string, materPrd:string, avlProd:string)
  {
   this.prodSent = {
     id : IDp,
     Name: nameProd,
     Quantity: Number(quanPrpd), 
     Price: Number(priceProd),
     Material: materPrd,
     Online: avlProd,
   } 

   console.log(this.prodSent)
   this.productServices.updateProductByServices(this.prodSent)
  //  this.clearInput()
  }

  // private clearInput()
  // {
  //   this.changeID.nativeElement.value = ''
  //   this.changeName.nativeElement.value = ''
  //   this.changeQuan.nativeElement.value = ''
  //   this.changePrice.nativeElement.value = ''
  //   this.changeMaterial.nativeElement.value = ''
  //   this.changeAval.nativeElement.value = ''
  // }

  private updateProduct()
  {
    this.changeID.nativeElement.value = this.updateProdList?.id
    this.changeName.nativeElement.value = this.updateProdList?.Name
    this.changeQuan.nativeElement.value = this.updateProdList?.Quantity
    this.changePrice.nativeElement.value = this.updateProdList?.Price
    this.changeMaterial.nativeElement.value = this.updateProdList?.Material
    this.changeAval.nativeElement.value = this.updateProdList?.Online
  }

}
