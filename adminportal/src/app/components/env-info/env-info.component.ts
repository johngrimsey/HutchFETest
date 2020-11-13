import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EnvVersionService } from '../../services/env-version.service';
import { merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-env-info',
  templateUrl: './env-info.component.html',
  styleUrls: ['./env-info.component.scss'],
})
export class EnvInfoComponent implements OnInit, OnDestroy {
  env = environment.name;
  apiVersion: number;
  dataVersion: number;

  destroy = new Subject<void>();

  apiVersions = [10, 20];
  dataVersions = [1, 2];

  constructor(private envVersionService: EnvVersionService) {
  }

  ngOnInit(): void {
    const env = this.envVersionService.apiVersionChanges
      .pipe(
        tap(v => this.apiVersion = v),
      );

    const data = this.envVersionService.dataVersionChanges
      .pipe(
        tap(v => this.dataVersion = v),
      );

    merge(env, data)
      .pipe(
        takeUntil(this.destroy)
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onApiVersionChange(val: number) {
    this.envVersionService.setApiVersion(val);
  }

  onDataVersionChange(val: number) {
    this.envVersionService.setDataVersion(val);
  }
}
