import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Iuser } from 'src/app/Models/iuser';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DashboardServiceService {
   userCollection!: AngularFirestoreCollection<Iuser>;
  totalUsers:[]|any;
  totalProducts:[]|any;
  totalOrders:[]|any;
  user:[]|any;

  constructor(public UF: AngularFirestore) {
    this.user=this.totalUsers

  }

//   getUsers(){
//     const users= this.UF.collection('users').snapshotChanges();
//     users.subscribe(payload=>{

//         this.totalUsers= payload.length;
//         this.user=this.totalUsers
//         console.log(this.totalUsers);
//         console.log(this.user);

//       })
//       return this.totalUsers
// }

// getProducts(){
//   const users= this.UF.collection('Products').snapshotChanges();
//   users.subscribe(payload=>{

//       this.totalProducts= payload.length;
//       console.log(this.totalProducts);
//     })
// }

// getOrders(){
//   const users= this.UF.collection('Orders').snapshotChanges();
//   users.subscribe(payload=>{

//       this.totalOrders= payload.length;
//       console.log(this.totalOrders);
//     })
// }

}

