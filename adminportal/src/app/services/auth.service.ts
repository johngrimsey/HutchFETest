import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authed = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  restoreAuthState() {
    const authed = localStorage.getItem('jwt');

    if (authed) {
      this.authed.next(true);
    }
  }

  get authChanges() {
    return this.authed.asObservable();
  }

  get snapshot() {
    return {
      authed: this.authed.getValue()
    }
  }

  /**
   * Simulate storing a granted JWT
   */
  login() {
    localStorage.setItem('jwt', 'fake-token-value');
    this.authed.next(true);
  }

  /**
   * Remove fake JWT, simulating clearing user's authentication
   */
  logout() {
    localStorage.removeItem('jwt');
    this.authed.next(false);
  }
}
