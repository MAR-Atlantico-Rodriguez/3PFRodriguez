import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../core/interfaces/course';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../../core/interfaces/alumno';
import { selectAlumnos } from '../../alumnos/store/alumnos.selectors';


@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrl: './enrollment-dialog.component.scss',
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;
  selected = '';
  students$: Observable<Alumno[]>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingCourse?: Course) {

    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
    });

    this.students$ = this.store.select(selectAlumnos);

  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      this.matDialogRef.close(this.enrollmentForm.value);
    } else {
      /// mostar error
    }
  }
}