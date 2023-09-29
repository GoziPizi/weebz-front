import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightnovelAccueilComponent } from './lightnovel-accueil.component';

describe('LightnovelAccueilComponent', () => {
  let component: LightnovelAccueilComponent;
  let fixture: ComponentFixture<LightnovelAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightnovelAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightnovelAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
