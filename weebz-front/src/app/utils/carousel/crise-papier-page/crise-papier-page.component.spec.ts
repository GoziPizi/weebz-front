import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisePapierPageComponent } from './crise-papier-page.component';

describe('CrisePapierPageComponent', () => {
  let component: CrisePapierPageComponent;
  let fixture: ComponentFixture<CrisePapierPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrisePapierPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrisePapierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
