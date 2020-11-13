import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  apiVersion = new BehaviorSubject<number>(10);
  dataVersion = new BehaviorSubject<number>(1);

  constructor() {
    this.apiVersion.next(Number(localStorage.getItem('apiVersion') || 10));
    this.dataVersion.next(Number(localStorage.getItem('dataVersion') || 1));
  }

  setApiVersion(version: number) {
    localStorage.setItem('apiVersion', String(version));
    this.apiVersion.next(version);
  }

  setDataVersion(version: number) {
    localStorage.setItem('dataVersion', String(version));
    this.dataVersion.next(version);
  }

  get apiVersionChanges() {
    return this.apiVersion.asObservable();
  }

  get dataVersionChanges() {
    return this.dataVersion.asObservable();
  }
}
