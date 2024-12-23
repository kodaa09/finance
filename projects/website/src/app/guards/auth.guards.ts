import { CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, first, map, of } from 'rxjs';
import { UserInterface } from '../types/user.type.js';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  canActivate() {
    return this._authService.user$.pipe(
      first(),
      map((user: UserInterface | null) => {
        if (user) {
          this._authService.currentUser.set({
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName,
          });
          return true;
        } else {
          this._authService.currentUser.set(null);
          this._router.navigate(['']);
          return false;
        }
      }),
      catchError(() => {
        this._authService.currentUser.set(null);
        this._router.navigate(['']);
        return of(false);
      })
    );
  }
}
