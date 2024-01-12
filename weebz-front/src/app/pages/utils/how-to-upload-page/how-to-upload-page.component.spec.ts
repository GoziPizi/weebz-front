import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUploadPageComponent } from './how-to-upload-page.component';

describe('HowToUploadPageComponent', () => {
  let component: HowToUploadPageComponent;
  let fixture: ComponentFixture<HowToUploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToUploadPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
