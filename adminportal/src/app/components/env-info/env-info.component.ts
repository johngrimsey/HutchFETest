import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VersionService } from '../../services/version.service';
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

  constructor(private versionService: VersionService) {
  }

  ngOnInit(): void {
    const env = this.versionService.apiVersionChanges
      .pipe(
        tap(v => this.apiVersion = v),
      );

    const data = this.versionService.dataVersionChanges
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
    this.versionService.setApiVersion(val);
  }

  onDataVersionChange(val: number) {
    this.versionService.setDataVersion(val);
  }
}
