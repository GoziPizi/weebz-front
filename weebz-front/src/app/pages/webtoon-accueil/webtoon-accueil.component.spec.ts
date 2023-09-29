import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebtoonAccueilComponent } from './webtoon-accueil.component';

describe('WebtoonAccueilComponent', () => {
  let component: WebtoonAccueilComponent;
  let fixture: ComponentFixture<WebtoonAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebtoonAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebtoonAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
