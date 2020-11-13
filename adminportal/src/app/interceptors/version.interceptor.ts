import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VersionService } from '../services/version.service';

@Injectable({ providedIn: 'root' })
/**
 * Sets HTTP headers to configure API and data version
 * according to what the user has chosen.
 */
export class VersionInterceptor implements HttpInterceptor {

  constructor(private versionService: VersionService) {
  }

  //
  // This should modify only relevant API URLs
  //
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiVersion = this.versionService.apiVersion.getValue();
    const dataVersion = this.versionService.dataVersion.getValue();

    const authReq = req.clone({
      headers: req.headers
        .set('App-Version', String(apiVersion))
        .set('Data-Version', String(dataVersion))
    });

    return next.handle(authReq);
  }
}
