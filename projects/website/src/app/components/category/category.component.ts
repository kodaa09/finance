import { Component, computed, inject, input, output } from '@angular/core';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { CategoryInterface } from '../../types/category.type.js';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../services/category.service.js';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-category',
  imports: [Card, ProgressBar, CommonModule, ButtonModule, UpdateCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  private _categoryService = inject(CategoryService);
  category = input.required<CategoryInterface>();
  deleteCategory = output();
  updateCategory = output();
  remainning = computed(() => this.category().amountMax - this.category().spent);
  percentage = computed(() => (this.category().spent / this.category().amountMax) * 100);

  async onDeleteCategory(id: string) {
    try {
      await this._categoryService.deleteCategory(id);
      this.deleteCategory.emit();
    } catch (error) {
      console.error(error);
    }
  }

  onUpdateCategory() {
    this.updateCategory.emit();
  }
}
