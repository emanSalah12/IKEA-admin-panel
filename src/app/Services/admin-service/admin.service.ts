import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IAdmin } from 'src/app/ViewModels/iadmin';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  listOfAdmins: IAdmin[] = [
    // {
    //   id: '2',
    //   FullName: 'Raghda Mohsen',
    //   Email: 'Raghda@gmail.com',
    //   Password: '1234',
    // },
  ];

  private adminsCollection: AngularFirestoreCollection<IAdmin>;
  admins: Observable<IAdmin[]>;

  routeURL: string = '';

  private isLoggedSubject: BehaviorSubject<boolean>;

  email: string = '';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

    this.adminsCollection = firestore.collection<IAdmin>('Admins');
    this.admins = this.adminsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as IAdmin;
          const id = a.payload.doc.id;
          data.id=id;
          return data;
        })
      )
    );
  }

  get getAdmins(): Observable<IAdmin[]> {
    return this.admins;
  }

  addAdmin(admin: IAdmin) {
    this.firestore.collection<IAdmin>('Admins').doc(admin.id).set({FullName:admin.FullName,Email:admin.Email});
  }

  async login(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.email = email;
        // this.password = password;

        this.isLoggedSubject.next(true);
        localStorage.setItem('UID', JSON.stringify(userCredential.user?.uid));
      })
      .catch((err) => {
        console.log(err);
      });

    // this.routeURL = await this.firebaseAuth.onAuthStateChanged(user=> user && )
  }

  logout() {
    // localStorage.removeItem('token');
    // this.isLoggedSubject.next(false);

    // this.email = '';
    // this.password = '';

    this.firebaseAuth.signOut();
    localStorage.removeItem('UID');
    this.isLoggedSubject.next(false);
  }

  get isLogged(): boolean {
    return localStorage.getItem('UID') ? true : false;
  }

  get getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}