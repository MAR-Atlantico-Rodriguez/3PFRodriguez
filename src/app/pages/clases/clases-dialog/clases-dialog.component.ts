import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clase } from '../../../core/interfaces/clases';
import { Course } from '../../../core/interfaces/course';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-clases-dialog',
  templateUrl: './clases-dialog.component.html',
  styleUrl: './clases-dialog.component.scss'
})
export class ClasesDialogComponent implements OnInit {
  claseForm: FormGroup;
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private matDialogRef: MatDialogRef<ClasesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingClase?: Clase
  ) {
    this.claseForm = this.fb.group({
      title: [null, Validators.required],
      cursoId: [null, Validators.required],
      date: []
    });

    if (this.editingClase) {
      this.claseForm.patchValue(this.editingClase);
    }
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    })
  }

  onSubmit(): void {
    if (this.claseForm.valid) {
      this.matDialogRef.close(this.claseForm.value);
    } else {
      /// mostar error
    }
  }
}
