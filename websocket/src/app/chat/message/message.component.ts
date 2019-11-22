import {Component, Inject, Input, OnInit} from '@angular/core';
import {ChattingService, Message, User} from "../../chatting.service";
//import { Links } from './links';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

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
 // private files: File[] = [];
  //links: Links[] = [];
  private content;
  private userSelected: boolean;
  private selectedUser: number;
  private loggedInUser: User;
  @Input() data: { userSelected: boolean; selectedUser: number };


  constructor(private chatService: ChattingService,private sanitizer: DomSanitizer) {
    console.log(this.data);
  }


  ngOnInit() {
    this.loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    this.selectedUser = this.data.selectedUser;
    this.userSelected = this.data.userSelected;
    this.chatService.messageListBehavior.subscribe( (data) => {
      this.messages = data;
    });

    // this.chatService.fileListBehavior.subscribe( (data) => {
    //   this.files = data;
    //   var basestring=this.files.content;
    //   var exten=this.files.ext1;
    //   var name=this.files.fileName1;
    //   console.log(name);
  
    //   console.log("whyyyy");

    //  var binary = atob(basestring.replace(/\s/g, ''));
    //   var len = binary.length;
    //   var buffer = new ArrayBuffer(len);
    //   var view = new Uint8Array(buffer);
    //   for (var i = 0; i < len; i++) {
    //     view[i] = binary.charCodeAt(i);
    //   }
    //   var blob = new Blob([view],{type: exten || 'application/octet-stream'});
    //   console.log(blob.size);
    //   console.log(blob.type);
    //   var download = document.querySelector("a[ download ]");
    //   var downloadUrl = URL.createObjectURL(blob);
    //   console.log(downloadUrl);
    //    this.links.push({ links: this.sanitizer.bypassSecurityTrustUrl(downloadUrl) });
    // } 
      

    // });
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
  //     this.chatService.sendFile(value);
  //     this.chatService.showFiles(this.selectedUser);
  //   } else {
  //     value = {
  //       toId : this.selectedUser,
  //       content: this.message,
  //       fileName1:this.fileName,
  //       ext1:this.ext
  //     };
  //     this.chatService.sendGroupFile(value);
  //     this.chatService.showGroupFiles(this.selectedUser);
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
