import { Component, computed, input } from '@angular/core';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { CategoryInterface } from '../../types/category.type.js';
import { CommonModule } from '@angular/common';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category',
  imports: [Card, ProgressBar, CommonModule, Menu, ButtonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  category = input.required<CategoryInterface>();
  remainning = computed(() => this.category().amountMax - this.category().spent);
  percentage = computed(() => (this.category().spent / this.category().amountMax) * 100);
  items = [
    {
      label: 'Update',
      icon: 'pi pi-pencil',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
  ];
}
