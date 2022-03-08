import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iuser } from 'src/app/Models/iuser';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  listOfUsers: Observable<Iuser[]>;
  matchingUsers: Observable<Iuser[]>;
  private usersCollection: AngularFirestoreCollection<Iuser>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = firestore.collection<Iuser>('users');
    this.listOfUsers = this.usersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Iuser;
          const id = a.payload.doc.id;
          data.id = id;
          return data;
        })
      )
    );
    this.matchingUsers = this.listOfUsers;
  }

  get getAllUsers(): Observable<Iuser[]> {
    return this.listOfUsers;
  }

  getUserById(uId): Observable<Iuser> {
    return this.firestore
      .collection('users')
      .doc(uId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as Iuser;
          const id = a.payload.id;
          data.id = id;
          return data;
        })
      );
  }
}
