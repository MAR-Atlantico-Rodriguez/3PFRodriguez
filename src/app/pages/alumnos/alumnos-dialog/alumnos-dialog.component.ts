import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../../core/interfaces/alumno';


@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
  styleUrl: './alumnos-dialog.component.scss'
})
export class AlumnosDialogComponent {
  alumnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AlumnosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingAlumno?: Alumno
  ) {
    this.alumnoForm = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      sex: [],
      birthdate: [],
      dni: [null, Validators.required]

    });

    if (this.editingAlumno) {
      this.alumnoForm.patchValue(this.editingAlumno);
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {

      this.matDialogRef.close(this.alumnoForm.value);
    } else {
      /// mostar error
      alert('El formulario no es correcto.');
    }
  }
}