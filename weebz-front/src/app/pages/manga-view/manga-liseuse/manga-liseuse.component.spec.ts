import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaLiseuseComponent } from './manga-liseuse.component';

describe('MangaLiseuseComponent', () => {
  let component: MangaLiseuseComponent;
  let fixture: ComponentFixture<MangaLiseuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaLiseuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaLiseuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
