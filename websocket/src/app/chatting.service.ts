import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  departmentId: number;
  profilePic: string;
  teamId: number;
}

// export interface File {
    
//   fromId: number;
//   toId: number;
//   content:string;
//   ext1: string;
//   fileName1:string;
//  }


export interface Message {
 conversationId: number;
 fromId: number;
 toId: number;
 dateTime: Date;
 content: string;
}

export interface Group {
  groupId: number;
  groupName: string;
  userId: number;
  creator: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  webSocketEndpoint = 'http://localhost:8080/socket';
  stompClient: any;
  userList: User[];
  userListBehaviour: BehaviorSubject<any>;
  messageList: Message[] = [];
 // fileList: File[] = [];

  messageListBehavior: BehaviorSubject<any>;
  groupList: Group[] = [];
  groupListBehaviour: BehaviorSubject<any>;
 // fileListBehavior: BehaviorSubject<any>;
  private fromId: number;

  constructor(private http: HttpClient) {
    this.userListBehaviour = new BehaviorSubject<any>(this.userList);
    this.messageListBehavior = new BehaviorSubject<any>(this.messageList);
    this.groupListBehaviour = new BehaviorSubject<any>(this.groupList);
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/usersList');
  }

  connect(user: User) {
    this.fromId = user.userId;
    const topic = '/message/' + user.userId;
    console.log('connecting ...');
    const ws = new SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);
    // tslint:disable-next-line:variable-name
    const _this = this;

      this.userListBehaviour.subscribe(data => this.userList = data);

    _this.stompClient.connect({}, (frame) => {

        _this.stompClient.send('/app/login', {} , JSON.stringify(user));

        _this.stompClient.subscribe(topic, (data) => {
            this.messageList = this.messageList.concat(JSON.parse(data.body));
            this.messageListBehavior.next(this.messageList);
        });

        _this.stompClient.subscribe('/message/groupList/' + user.userId, (data) => {
            this.groupList = (JSON.parse(data.body));
            this.groupListBehaviour.next(this.groupList);
        });
    }, this.errorCallBack);

  }

  errorCallBack(error, user: User) {
    console.log('error callBack' + error);
    setTimeout(() => {
      this.connect(user);
    }, 5000);
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('disconnected');
  }

  sendMessage(value: any) {
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId : this.fromId,
      content : value.content,
      dateTime : new Date(),
      toId : value.toId
    };
    this.messageList.push(message);
    this.messageListBehavior.next(this.messageList);
    this.stompClient.send('/app/chat.sendMessage/' + this.fromId + '/' + value.toId, {}, JSON.stringify(message));
  }

  // sendFile(value: any) {
  //   const file: File = {
      
  //     fromId : this.fromId,
  //     toId : value.toId,
  //     content : value.content,
  //     ext1:value.ext1,
  //     fileName1:value.fileName1
  //   }
  //   this.fileList.push(file);
  //   this.fileListBehavior.next(this.fileList);
  //   this.stompClient.send('/app/chat.sendMessage/' + this.fromId + '/' + value.toId, {}, JSON.stringify(file));
  // }

  createGroup(groupName: string) {
    const group: Group = {
      groupName,
      groupId: Math.floor(Math.random() * 100) + 1,
      userId: this.fromId,
      creator: true
    };
    this.stompClient.send('/app/chat.newGroup', {}, JSON.stringify(group));
  }

  joinGroup(group: Group) {
    this.stompClient.send('/app/chat.newGroup', {}, JSON.stringify(group));
  }


  sendGroupMessage(value: any) {
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId : this.fromId,
      content : value.content,
      dateTime : new Date(),
      toId : value.toId
    };
    this.messageList.push(message);
    this.messageListBehavior.next(this.messageList);
    this.stompClient.send('/app/chat.groupMessage/' + value.toId, {}, JSON.stringify(message));
  }

  // sendGroupFile(value: any) {
  //   const file: File = {
      
  //     fromId : this.fromId,
  //     toId : value.toId,
  //     content : value.content,
  //     ext1:value.ext1,
  //     fileName1:value.fileName1
  //   }
  //   this.fileList.push(file);
  //   this.fileListBehavior.next(this.fileList);
  //   this.stompClient.send('/app/chat.groupMessage/'  + value.toId, {}, JSON.stringify(file));
  // }

  showMessages(id: number) {
    this.messageListBehavior.next(this.messageList.filter((data: Message) => {
      if ((data.toId === id && data.fromId === this.fromId) ||
          (data.toId === this.fromId && data.fromId === id)) {
        return true;
      }
    }));
  }

  showGroupMessages(id: number) {
    this.messageListBehavior.next(this.messageList.filter( (data: Message) => {
      if (data.toId === id ) { return true; }
    }));
  }

  getUsersOfGroup(groupId: number): Observable<number[]> {
     return  this.http.get<number[]>('http://localhost:8080/usersList/' +  groupId);
  }
}
