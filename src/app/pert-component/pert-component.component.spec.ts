import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PertComponentComponent } from './pert-component.component';

describe('PertComponentComponent', () => {
  let component: PertComponentComponent;
  let fixture: ComponentFixture<PertComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PertComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
