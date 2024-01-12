import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkCarouselItemComponent } from './artwork-carousel-item.component';

describe('ArtworkCarouselItemComponent', () => {
  let component: ArtworkCarouselItemComponent;
  let fixture: ComponentFixture<ArtworkCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtworkCarouselItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
