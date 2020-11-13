import { Injectable } from '@angular/core';
import { PortalSync } from '../interfaces/responses/PortalSync';
import { MockPortalSync } from '../mockdata/PortalSync';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PortalSyncService extends ApiService {
  /**
   * Request will be signed with JWT via AuthInterceptor.
   * API and data versions are set via VersionInterceptor.
   */
  getData(): Observable<PortalSync> {
    return this.fetch(MockPortalSync);
  }
}
