import { Injectable } from '@angular/core';
import { IAdmin } from 'src/app/ViewModels/iadmin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  listOfAdmins=[
    {
      id:"2",
      FullName:"Raghda Mohsen",
      Email:"Raghda@gmail.com",
      Password:"1234"
    }
  ]
  constructor() { }
  getAllAdmins():IAdmin[]{
    return this.listOfAdmins;
  }
  addAdmin(admin:IAdmin){
    this.listOfAdmins.push(admin);
    // console.log(this.listOfAdmins)
  }
}
