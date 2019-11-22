import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {CreateGroupComponent} from './chat/create group/group.component';
import {InviteUsersComponent} from './chat/inviteUsers/inviteUsers.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { MessageComponent } from './chat/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateGroupComponent,
    InviteUsersComponent,
    LoginComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateGroupComponent, InviteUsersComponent,MessageComponent]
})
export class AppModule { }
