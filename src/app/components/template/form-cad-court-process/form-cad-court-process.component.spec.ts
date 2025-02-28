import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadCourtProcessComponent } from './form-cad-court-process.component';

describe('FormCadCourtProcessComponent', () => {
  let component: FormCadCourtProcessComponent;
  let fixture: ComponentFixture<FormCadCourtProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadCourtProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadCourtProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
