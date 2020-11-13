import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  authed: Observable<boolean>;
  destroy = new Subject<void>();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.restoreAuthState();
    this.authed = this.authService.authChanges;
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
