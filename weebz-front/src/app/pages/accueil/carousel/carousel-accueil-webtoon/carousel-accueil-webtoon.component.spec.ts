import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAccueilWebtoonComponent } from './carousel-accueil-webtoon.component';

describe('CarouselAccueilWebtoonComponent', () => {
  let component: CarouselAccueilWebtoonComponent;
  let fixture: ComponentFixture<CarouselAccueilWebtoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAccueilWebtoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAccueilWebtoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
