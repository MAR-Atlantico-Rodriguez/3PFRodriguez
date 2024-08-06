import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AuthLoginComponent } from './auth-login.component';
import { APP_CONFIG } from '../../core/injection-tokens';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLoginRoutingModule } from './auth-login-routing.module';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLoginComponent],
      imports: [
        AuthLoginRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      providers: [{
        provide: APP_CONFIG,
        useValue: {
          baseURL: '...',
          version: '2.0',
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("El campo Email debe ser requerido", () => {
    const emailControl = component.loginForm.get('email')?.setValue('');

    expect(emailControl).toBeTrue();
  });
});
