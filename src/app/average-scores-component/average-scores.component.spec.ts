import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageScoresComponent } from './average-scores.component';

describe('AverageScoresComponent', () => {
  let component: AverageScoresComponent;
  let fixture: ComponentFixture<AverageScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageScoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
