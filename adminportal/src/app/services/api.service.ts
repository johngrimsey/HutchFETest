import { Injectable } from '@angular/core';
import { ApiErrorService } from './api-error.service';
import { of } from 'rxjs';
import { HutchApiError } from '../interfaces/responses/api-error';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private errorService: ApiErrorService) {

  }

  /**
   * Handle API errors here and delegate to ApiErrorService
   */
  protected fetch(data: any) {
    return of(data).pipe(
      catchError((err: HutchApiError) => {
        //
        // Logic here to handle specific error code
        // and modify any server message if needed.
        //
        this.errorService.setError(err);
        return data;
      })
    );
  }
}
