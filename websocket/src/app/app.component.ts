import {Component, OnInit, OnDestroy, NgZone, Output} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ChattingService, User} from './chatting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    window.localStorage.clear();
  }
}
