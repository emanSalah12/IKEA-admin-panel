import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private adminsCollection: AngularFirestoreCollection<IAdmin>;
  admins: Observable<IAdmin[]>;

  routeURL: string = '';

  public isLoggedSubject: BehaviorSubject<boolean>;

  email: string = '';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

    this.adminsCollection = firestore.collection<IAdmin>('Admins');
    this.admins = this.adminsCollection.valueChanges();
  }

  get getAdmins(): Observable<IAdmin[]> {
    return this.admins;
  }

  addAdmin(admin: IAdmin) {
    this.firestore.collection<IAdmin>('Admins').doc(admin.id).set(admin);
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
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('UID');
    this.isLoggedSubject.next(false);
    // this.email = '';
  }

  get isLogged(): boolean {
    return localStorage.getItem('UID') ? true : false;
  }

  get getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
