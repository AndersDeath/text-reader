import { PressPageComponent } from './pages/press-page/press-page.component';
import { LinksPageComponent } from './pages/links-page/links-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ViewerPageComponent } from './pages/viewer-page/viewer-page.component';
import { TextEditPageComponent } from './pages/text-edit-page/text-edit-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { EntryPageComponent } from './pages/entry-page/entry-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', component: EntryPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: 'press', component: PressPageComponent, canActivate: [AuthGuard] },
  { path: 'links', component: LinksPageComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: TextEditPageComponent, canActivate: [AuthGuard] },
  { path: 'text/:id', component: ViewerPageComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent },
  { path: 'registration', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
