import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheBoutiqueComponent } from './recherche-boutique.component';

describe('RechercheBoutiqueComponent', () => {
  let component: RechercheBoutiqueComponent;
  let fixture: ComponentFixture<RechercheBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheBoutiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
