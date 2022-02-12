import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from 'src/app/Models/iuser';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // listOfUsers = [
  //   {
  //     id: '1',
  //     Gender: '1',
  //     Password: '555',
  //     Email: 'ahmed@gmail.com',
  //     Address: 'cairo egypt',
  //     BirthDate: '13-4-2012',
  //     FirstName: 'Ahmed',
  //     LastName: 'Mohsen',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  //   {
  //     id: '2',
  //     Gender: '2',
  //     Password: '555',
  //     Email: 'raghda@gmail.com',
  //     Address: 'cairo nasrcity',
  //     BirthDate: '24-4-1999',
  //     FirstName: 'Raghda',
  //     LastName: 'Mohsen',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'Mall of arabia',
  //     Purshased: [],
  //   },
  //   {
  //     id: '3',
  //     Gender: '2',
  //     Password: '555',
  //     Email: 'noha@gmail.com',
  //     Address: 'cairo waha',
  //     BirthDate: '11-4-1991',
  //     FirstName: 'Noha',
  //     LastName: 'Mohsen',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  //   {
  //     id: '4',
  //     Gender: '2',
  //     Password: '555',
  //     Email: 'noha@gmail.com',
  //     Address: 'cairo waha',
  //     BirthDate: '11-4-1991',
  //     FirstName: 'Noha',
  //     LastName: 'hussien',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  //   {
  //     id: '5',
  //     Gender: '2',
  //     Password: '555',
  //     Email: 'aya@gmail.com',
  //     Address: 'cairo waha',
  //     BirthDate: '11-4-1991',
  //     FirstName: 'aya',
  //     LastName: 'shafea',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  //   {
  //     id: '6',
  //     Gender: '1',
  //     Password: '555',
  //     Email: 'ahmed@gmail.com',
  //     Address: 'cairo waha',
  //     BirthDate: '11-4-1991',
  //     FirstName: 'ahmed',
  //     LastName: 'salem',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  //   {
  //     id: '7',
  //     Gender: '1',
  //     Password: '555',
  //     Email: 'm7md@gmail.com',
  //     Address: 'cairo waha',
  //     BirthDate: '11-4-1991',
  //     FirstName: 'mohamed',
  //     LastName: 'ahmed',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  //   {
  //     id: '8',
  //     Gender: '2',
  //     Password: '555',
  //     Email: 'hala@gmail.com',
  //     Address: 'cairo waha',
  //     BirthDate: '11-4-1991',
  //     FirstName: 'hala',
  //     LastName: 'samy',
  //     PhoneNumber: '01123386649',
  //     PrefferedStore: 'cfc',
  //     Purshased: [],
  //   },
  // ];

  listOfUsers: Observable<Iuser[]>;
  // matchingUsers: Observable<Iuser[]>;
  private usersCollection: AngularFirestoreCollection<Iuser>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = firestore.collection<Iuser>('users');
    this.listOfUsers = this.usersCollection.valueChanges();
  }

  get getAllUsers(): Observable<Iuser[]> {
    return this.listOfUsers;
  }

  getMatchingUsers(searchText: string): Iuser[] {
    var matchingusers = [] as Iuser[];
    this.listOfUsers.subscribe((users) => {
      users.find((user) => {
        var fullname = `${user.FirstName} ${user.LastName}`.toLocaleLowerCase();
        if (fullname.includes(searchText.toLocaleLowerCase())) {
          matchingusers.push(user);
        }
      });
    });
    return matchingusers;
  }
}
