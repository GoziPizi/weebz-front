import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterRowThumbnailComponent } from './chapter-row-thumbnail.component';

describe('ChapterRowThumbnailComponent', () => {
  let component: ChapterRowThumbnailComponent;
  let fixture: ComponentFixture<ChapterRowThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterRowThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterRowThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
