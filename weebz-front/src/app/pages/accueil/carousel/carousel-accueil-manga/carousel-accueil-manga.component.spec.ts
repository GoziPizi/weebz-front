import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAccueilMangaComponent } from './carousel-accueil-manga.component';

describe('CarouselAccueilMangaComponent', () => {
  let component: CarouselAccueilMangaComponent;
  let fixture: ComponentFixture<CarouselAccueilMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAccueilMangaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAccueilMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
