import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChattingService, Group, User} from '../../chatting.service';

@Component({
  selector: 'app-group',
  templateUrl: './inviteUsers.component.html',
})
export class InviteUsersComponent implements OnInit {
  private group: Group;
  private usersList: User[];
  user: any;

  constructor(private dialogRef: MatDialogRef<InviteUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  chatService: ChattingService) {
    this.group = this.data.details;

  }

  ngOnInit(): void {
    this.chatService.getUsersOfGroup(this.group.groupId).subscribe(data => {
      const groupMembers = data;
      this.chatService.userListBehaviour.subscribe((data) => {
        this.usersList = data;
        this.usersList = this.usersList.filter(data => {
          return !groupMembers.includes(data.userId);
        });
      });
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  inviteUser() {

    this.chatService.joinGroup({ groupId: this.group.groupId , groupName: this.group.groupName, userId: this.user, creator: false});
    this.dialogRef.close();
  }
}
