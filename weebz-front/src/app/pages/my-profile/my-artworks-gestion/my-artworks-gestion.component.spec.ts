import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArtworksGestionComponent } from './my-artworks-gestion.component';

describe('MyArtworksGestionComponent', () => {
  let component: MyArtworksGestionComponent;
  let fixture: ComponentFixture<MyArtworksGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyArtworksGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyArtworksGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
