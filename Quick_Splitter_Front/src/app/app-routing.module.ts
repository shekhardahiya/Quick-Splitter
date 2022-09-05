import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  {
    path: 'transactions/:groupId',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions-details/:transactionId',
    component: TransactionDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
