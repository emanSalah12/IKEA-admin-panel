import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iProducts';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsCrudService {
  listOfProducts: IProduct[];

  // Using FireStore
  private productsCollection: AngularFirestoreCollection<IProduct>
    products: Observable<IProduct[]>
    routeURL: string = ''
  
  constructor(
    public firestoreServices: AngularFirestore
  ) {
    

  this.productsCollection = firestoreServices.collection<IProduct>('Products');
  this.products = this.productsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data() as IProduct;
          data.id = a.payload.doc.id;
          console.log(data)
          return data;
        });
      })
    );

   }

  getAllProducts(): Observable<IProduct[]>{      
    // Using firestore
    return this.products
  }
 
}