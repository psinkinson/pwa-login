import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  initStatus = '';
  updatedStatus = '';
  statuses = [];

  private storageKey = 'app-data';

  ngOnInit() {
    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    console.log('initLocalSt', currentLocalSt);
    this.initStatus = !!currentLocalSt ? currentLocalSt : 'not set';
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');
  }

  setLocalStorage() {
    const dt = new Date();
    const val = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() +
    ' ' + dt.getHours() + ':' + dt.getMinutes() + ' ' + dt.getSeconds();
    window.localStorage.setItem(this.storageKey, val);
    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    this.updatedStatus = !!currentLocalSt ? currentLocalSt : 'not set';
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');
  }

  clearLocalStorage() {
    window.localStorage.removeItem(this.storageKey);
    const currentLocalSt = window.localStorage.getItem(this.storageKey);
    this.statuses.push(!!currentLocalSt ? currentLocalSt : 'not set');
  }

}
