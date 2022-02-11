import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsCrudService {
  listOfProducts=[{
    id:"1Ds3",
  Color: "white",
  Description:"des for product",
  Images: [],
  Length: 20,
  Width:40,
  Name: "Sofa",
  ProductName: "Sofa",
  Price: 1200,
  Quantity: 20,
  material: "Cotton",
  Online: true,
  SubCategory:"RoomCat",
  },
  {
    id:"1Ds3",
  Color: "white",
  Description:"des for product",
  Images: [],
  Length: 20,
  Width:40,
  Name: "Sofa",
  ProductName: "Sofa",
  Price: 1200,
  Quantity: 20,
  material: "Cotton",
  Online: true,
  SubCategory:"RoomCat",
  },
  {
    id:"1Ds3",
  Color: "white",
  Description:"des for product",
  Images: [],
  Length: 20,
  Width:40,
  Name: "Sofa",
  ProductName: "Sofa",
  Price: 1200,
  Quantity: 20,
  material: "Cotton",
  Online: true,
  SubCategory:"RoomCat",
  },
  {
    id:"1Ds3",
  Color: "white",
  Description:"des for product",
  Images: [],
  Length: 20,
  Width:40,
  Name: "Sofa",
  ProductName: "Sofa",
  Price: 1200,
  Quantity: 20,
  material: "Cotton",
  Online: true,
  SubCategory:"RoomCat",
  },
  {
    id:"1Ds3",
  Color: "white",
  Description:"des for product",
  Images: [],
  Length: 20,
  Width:40,
  Name: "Sofa",
  ProductName: "Sofa",
  Price: 1200,
  Quantity: 20,
  material: "Cotton",
  Online: true,
  SubCategory:"RoomCat",
  },
]
  constructor() { }

  getAllProducts():IProduct[]{
    // //get products from firebase
    return this.listOfProducts
  }
  getMatchingproducts(searchText:string):IProduct[]{
    var matchingProducts=[] as IProduct[];
    this.listOfProducts.find((prd)=>{
      if(prd.SubCategory.includes(searchText.toLocaleLowerCase()))
      {
        matchingProducts.push(prd);
      }
    })
    return matchingProducts;
  }
}