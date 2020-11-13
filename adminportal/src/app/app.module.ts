import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { EnvInfoComponent } from './components/env-info/env-info.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { VersionInterceptor } from './interceptors/version.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AuthComponent,
    DashboardComponent,
    EnvInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    FlexModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: VersionInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
