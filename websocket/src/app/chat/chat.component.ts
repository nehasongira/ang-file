import {
  Component,
  ComponentFactoryResolver, ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ChattingService, Group, User} from '../chatting.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateGroupComponent} from './create group/group.component';
import {InviteUsersComponent} from './inviteUsers/inviteUsers.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageComponent} from "./message/message.component";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {

  @ViewChild('messageComponent',{static: false, read: ViewContainerRef}) messageComponent;
  @ViewChild('messageComponent',{static: false, read: ElementRef}) messageElement;
  private loggedInUser: User;
  private userList: User[];
  private groupList: Group[];
  private selectedUser: number;
  private userSelected = false;
  content: string;
  componentsReferences = [];

  constructor(private chatService: ChattingService,
              private dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private injector:Injector,
              private cfr:ComponentFactoryResolver) {}

  ngOnInit() {
    this.loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    this.chatService.connect(this.loggedInUser);

    this.chatService.groupListBehaviour.subscribe((data) => {
      this.groupList = data;
    });
    this.userList = JSON.parse(window.localStorage.getItem('userList'));
  }

  showMessages(user: User) {
    this.userSelected = true;
    this.selectedUser = user.userId;
    this.chatService.showMessages(this.selectedUser);
    const cmpFactory = this.cfr.resolveComponentFactory(MessageComponent);
    const componentRef = cmpFactory.create(this.injector);
    componentRef.instance.data = {selectedUser : this.selectedUser,userSelected: this.userSelected};
    this.messageComponent.insert(componentRef.hostView);
  }

  showGroupMessages(group: Group) {
    this.userSelected = false;
    this.selectedUser = group.groupId;
    this.chatService.showGroupMessages(this.selectedUser);
    this.remove(0);
    const cmpFactory = this.cfr.resolveComponentFactory(MessageComponent);
    const componentRef = cmpFactory.create(this.injector);
    componentRef.instance.data = {selectedUser : this.selectedUser,userSelected: this.userSelected};
    this.messageComponent.create(componentRef.hostView);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog2(group: Group) {
    const dialogRef = this.dialog.open(InviteUsersComponent, {
      width: '250px',
      data: {details: group}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    console.log("****************");
    window.localStorage.removeItem('initialLogin');
  }

  remove(index: number) {

    if (this.messageComponent.length < 1)
      return;

    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: MessageComponent = <MessageComponent>componentRef.instance;

    let vcrIndex: number = this.messageComponent.indexOf(componentRef)

    // removing component from container
    this.messageComponent.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }
}


