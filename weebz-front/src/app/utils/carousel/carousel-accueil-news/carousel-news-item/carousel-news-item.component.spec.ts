import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselNewsItemComponent } from './carousel-news-item.component';

describe('CarouselNewsItemComponent', () => {
  let component: CarouselNewsItemComponent;
  let fixture: ComponentFixture<CarouselNewsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselNewsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselNewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
