import { Injectable } from '@angular/core';
import { IOrder } from '../Models/iorder';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersCollection: AngularFirestoreCollection<IOrder>;
  orders: Observable<IOrder[]>;
  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = firestore.collection<IOrder>('Orders');
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data() as IOrder;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
 
  }

  getAllOrders(): Observable<IOrder[]> {
    return this.orders;
  }

}
