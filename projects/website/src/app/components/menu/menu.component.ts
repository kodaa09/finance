import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service.js';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu',
  imports: [Menubar, RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  items = [
    // {
    //   label: 'Overview',
    //   icon: 'pi pi-home',
    //   route: '/dashboard',
    // },
    {
      label: 'Transactions',
      icon: 'pi pi-arrow-right-arrow-left',
      route: '/transactions',
    },
    {
      label: 'Categories',
      icon: 'pi pi-chart-pie',
      route: '/categories',
    },
    // {
    //   label: 'Goals',
    //   icon: 'pi pi-bullseye',
    //   route: '/goals',
    // },
  ];

  logout() {
    this._authService.logout();
    this._router.navigate(['']);
  }
}
