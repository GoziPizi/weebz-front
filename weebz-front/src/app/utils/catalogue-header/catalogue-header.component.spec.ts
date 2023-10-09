import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueHeaderComponent } from './catalogue-header.component';

describe('CatalogueHeaderComponent', () => {
  let component: CatalogueHeaderComponent;
  let fixture: ComponentFixture<CatalogueHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
