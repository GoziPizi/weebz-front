import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDoubleLiseuseComponent } from './manga-double-liseuse.component';

describe('MangaDoubleLiseuseComponent', () => {
  let component: MangaDoubleLiseuseComponent;
  let fixture: ComponentFixture<MangaDoubleLiseuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaDoubleLiseuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaDoubleLiseuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
