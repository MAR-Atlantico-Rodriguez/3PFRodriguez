import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONFIG } from '../../core/injection-tokens';
import { Store } from '@ngrx/store';
import { AuthLoginActions } from './store/auth-login.actions';
import { Observable } from 'rxjs';
import { selectIsLoadingAuth, selectUsername } from './store/auth-login.selectors';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {

  loginForm: FormGroup;
  error: any = '';

  isLoading$: Observable<Boolean>;


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store,
    @Inject(APP_CONFIG) private appConfig: any
  ) {

    this.loginForm = this.fb.group({
      email: ['martin@martin.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      role: ['ADMIN', [Validators.required]],
    });


    this.isLoading$ = this.store.select(selectIsLoadingAuth);

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'El formulario no es valido';
    } else {
      let form = this.loginForm.value;
      // this.authService.login(this.loginForm.value?.email, this.loginForm.value?.password);

      this.store.dispatch(AuthLoginActions.loadAuthLogins({ email: form.email, password: form.password }));
    }
  }
}
