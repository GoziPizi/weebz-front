import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorThumbnailComponent } from './author-thumbnail.component';

describe('AuthorThumbnailComponent', () => {
  let component: AuthorThumbnailComponent;
  let fixture: ComponentFixture<AuthorThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
