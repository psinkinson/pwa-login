import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  statuses = [];
  ref = '';
  opnr = null;

  private storageKey = 'app-data';

  ngOnInit() {
    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');
    this.ref = document.referrer ? document.referrer : 'no referrer';
    this.opnr = window.opener;
    console.log('ngOnInit - window.opener', window.opener);
    console.log('ngOnInit - document.referrer', document.referrer);
  }

  setLocalStorage() {
    const dt = new Date();
    const val = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() +
    ' ' + dt.getHours() + ':' + dt.getMinutes() + ' ' + dt.getSeconds();
    window.localStorage.setItem(this.storageKey, val);
    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');
  }

  clearLocalStorage() {
    window.localStorage.removeItem(this.storageKey);
    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');
  }

  openLogin() {
    window.open('login.html');
  }

  redirectToLogin() {
    window.location.href = 'https://psinkinson.github.io/redirect-to-referer/';
  }

}
