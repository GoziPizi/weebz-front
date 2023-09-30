import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaViewComponent } from './manga-view.component';

describe('MangaViewComponent', () => {
  let component: MangaViewComponent;
  let fixture: ComponentFixture<MangaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
