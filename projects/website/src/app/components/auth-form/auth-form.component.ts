import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service.js';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  imports: [Card, InputTextModule, PasswordModule, ButtonModule, ReactiveFormsModule, IconField, InputIcon, TitleCasePipe],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  styleClass = signal('pi pi-eye');
  inputType = signal('password');
  isLoginForm = signal(true);
  errorMessage = signal('');
  authForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor() {
    effect(() => {
      this._addValidators();
    });
  }

  ngOnInit() {
    this._addValidators();
  }

  async onSubmit() {
    const email = this.authForm.value.email ?? '';
    const password = this.authForm.value.password ?? '';
    const fullName = this.authForm.value.fullName ?? '';

    if (this.isLoginForm()) {
      try {
        const response = await this._authService.login(email, password);
        if (response.user) this._router.navigate(['/dashboard']);
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.errorMessage.set(this._formatErrorMessage(error.message));
        } else {
          this.errorMessage.set('An unknown error occurred');
        }
      }
    } else {
      try {
        await this._authService.register(email, password, fullName);
        this.onChangeForm();
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage.set(this._formatErrorMessage(error.message));
        } else {
          this.errorMessage.set('An unknown error occurred');
        }
      }
    }
  }

  onChangeForm() {
    this.authForm.reset();
    this.isLoginForm.update((oldValue) => !oldValue);
  }

  _formatErrorMessage(message: string): string {
    return message.split('(')[1].split('/')[1].replaceAll('-', ' ').slice(0, -1).slice(0, -1);
  }

  onTogglePassword() {
    if (this.inputType() === 'password') {
      this.styleClass.set('pi pi-eye-slash');
      this.inputType.set('text');
    } else {
      this.styleClass.set('pi pi-eye');
      this.inputType.set('password');
    }
  }

  private _addValidators() {
    const fullNameControl = this.authForm.get('fullName');

    if (!this.isLoginForm()) fullNameControl!.setValidators([Validators.required]);
    else fullNameControl!.clearValidators();

    fullNameControl!.updateValueAndValidity();
  }
}
