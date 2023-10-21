import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkThumbnailComponent } from './artwork-thumbnail.component';

describe('ArtworkThumbnailComponent', () => {
  let component: ArtworkThumbnailComponent;
  let fixture: ComponentFixture<ArtworkThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtworkThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
