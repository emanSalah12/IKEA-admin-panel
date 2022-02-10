import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/Models/iuser';
import { UserService } from 'src/app/Services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listOfUsers : Iuser[]
  constructor(private userService:UserService) {
    this.listOfUsers=this.userService.getAllUsers();
   }

  ngOnInit(): void {
    
  }

}
