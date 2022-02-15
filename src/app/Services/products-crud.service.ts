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

    this.productsCollection = firestoreServices.collection<IProduct>('Products');
    this.products = this.productsCollection.snapshotChanges()
    .pipe(
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

  // Using firestore to delete any product
  deleteProduct(recordID){
    return this.firestoreServices.doc('Products/' + recordID).delete()
  }

  // Using firestore to delete any product
  updateProduct(recordID, record){
    return this.firestoreServices.doc('Products/' + recordID).update(record)
  }

  getProductById(prdId: string){
  return this.firestoreServices.doc('Products').valueChanges();
  }

}
