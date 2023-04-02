import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PertScoreComponent } from './pert-score.component';

describe('PertScoreComponent', () => {
  let component: PertScoreComponent;
  let fixture: ComponentFixture<PertScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PertScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PertScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
