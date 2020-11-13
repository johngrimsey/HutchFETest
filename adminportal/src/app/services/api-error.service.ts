import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HutchApiError } from '../interfaces/responses/api-error';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  private error = new BehaviorSubject<HutchApiError>(null);

  constructor() {
  }

  setError(err: HutchApiError) {
    this.error.next(err);
  }

  get errorChanges() {
    return this.error.asObservable();
  }

  clear() {
    this.error.next(null);
  }
}
