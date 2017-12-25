import {Component, OnInit} from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

    title = 'Welcome';
    users: User[];
    selectedUser: User;

    constructor(private userService: UserService){}

    ngOnInit() {
        this.getUsers();
    }

    getUser(id: number){
        this.userService.getUser(id).subscribe(user => this.selectedUser = user);
    }

    getUsers(){
        this.userService.getUsers().subscribe(users => this.users = users);
    }
}
