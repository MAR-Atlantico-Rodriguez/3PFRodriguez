import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('1-Debe ser creado', () => {
        expect(service).toBeTruthy();
    });

    describe('login', () => {
        it('2-Debería devolver un mensaje de error para credenciales vacías', () => {
            const result = service.login('', '');
            expect(result).toBe('Email o Password Vacios!');
        });

        it('3-Debe autenticar al usuario con credenciales válidas', () => {
            const mockUser: User = {
                id: '43j9',
                email: 'martin@martin.com',
                name: '',
                password: '123456',
                firstName: 'Martin',
                lastName: 'Rodriguez',
                token: 'TOKEN-slkdjflsdkjf102983laje098as-',
                role: 'ADMIN'
            };

            service.login(mockUser.email, mockUser.password);

            const req = httpMock.expectOne(`${environment.apiUrl}/users?email=${mockUser.email}&password=${mockUser.password}`);
            expect(req.request.method).toBe('GET');
            req.flush([mockUser]);

            expect(localStorage.getItem('token')).toBe('TOKEN-slkdjflsdkjf102983laje098as-');
            expect(localStorage.getItem('role')).toBe('ADMIN');
            expect(localStorage.getItem('userName')).toBe('Martin Rodriguez');
        });

        it('4-Debería mostrar alerta para credenciales no válidas', () => {
            spyOn(window, 'alert');

            service.login('wrong@example.com', 'wrongpassword');

            const req = httpMock.expectOne(`${environment.apiUrl}/users?email=wrong@example.com&password=wrongpassword`);
            expect(req.request.method).toBe('GET');
            req.flush([]);

            expect(window.alert).toHaveBeenCalledWith('Credenciales Invalidas');
        });
    });

    describe('logout', () => {
        it('5-Debe borrar localStorage y navegar a la página de inicio de sesión', () => {
            const routerSpy = spyOn(service['router'], 'navigate');

            service.logout();

            expect(localStorage.getItem('token')).toBeNull();
            expect(localStorage.getItem('role')).toBeNull();
            expect(localStorage.getItem('userName')).toBeNull();
            expect(routerSpy).toHaveBeenCalledWith(['authLogin']);
        });
    });

    describe('verifyToken', () => {
        it('6-Debería devolver falso si no hay token en localStorage', (done) => {
            spyOn(localStorage, 'getItem').and.returnValue(null);

            service.verifyToken().subscribe(result => {
                expect(result).toBeFalse();
                done();
            });
        });


    });
});