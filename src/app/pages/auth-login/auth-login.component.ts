import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONFIG } from '../../core/injection-tokens';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {

  loginForm: FormGroup;
  error: any = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(APP_CONFIG) private appConfig: any
  ) {

    this.loginForm = this.fb.group({
      email: ['martin@martin.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      role: ['ADMIN', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'El formulario no es valido';
    } else {
      this.authService.login(this.loginForm.value?.email, this.loginForm.value?.password);
    }
  }
}
