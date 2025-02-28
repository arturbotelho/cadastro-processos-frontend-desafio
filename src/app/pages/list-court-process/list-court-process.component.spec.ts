import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourtProcessComponent } from './list-court-process.component';

describe('ListCourtProcessComponent', () => {
  let component: ListCourtProcessComponent;
  let fixture: ComponentFixture<ListCourtProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourtProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCourtProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
