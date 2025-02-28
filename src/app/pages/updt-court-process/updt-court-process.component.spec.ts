import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtCourtProcessComponent } from './updt-court-process.component';

describe('UpdtCourtProcessComponent', () => {
  let component: UpdtCourtProcessComponent;
  let fixture: ComponentFixture<UpdtCourtProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdtCourtProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdtCourtProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
