import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  totalProducts:[]|any;
  totalOrders:[]|any;
  totalUsers:[]|any;

  constructor(public UF: AngularFirestore) {}

  getUsers(){
    const users= this.UF.collection('users').snapshotChanges();
    users.subscribe(payload=>{

        this.totalUsers= payload.length;
        console.log(this.totalUsers)
      })
}


getProducts(){
  const products= this.UF.collection('Products').snapshotChanges();
  products.subscribe(payload=>{

      this.totalProducts= payload.length;
      console.log(this.totalProducts)
    })
}


getOrders(){
  const orders= this.UF.collection('Orders').snapshotChanges();
  orders.subscribe(payload=>{

      this.totalOrders= payload.length;
      console.log(this.totalOrders)
    })
}


  ngOnInit(){
   this.getUsers();
   this.getOrders();
   this.getProducts();
  }
}
