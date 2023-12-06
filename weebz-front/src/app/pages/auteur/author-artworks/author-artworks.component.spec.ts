import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorArtworksComponent } from './author-artworks.component';

describe('AuthorArtworksComponent', () => {
  let component: AuthorArtworksComponent;
  let fixture: ComponentFixture<AuthorArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorArtworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
