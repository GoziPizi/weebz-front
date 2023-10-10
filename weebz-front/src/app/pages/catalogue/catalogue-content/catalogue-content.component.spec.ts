import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueContentComponent } from './catalogue-content.component';

describe('CatalogueContentComponent', () => {
  let component: CatalogueContentComponent;
  let fixture: ComponentFixture<CatalogueContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
