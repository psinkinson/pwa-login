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
  parentWindow = null;
  welcomeBack = false;


  private storageKey = 'app-data';

  ngOnInit() {

    this.ref = document.referrer ? document.referrer : 'no referrer';
    const parentWindow = window.opener ? window.opener.window : null;
    console.log('ngOnInit - parentWindow', parentWindow);
    console.log('ngOnInit - document.referrer', document.referrer);

    const loc = window.location;
    const parentLoc = parentWindow ? parentWindow.location : null;

    if (parentLoc && parentLoc && loc.host === parentLoc.host
      && loc.protocol === parentLoc.protocol && loc.port === parentLoc.port) {
      console.log('ngOnInit - opener is same origin');
      this.parentWindow = parentWindow;
      return;
    }

    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');

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
    window.addEventListener('message',  this.updateFromChild);
    // window.open('https://psinkinson.github.io/redirect-to-referer/');
    window.open('https://output.jsbin.com/supuqeg');
  }

  redirectToLogin() {
    window.addEventListener('message',  this.updateFromChild);
    window.location.href = 'https://psinkinson.github.io/redirect-to-referer/';
  }

  updateFromChild(e) {
    console.log('ngOnInit - updateFromChild', e.origin, this);
    window.location.href = window.location.href + '?logincomplete=1';
  }

  backToParent() {
    // this.parentWindow.
    window.opener.postMessage({}, window.location.origin);
    window.close();
  }

}
