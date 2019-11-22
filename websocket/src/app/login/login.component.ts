import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChattingService, User} from '../chatting.service';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedInUser: User;
  private userList: User[];

  constructor(private chatService: ChattingService, private router: Router) {}


  ngOnInit(): void {
    this.chatService.getUserList().subscribe( (data) => {
      this.userList = data;
      this.chatService.userListBehaviour.next(this.userList);
    });
  }

  login(value: any) {
    this.loggedInUser = this.userList.filter((data: User) => data.firstName === value.userName)[0];
    // this.chatService.connect(this.loggedInUser);
    window.localStorage.setItem('loggedInUser',JSON.stringify(this.loggedInUser));
    window.localStorage.setItem('userList',JSON.stringify(this.userList));
    this.router.navigate(['/loggedIn']);
  }
}
