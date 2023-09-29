import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaAccueilComponent } from './manga-accueil.component';

describe('MangaAccueilComponent', () => {
  let component: MangaAccueilComponent;
  let fixture: ComponentFixture<MangaAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
