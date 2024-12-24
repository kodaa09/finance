import { Component, computed, inject } from '@angular/core';
import { CategoryComponent } from '../../components/category/category.component';
import { AddCategoryComponent } from '../../components/add-category/add-category.component';
import { CategoryService } from '../../services/category.service.js';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CategoryComponent, AddCategoryComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private _categoryService = inject(CategoryService);

  categoriesResource = rxResource({
    loader: () => {
      return this._categoryService.getCategories();
    },
  });
  categories = computed(() => this.categoriesResource.value());

  onUpdateCategories() {
    this._updateCategories();
  }

  _updateCategories() {
    this.categoriesResource.reload();
  }
}
