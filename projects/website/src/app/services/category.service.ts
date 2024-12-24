import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { CategoryInterface, CreateCategory } from '../types/category.type.js';
import { AuthService } from './auth.service.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _firestore = inject(Firestore);
  private _authService = inject(AuthService);
  private _categoryCollection = collection(this._firestore, 'categories');
  private _currentUserUid = this._authService.currentUser()?.uid;
  private _userRef = doc(this._firestore, `users/${this._currentUserUid}`);

  getCategories() {
    const categoriesQuery = query(this._categoryCollection, where('userId', '==', this._userRef));
    return collectionData(categoriesQuery, {
      idField: 'id',
    }) as Observable<CategoryInterface[]>;
  }

  async addCategory(payload: CreateCategory) {
    this._checkUserIdType(payload);
    return await addDoc(this._categoryCollection, payload);
  }

  async deleteCategory(id: string) {
    return await deleteDoc(doc(this._firestore, 'categories', id));
  }

  async updateCategory(id: string, payload: Partial<CategoryInterface>) {
    this._checkUserIdType(payload);
    return await updateDoc(doc(this._firestore, 'categories', id), payload);
  }

  _checkUserIdType(payload: Partial<CategoryInterface>) {
    if (typeof payload.userId === 'string') {
      payload.userId = doc(this._firestore, `users/${payload.userId}`);
    }
  }

  getColors() {
    return [
      { name: 'Orange', code: '#fb923c' },
      { name: 'Red', code: '#f87171' },
      { name: 'Amber', code: '#fbbf24' },
      { name: 'Yellow', code: '#facc15' },
      { name: 'Green', code: '#4ade80' },
      { name: 'Emerald', code: '#34d399' },
      { name: 'Teal', code: '#2dd4bf' },
    ];
  }
}
