import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  imports: [Menubar, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  items = [
    {
      label: 'Overview',
      icon: 'pi pi-home',
      route: '/dashboard',
    },
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
    {
      label: 'Goals',
      icon: 'pi pi-bullseye',
      route: '/goals',
    },
  ];
}
