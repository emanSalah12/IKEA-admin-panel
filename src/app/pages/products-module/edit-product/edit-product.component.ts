import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iProducts';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  id: string = '';
  message = '';
  product: any = undefined;

  @ViewChild('prdPrdName') changePrdName!: ElementRef;
  @ViewChild('prdName') changeName!: ElementRef;
  @ViewChild('prdNameAr') changeNameAr!: ElementRef;
  @ViewChild('prdQuantity') changeQuan!: ElementRef;
  @ViewChild('prdPrice') changePrice!: ElementRef;
  @ViewChild('prdMaterial') changeMaterial!: ElementRef;
  @ViewChild('prdMaterialAr') changeMaterialAr!: ElementRef;
  @ViewChild('prdAvail') changeAval!: ElementRef;
  @ViewChild('prdDesc') changeDesc!: ElementRef;
  @ViewChild('prdDescAr') changeDescAr!: ElementRef;
  @ViewChild('prdLength') changeLength!: ElementRef;
  @ViewChild('prdWidth') changeWidth!: ElementRef;
  @ViewChild('prdColor') changeColor!: ElementRef;
  @ViewChild('prdColorAr') changeColorAr!: ElementRef;
  @ViewChild('prdURL') changeURL!: ElementRef;
  @ViewChild('prdSubCatg') changeSubCatg!: ElementRef;

  constructor(
    private productServices: ProductsCrudService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');

      this.productServices.getProdById(this.id).then((data) => {
        this.product = data;
        console.log('here>>>', this.product);
        console.log('here>>>', this.product.id);
      });
    });
  }

  updateProduct(
    prdPrdName: string,
    prdName: string,
    prdNameAr: string,
    prdQuantity: string,
    prdPrice: string,
    prdMaterial: string,
    prdMaterialAr: string,
    prdAval: string,
    prdDesc: string,
    prdDescAr: string,
    prdLength: string,
    prdWidth: string,
    prdColor: string,
    prdColorAr: string,
    prdURL: string,
    prdSubCatg: string
  ) {
    let recordData = {};
    if (prdURL) this.product.Images[0] = prdURL;
    recordData['ProductName'] = prdPrdName;
    recordData['Name'] = prdName;
    recordData['NameAr'] = prdNameAr;
    recordData['Price'] =+prdPrice;
    recordData['Quantity'] =+prdQuantity;
    recordData['Material'] = prdMaterial;
    recordData['MaterialAr'] = prdMaterialAr;
    recordData['Online'] = prdAval;
    recordData['Description'] = prdDesc;
    recordData['DescriptionAr'] = prdDescAr;
    recordData['CreatedAt'] = this.product.CreatedAt;
    recordData['Color'] = prdColor;
    recordData['ColorAr'] = prdColorAr;
    recordData['Images'] = this.product.Images;
    recordData['Length'] = +prdLength;
    recordData['Width'] = +prdWidth;
    recordData['SubCategory'] = prdSubCatg;

    this.productServices
      .updateProduct(this.id, recordData)
      .then((res) => {
        console.log(res);
        this.message = 'Product Successfully Updateeed...';
        this.clearInput();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private clearInput() {
    this.changePrdName.nativeElement.value = '';
    this.changeName.nativeElement.value = '';
    this.changeNameAr.nativeElement.value = '';
    this.changeQuan.nativeElement.value = '';
    this.changePrice.nativeElement.value = '';
    this.changeMaterial.nativeElement.value = '';
    this.changeMaterialAr.nativeElement.value = '';
    this.changeAval.nativeElement.value = '';
    this.changeDesc.nativeElement.value = '';
    this.changeDescAr.nativeElement.value = '';
    this.changeLength.nativeElement.value = '';
    this.changeWidth.nativeElement.value = '';
    this.changeColor.nativeElement.value = '';
    this.changeColorAr.nativeElement.value = '';
    this.changeURL.nativeElement.value = '';
    this.changeSubCatg.nativeElement.value = '';
  }
}
