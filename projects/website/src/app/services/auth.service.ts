import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { UserInterface } from '../types/user.type.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebase = inject(Auth);
  user$ = user(this.firebase);
  currentUser = signal<UserInterface | null | undefined>(undefined);

  async register(email: string, password: string, username: string) {
    const register = await createUserWithEmailAndPassword(this.firebase, email, password);
    await updateProfile(register.user, { displayName: username });
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebase, email, password);
  }

  async logout() {
    return signOut(this.firebase);
  }
}
