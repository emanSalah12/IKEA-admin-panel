import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

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
