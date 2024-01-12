import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterThumbnailComponent } from './chapter-thumbnail.component';

describe('ChapterThumbnailComponent', () => {
  let component: ChapterThumbnailComponent;
  let fixture: ComponentFixture<ChapterThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
