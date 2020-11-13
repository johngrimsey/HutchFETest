import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthenticatedGuard } from './guards/authenticated-guard.service';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent, data: { action: 'logout' } },
  { path: 'user', component: UserComponent, canActivate: [AuthenticatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
