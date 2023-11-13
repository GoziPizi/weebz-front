import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilWeebzNewsComponent } from './accueil-weebz-news.component';

describe('AccueilWeebzNewsComponent', () => {
  let component: AccueilWeebzNewsComponent;
  let fixture: ComponentFixture<AccueilWeebzNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilWeebzNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilWeebzNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
