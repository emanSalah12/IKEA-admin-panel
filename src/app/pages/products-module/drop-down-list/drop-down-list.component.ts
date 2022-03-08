import { Component, OnInit } from '@angular/core';
import { ISubCateg } from '../../../Models/ISubCategory';
import { ProductsCrudService } from 'src/app/Services/products-crud.service';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {

  categList: ISubCateg[] 
  constructor(private productServices: ProductsCrudService) { }

  ngOnInit(): void {
    // this.categList = this.productServices.getSubCateg()
  }

}
