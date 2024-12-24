import { Component, inject, input, output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CategoryService } from '../../services/category.service.js';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { CategoryInterface, CreateCategory } from '../../types/category.type.js';

@Component({
  selector: 'app-update-category',
  imports: [Dialog, ButtonModule, InputTextModule, Select, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent {
  private _categoryService = inject(CategoryService);
  private _authService = inject(AuthService);
  category = input<CategoryInterface>();
  updateCategory = output<boolean>();
  colors = this._categoryService.getColors();
  isVisible = signal(false);

  updateCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    amountMax: new FormControl(0, [Validators.required]),
  });

  ngOnInit() {
    this.updateCategoryForm.patchValue({
      name: this.category()?.name,
      color: this.category()?.color,
      amountMax: Number(this.category()?.amountMax),
    });
  }

  async onUpdateCategory() {
    const userId = this._authService.currentUser()?.uid;
    const id = this.category()?.id;
    if (!this.updateCategoryForm.valid || !userId || !id) return;

    const category: CreateCategory = {
      userId: userId,
      spent: 0,
      name: this.updateCategoryForm.value.name ?? '',
      color: this.updateCategoryForm.value.color ?? '',
      amountMax: Number(this.updateCategoryForm.value.amountMax) ?? 0,
    };

    try {
      await this._categoryService.updateCategory(id, category);
      this.updateCategory.emit(true);
      this.isVisible.set(false);
    } catch (error) {
      console.log(error);
    }
  }

  showDialog() {
    this.isVisible.set(true);
  }
}
