import { AuthService } from '../services/auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //
    // Sign outgoing request
    //
    const jwt = this.authService.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', jwt)
    });

    //
    // Check response is not 'JWT expired'
    //
    return next.handle(authReq)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            // If unauthorized due to invalid / expires JWT
            if (event.status === 401) {
              this.router.navigate(['/login']);
            }
          }
        })
      );
  }
}
