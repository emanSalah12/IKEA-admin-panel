import { Injectable } from '@angular/core';
import { IOrder } from '../Models/iorder';
import { Observable } from 'rxjs';
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

  getOrderById(oId: string): Observable<IOrder> {
    return this.firestore
      .collection('Orders')
      .doc(oId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as IOrder;
          const id = a.payload.id;
          data.id = id;
          // this.ordersIds.push(id);
          return data;
        })
      );
  }

  completeOrder(id: string) {
    this.firestore.doc(`Orders/${id}`).update({ Status: true });
  }
}
