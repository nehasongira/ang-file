import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {MessageComponent} from "./chat/message/message.component";

const  routes: Routes = [
  {path: 'loggedIn', component : ChatComponent,children: [
      {path : 'messages/:id',component :MessageComponent}
    ]},
  {path: 'login', component: LoginComponent},
  // {path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

