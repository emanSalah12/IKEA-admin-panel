import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iProducts';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsCrudService {
  listOfProducts: IProduct[];

  // Using FireStore
  private productsCollection: AngularFirestoreCollection<IProduct>;
  products: Observable<IProduct[]>;
  routeURL: string = '';

  constructor(public firestoreServices: AngularFirestore) {
    this.listOfProducts = [
      {
        id: '1Ds3',
        Color: 'white',
        Description: 'des for product',
        Images: [],
        Length: 20,
        Width: 40,
        Name: 'Sofa',
        ProductName: 'Sofa',
        Price: 1200,
        Quantity: 20,
        Material: 'Cotton',
        Online: 'true',
        SubCategory: 'RoomCat',
      },
      {
        id: '1Ds3',
        Color: 'white',
        Description: 'des for product',
        Images: [],
        Length: 20,
        Width: 40,
        Name: 'Sofa',
        ProductName: 'Sofa',
        Price: 1200,
        Quantity: 20,
        Material: 'Cotton',
        Online: 'true',
        SubCategory: 'RoomCat',
      },
      {
        id: '1Ds3',
        Color: 'white',
        Description: 'des for product',
        Images: [],
        Length: 20,
        Width: 40,
        Name: 'Sofa',
        ProductName: 'Sofa',
        Price: 1200,
        Quantity: 20,
        Material: 'Cotton',
        Online: 'true',
        SubCategory: 'RoomCat',
      },
      {
        id: '1Ds3',
        Color: 'white',
        Description: 'des for product',
        Images: [],
        Length: 20,
        Width: 40,
        Name: 'Sofa',
        ProductName: 'Sofa',
        Price: 1200,
        Quantity: 20,
        Material: 'Cotton',
        Online: 'true',
        SubCategory: 'RoomCat',
      },
      {
        id: '1Ds3',
        Color: 'white',
        Description: 'des for product',
        Images: [],
        Length: 20,
        Width: 40,
        Name: 'Sofa',
        ProductName: 'Sofa',
        Price: 1200,
        Quantity: 20,
        Material: 'Cotton',
        Online: 'true',
        SubCategory: 'RoomCat',
      },
    ];

    this.productsCollection =
      firestoreServices.collection<IProduct>('Products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data() as IProduct;
          data.id = a.payload.doc.id;
          console.log(data);
          return data;
        });
      })
    );
  }

  // Using firestore to showing all products data
  getAllProducts(): Observable<IProduct[]> {
    // Using firestore
    return this.products;
  }

  // Using firestore to add new product
  createNewProduct(record) {
    return this.firestoreServices.collection('Products').add(record);
  }

  // getProdById(prdId: string): IProduct | null {
  //   let product = this.listOfProducts.find((prod) => prod.id == prdId);
  //   return product ? product : null;
  // }

  // getMatchingproducts(searchText: string): IProduct[] {
  //   var matchingProducts = [] as IProduct[];
  //   this.listOfProducts.find((prd) => {
  //     if (prd.SubCategory.includes(searchText.toLocaleLowerCase())) {
  //       matchingProducts.push(prd);
  //     }
  //   });
  //   return matchingProducts;
  // }

  updateRecord(id: string, value: string) {
    this.firestoreServices.doc(`Products/${id}`).update({ Material: value });
  }
}
