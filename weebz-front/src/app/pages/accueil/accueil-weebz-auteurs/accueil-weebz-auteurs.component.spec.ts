import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilWeebzAuteursComponent } from './accueil-weebz-auteurs.component';

describe('AccueilWeebzAuteursComponent', () => {
  let component: AccueilWeebzAuteursComponent;
  let fixture: ComponentFixture<AccueilWeebzAuteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilWeebzAuteursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilWeebzAuteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
