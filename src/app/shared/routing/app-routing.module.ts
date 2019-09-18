import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";
import { BoardsComponent } from '../../data-component/boards/boards.component';
import { BoardsDetailComponent } from '../../data-component/boards-detail/boards-detail.component';
import { BoardsCreateComponent } from '../../data-component/boards-create/boards-create.component';
import { BoardsEditComponent } from '../../data-component/boards-edit/boards-edit.component';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'boards', component: BoardsComponent, data: { title: 'Boards List' }, canActivate: [AuthGuard]},
  { path: 'boards-details/:id', component: BoardsDetailComponent, data: { title: 'Boards Details' }},
  { path: 'boards-create', component: BoardsCreateComponent, data: { title: 'Create Boards' }},
  { path: 'boards-edit/:id', component: BoardsEditComponent, data: { title: 'Edit Boards' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }