import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilBoutiqueComponent } from './accueil-boutique.component';

describe('AccueilBoutiqueComponent', () => {
  let component: AccueilBoutiqueComponent;
  let fixture: ComponentFixture<AccueilBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilBoutiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
