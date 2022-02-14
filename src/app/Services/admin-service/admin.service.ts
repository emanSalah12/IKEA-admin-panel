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
  private adminsCollection: AngularFirestoreCollection<IAdmin>;
  admins: Observable<IAdmin[]>;
  private adminsIds: string[];

  routeURL: string = '';
  errorMessage!: Error | undefined;
  accessToken: string = '';
  rememberMe!: boolean;

  public isLoggedSubject: BehaviorSubject<boolean>;

  email: string = '';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

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
    this.firestore.collection<IAdmin>('Admins').doc(admin.id).set({
      FirstName: admin.FirstName,
      LastName: admin.LastName,
      Email: admin.Email,
    });
  }

  async login(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        this.email = email;

        await userCredential.user?.getIdTokenResult().then((token) => {
          this.accessToken = token.token;

          this.rememberMe
            ? localStorage.setItem('token', this.accessToken)
            : sessionStorage.setItem('token', this.accessToken);
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

    this.rememberMe
      ? localStorage.removeItem('token')
      : sessionStorage.removeItem('token');

    this.isLoggedSubject.next(false);
  }

  get isLogged(): boolean {
    const token = this.rememberMe
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token');

    return token ? true : false;
  }

  get getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
