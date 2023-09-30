import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAccueilNewsComponent } from './carousel-accueil-news.component';

describe('CarouselAccueilNewsComponent', () => {
  let component: CarouselAccueilNewsComponent;
  let fixture: ComponentFixture<CarouselAccueilNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAccueilNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAccueilNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
