import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
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
  private adminsIds: string[];

  routeURL: string = '';
  errorMessage!: Error | undefined;

  rememberMe!: BehaviorSubject<boolean>;

  loggedInAdmin!: IAdmin;

  public isLoggedSubject: BehaviorSubject<boolean>;

  email: string = '';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);
    this.rememberMe = new BehaviorSubject<boolean>(true);

    this.adminsCollection = firestore.collection<IAdmin>('Admins');
    this.adminsIds = [];
    this.admins = this.adminsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as IAdmin;
          const id = a.payload.doc.id;
          data.id = id;
          this.adminsIds.push(id);
          return data;
        })
      )
    );
  }

  get getAdmins(): Observable<IAdmin[]> {
    return this.admins;
  }

  get getAdminsIds(): string[] {
    return this.adminsIds;
  }

  addAdmin(admin: IAdmin) {
    this.adminsCollection.doc(admin.id).set({
      FirstName: admin.FirstName,
      LastName: admin.LastName,
      Email: admin.Email,
    });
  }

  removeAdmin(adminId: string) {
    this.adminsCollection.doc(adminId).delete();
    this.adminsIds.find((id, index) => {
      if (id == adminId) this.adminsIds.splice(index, 1);
    });
  }

  getAdminById(aId: string): Observable<IAdmin> {
    return this.firestore
      .collection('Admins')
      .doc(aId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as IAdmin;
          return data;
        })
      );
  }

  async login(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        this.email = email;

        const uid = userCredential.user?.uid;
        this.rememberMe.pipe(first()).subscribe((isChecked) => {
          console.log(isChecked);
          isChecked
            ? localStorage.setItem('uid', uid)
            : sessionStorage.setItem('uid', uid);
        });

        this.isLoggedSubject.next(true);
      })
      .catch((err) => {
        this.errorMessage = err.code;
        console.log('Service error: ' + this.errorMessage);
      });
  }

  logout() {
    this.firebaseAuth.signOut().catch((err) => {
      console.log('Logout error:' + err);
    });

    localStorage.getItem('uid')
      ? localStorage.removeItem('uid')
      : sessionStorage.removeItem('uid');

    this.isLoggedSubject.next(false);
  }

  get isLogged(): boolean {
    let isLogged: boolean;

    if (localStorage.getItem('uid') || sessionStorage.getItem('uid')) {
      isLogged = true;
    } else {
      isLogged = false;
    }

    return isLogged;
  }

  get getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
