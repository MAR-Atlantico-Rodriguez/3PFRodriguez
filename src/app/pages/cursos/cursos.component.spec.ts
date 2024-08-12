import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosComponent } from './cursos.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../core/services/courses.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../core/interfaces/course';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

describe('CursosComponent', () => {
    let component: CursosComponent;
    let fixture: ComponentFixture<CursosComponent>;
    let mockMatDialog: jasmine.SpyObj<MatDialog>;
    let mockCoursesService: jasmine.SpyObj<CoursesService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
        mockCoursesService = jasmine.createSpyObj('CoursesService', ['getCourses', 'addCourse', 'editCourseById', 'deleteCourseById']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [CursosComponent],
            imports: [NoopAnimationsModule, MatTableModule],
            providers: [
                { provide: MatDialog, useValue: mockMatDialog },
                { provide: CoursesService, useValue: mockCoursesService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CursosComponent);
        component = fixture.componentInstance;
    });

    it('1-Debería crear', () => {
        expect(component).toBeTruthy();
    });

    it('2-Debería cargar cursos en ngOnInit', () => {
        const mockCourses: Course[] = [{
            "name": "Angular y PHP",
            "startDate": new Date(),
            "endDate": new Date(),
            "id": "2"
        }];
        mockCoursesService.getCourses.and.returnValue(of(mockCourses));

        component.ngOnInit();

        expect(component.dataSource).toEqual(mockCourses);
        expect(component.isLoading).toBeFalse();
    });



    it('3-Debería navegar a clases en viewClases', () => {
        component.viewClases('1');

        expect(mockRouter.navigate).toHaveBeenCalledWith(['clases', '1']);
    });



    it('4-Debería eliminar el curso cuando se confirme', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        mockCoursesService.deleteCourseById.and.returnValue(of());
        mockCoursesService.getCourses.and.returnValue(of([]));

        component.deleteCourseById('1');

        expect(mockCoursesService.deleteCourseById).toHaveBeenCalledWith('1');
        expect(component.isLoading).toBeFalse();
    });

    it('5-No debe eliminar el curso cuando no está confirmado.', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.deleteCourseById('1');
        expect(mockCoursesService.deleteCourseById).not.toHaveBeenCalled();
    });
});