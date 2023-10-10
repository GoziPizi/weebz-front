import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueRowComponent } from './catalogue-row.component';

describe('CatalogueRowComponent', () => {
  let component: CatalogueRowComponent;
  let fixture: ComponentFixture<CatalogueRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
