import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsCrudService {
  listOfProducts: IProduct[];

  
  constructor() {
    this.listOfProducts=[{
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
    Material: "Cotton",
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
    Material: "Cotton",
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
    Material: "Cotton",
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
    Material: "Cotton",
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
    Material: "Cotton",
    Online: true,
    SubCategory:"RoomCat",
    },
  ]
   }

  getAllProducts():IProduct[]{
    // //get products from firebase
    return this.listOfProducts
  }

  addNewProduct(product: IProduct) {
    this.listOfProducts.push(product);
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