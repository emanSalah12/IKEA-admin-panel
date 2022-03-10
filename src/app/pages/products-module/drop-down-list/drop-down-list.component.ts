import { Component, OnInit } from '@angular/core';
import { productsSubCategservice } from 'src/app/Services/productsSubCategservice';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
})
export class DropDownListComponent implements OnInit {
  categList = [];
  categListName = '';
  subCategNameList = [];
  subCategIDList = [];

  constructor(private productServices: productsSubCategservice) {}

  ngOnInit(): void {
    this.productServices.getSubCateg().subscribe((categListt) => {
      console.log(categListt);
      this.categListName = categListt[0].Name;
      console.log(this.categListName);

      // categListt.forEach((catgName) => {
      // this.subCategNameList.push(catgName.Name)
      // this.subCategIDList.push(catgName.id)
      // console.log(this.subCategNameList);
      // console.log(this.subCategIDList);

      categListt.forEach((catgName) => {
        this.categList.push({ Name: catgName.Name, id: catgName.id });
      });

      console.log(this.categList);
    });
  }
}
