import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProduitSimilarProductComponent } from './page-produit-similar-product.component';

describe('PageProduitSimilarProductComponent', () => {
  let component: PageProduitSimilarProductComponent;
  let fixture: ComponentFixture<PageProduitSimilarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProduitSimilarProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProduitSimilarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
