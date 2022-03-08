import { Component, OnInit } from '@angular/core';
import { ISubCateg } from '../../../Models/ISubCategory';
import { productsSubCategservice } from 'src/app/Services/productsSubCategservice';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {

  categList: ISubCateg[]
  categListName = '' 
  
  constructor(private productServices: productsSubCategservice) { }

  ngOnInit(): void {
    this.productServices.getSubCateg().subscribe(categList => {
      // console.log(categList);
      this.categListName = categList[0].Name
      console.log(this.categListName);
      
      
    })
  }

  fillData() {
    for (let i of this.categList) {
      console.log(i);
    }
    console.log('Clicked in Dropdown list');
    
  }

}
