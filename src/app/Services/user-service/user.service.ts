import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from 'src/app/Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listOfUsers=[{
    Gender:"1",
    Password:"555",
    Email:"ahmed@gmail.com",
    Address:"cairo egypt",
    BirthDate:"13-4-2012",
    FirstName:"Ahmed",
    LastName:"Mohsen",
    PhoneNumber:"01123386649",
    PrefferedStore:"cfc",
    Purshased:[]
  },
  {
    Gender:"2",
    Password:"555",
    Email:"raghda@gmail.com",
    Address:"cairo nasrcity",
    BirthDate:"24-4-1999",
    FirstName:"Raghda",
    LastName:"Mohsen",
    PhoneNumber:"01123386649",
    PrefferedStore:"Mall of arabia",
    Purshased:[]
  },
  {
    Gender:"2",
    Password:"555",
    Email:"noha@gmail.com",
    Address:"cairo waha",
    BirthDate:"11-4-1991",
    FirstName:"Noha",
    LastName:"Mohsen",
    PhoneNumber:"01123386649",
    PrefferedStore:"cfc",
    Purshased:[]
  }
]
  constructor() { }

  getAllUsers():Iuser[]{
    // //get users from firebase
    return this.listOfUsers;
  }
}
