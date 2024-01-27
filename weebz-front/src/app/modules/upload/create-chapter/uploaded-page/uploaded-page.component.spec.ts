import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPageComponent } from './uploaded-page.component';

describe('UploadedPageComponent', () => {
  let component: UploadedPageComponent;
  let fixture: ComponentFixture<UploadedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
