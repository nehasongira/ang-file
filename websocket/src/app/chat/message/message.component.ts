import {Component, Inject, Input, OnInit} from '@angular/core';
import {ChattingService, Message, User} from "../../chatting.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  //  private message: string;
  // private name: string;
  // private ext: string;
  // private fileName:string;
 
  private messages: Message[] = [];
  private content;
  private userSelected: boolean;
  private selectedUser: number;
  private loggedInUser: User;
  @Input() data: { userSelected: boolean; selectedUser: number };


  constructor(private chatService: ChattingService) {
    console.log(this.data);
  }


  ngOnInit() {
    this.loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    this.selectedUser = this.data.selectedUser;
    this.userSelected = this.data.userSelected;
    this.chatService.messageListBehavior.subscribe( (data) => {
      this.messages = data;
    });
  }
  
  // handleFileSelect(evt) {

  //   var f = evt.target.files[0];
  //   this.ext=evt.target.files[0].type;
  //   this.fileName = evt.target.files[0].name;
  //   var reader = new FileReader();
  //   let self = this;
  //   reader.onload = (function (theFile) {
  //     let me = self;
  //     return function (e) {
  //       var binaryData = e.target.result;
  //       var base64string = window.btoa(binaryData);
  //       me.message = base64string;
  //     }
  //   })(f);
  //   reader.readAsBinaryString(f);
  // }


  
  // sendFile() {
  //   let value = {};
  //   if (this.userSelected) {
  //     value = {
  //       toId : this.selectedUser,
  //       content: this.message,
  //       fileName1:this.fileName,
  //       ext1:this.ext
  //     };
  //     this.chatService.sendMessage(value);
  //     this.chatService.showMessages(this.selectedUser);
  //   } else {
  //     value = {
  //       toId : this.selectedUser,
  //       content: this.message,
  //       fileName1:this.fileName,
  //       ext1:this.ext
  //     };
  //     this.chatService.sendGroupMessage(value);
  //     this.chatService.showGroupMessages(this.selectedUser);
  //   }
  // }

  sendMessage() {
    let value = {};
    if (this.userSelected) {
      value = {
        toId : this.selectedUser,
        content: this.content
      };
      this.chatService.sendMessage(value);
      this.chatService.showMessages(this.selectedUser);
    } else {
      value = {
        toId : this.selectedUser,
        content: this.content
      };
      this.chatService.sendGroupMessage(value);
      this.chatService.showGroupMessages(this.selectedUser);
    }
  }

}
