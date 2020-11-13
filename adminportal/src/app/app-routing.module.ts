import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthenticatedGuard } from './guards/authenticated-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticatedGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthenticatedGuard] },

  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent, data: { action: 'logout' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
