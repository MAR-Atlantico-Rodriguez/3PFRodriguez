import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';
import { provideHttpClient } from '@angular/common/http';


describe('AuthService', () => {
    let service: AuthService;
    let router: Router;

    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [MockProvider(Router),
            provideHttpClient(),
            provideHttpClientTesting()
            ],
        });
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('Al ingresar incorrectamente el usuario y la clave en Login debe mostrar un error "alert(Credenciales Invalidas)"', () => {

        service.login('martin@martin.', '12345');

        // httpController.expectOne({
        //     url: environment.apiUrl + '/users',
        //     method: 'GET',
        // }).flush();
        expect("alert('Credenciales Invalidas')").toHaveBeenCalledBefore(alert)
    });



});