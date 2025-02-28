import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCourtProcessComponent } from './cad-court-process.component';

describe('CadCourtProcessComponent', () => {
  let component: CadCourtProcessComponent;
  let fixture: ComponentFixture<CadCourtProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadCourtProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadCourtProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
