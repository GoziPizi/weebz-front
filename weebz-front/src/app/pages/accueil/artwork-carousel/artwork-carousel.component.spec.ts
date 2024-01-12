import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselArtworkComponent } from './artwork-carousel.component';

describe('ArtworkCarouselComponent', () => {
  let component: CarouselArtworkComponent;
  let fixture: ComponentFixture<CarouselArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselArtworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
