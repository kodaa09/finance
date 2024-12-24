import { Component, inject, output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CategoryService } from '../../services/category.service.js';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';
import { CreateCategory } from '../../types/category.type.js';

@Component({
  selector: 'app-add-category',
  imports: [Dialog, ButtonModule, InputTextModule, Select, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  private _categoryService = inject(CategoryService);
  private _authService = inject(AuthService);
  colors = this._categoryService.getColors();
  isVisible = signal(false);
  addCategory = output<boolean>();

  addCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    amountMax: new FormControl('', [Validators.required]),
  });

  async onAddCategory() {
    const userId = this._authService.currentUser()?.uid;
    if (!this.addCategoryForm.valid || !userId) return;

    const category: CreateCategory = {
      userId: userId,
      spent: 0,
      name: this.addCategoryForm.value.name ?? '',
      color: this.addCategoryForm.value.color ?? '',
      amountMax: Number(this.addCategoryForm.value.amountMax) ?? 0,
    };

    try {
      await this._categoryService.addCategory(category);
      this.addCategory.emit(true);
      this.isVisible.set(false);
      this.addCategoryForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  showDialog() {
    this.isVisible.set(true);
  }
}
