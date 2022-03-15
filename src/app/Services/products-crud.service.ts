import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../Models/iProducts';

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

  // Using firestore to delete any product
  deleteProduct(recordID) {
    return this.firestoreServices.doc('Products/' + recordID).delete();
  }

  // Using firestore to delete any product
  updateProduct(recordID, record) {
    return this.firestoreServices.doc('Products/' + recordID).update(record);
  }

  getProductDetailsById(prdId: string): Observable<IProduct> {
    return this.firestoreServices
      .collection('Products')
      .doc(prdId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as IProduct;
          const id = a.payload.id;
          data.id = id;
          return data;
        })
      );
  }

  async getProdById (prdId: string) {
    let prod={};
   await this.firestoreServices
      .collection('Products')
      .doc(prdId)
      .ref.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('exist', doc.data());
          prod=doc.data();
          prod['id']=prdId;
        } else {
          console.log('There is no document!');
        }
      })
      .catch(function (error) {
        console.log('There was an error getting your document:', error);
      });

      return prod;
  }
}
