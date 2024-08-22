import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
// import { AuthMockService } from '../../core/services/auth-mock.service';
import { APP_CONFIG } from '../../core/injection-tokens';
import { AuthLoginComponent } from './auth-login.component';
import { AuthLoginRoutingModule } from './auth-login-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthLoginEffects } from './store/auth-login.effects';

import { StoreModule } from '@ngrx/store';
import { authLoginFeature } from './store/auth-login.reducer';
import { MaterialModule } from '../../core/utils/material.module';

@NgModule({
  declarations: [AuthLoginComponent],
  exports: [AuthLoginComponent],
  imports: [
    CommonModule,
    AuthLoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthLoginEffects]),
    StoreModule.forFeature(authLoginFeature)
  ],
  providers: [
    AuthService,
    // {
    //   provide: AuthService,
    //   useClass: AuthService,
    // },

    {
      provide: APP_CONFIG,
      useValue: {
        baseURL: '...',
        version: '2.0',
      },
    },
  ],
})
export class AuthLoginModule { }