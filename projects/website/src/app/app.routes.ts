import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';
import { DashboardComponent } from './pages/dashboard/dashboard.component.js';
import { TransactionsComponent } from './pages/transactions/transactions.component.js';
import { CategoriesComponent } from './pages/categories/categories.component.js';
import { GoalsComponent } from './pages/goals/goals.component.js';
import { AuthGuard } from './guards/auth.guards.js';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'goals',
    component: GoalsComponent,
    canActivate: [AuthGuard],
  },
];
