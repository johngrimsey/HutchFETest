import { Injectable } from '@angular/core';
import { StaticData } from '../interfaces/responses/StaticData';
import { MockStaticData } from '../mockdata/StaticData';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService extends ApiService {
  /**
   * Request will be signed with JWT via AuthInterceptor.
   * API and data versions are set via VersionInterceptor.
   */
  getData(): Observable<StaticData> {
    return this.fetch(MockStaticData);
  }
}
