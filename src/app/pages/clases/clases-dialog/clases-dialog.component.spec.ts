import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesDialogComponent } from './clases-dialog.component';

describe('ClasesDialogComponent', () => {
  let component: ClasesDialogComponent;
  let fixture: ComponentFixture<ClasesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
