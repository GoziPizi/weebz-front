import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAccueilLightnovelComponent } from './carousel-accueil-lightnovel.component';

describe('CarouselAccueilLightnovelComponent', () => {
  let component: CarouselAccueilLightnovelComponent;
  let fixture: ComponentFixture<CarouselAccueilLightnovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAccueilLightnovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAccueilLightnovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
