import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemAccueilComponent } from './carousel-item-accueil.component';

describe('CarouselItemAccueilComponent', () => {
  let component: CarouselItemAccueilComponent;
  let fixture: ComponentFixture<CarouselItemAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselItemAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselItemAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
