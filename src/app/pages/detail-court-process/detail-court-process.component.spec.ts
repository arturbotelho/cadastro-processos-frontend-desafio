import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCourtProcessComponent } from './detail-court-process.component';

describe('DetailCourtProcessComponent', () => {
  let component: DetailCourtProcessComponent;
  let fixture: ComponentFixture<DetailCourtProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCourtProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCourtProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
