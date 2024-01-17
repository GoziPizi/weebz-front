import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PslpPageComponent } from './pslp-page.component';

describe('PslpPageComponent', () => {
  let component: PslpPageComponent;
  let fixture: ComponentFixture<PslpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PslpPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PslpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
