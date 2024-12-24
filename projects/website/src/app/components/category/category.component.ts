import { Component, computed, inject, input, output } from '@angular/core';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { CategoryInterface } from '../../types/category.type.js';
import { CommonModule } from '@angular/common';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../services/category.service.js';

@Component({
  selector: 'app-category',
  imports: [Card, ProgressBar, CommonModule, Menu, ButtonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  private _categoryService = inject(CategoryService);
  category = input.required<CategoryInterface>();
  deleteCategory = output();
  remainning = computed(() => this.category().amountMax - this.category().spent);
  percentage = computed(() => (this.category().spent / this.category().amountMax) * 100);
  items = [
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Update');
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        this.onDeleteCategory(this.category().id);
      },
    },
  ];

  async onDeleteCategory(id: string) {
    try {
      await this._categoryService.deleteCategory(id);
      this.deleteCategory.emit();
    } catch (error) {
      console.error(error);
    }
  }
}
