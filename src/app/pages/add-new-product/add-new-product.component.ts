import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  prdId: number
  prdName: string  ;
  prdPrice: number;
  prdQuan: number ;
  prdMaterial: string ;
  prdAvailability: boolean ;

  constructor() { }

  ngOnInit(): void {
  }

}

