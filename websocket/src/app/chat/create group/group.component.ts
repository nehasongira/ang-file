import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChattingService} from '../../chatting.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
})
export class CreateGroupComponent {
  groupName: string;

  constructor(private dialogRef: MatDialogRef<CreateGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  chatService: ChattingService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  createGroup() {
    this.chatService.createGroup(this.groupName);
    this.dialogRef.close();
  }
}
