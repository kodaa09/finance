import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, query, where } from '@angular/fire/firestore';
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
    return await addDoc(this._categoryCollection, payload);
  }

  getColors() {
    return ['white', 'red', 'purple', 'black', 'yellow', 'blue', 'green', 'brown', 'orange', 'pink'];
  }
}
