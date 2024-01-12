import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableOnMobileComponent } from './unavailable-on-mobile.component';

describe('UnavailableOnMobileComponent', () => {
  let component: UnavailableOnMobileComponent;
  let fixture: ComponentFixture<UnavailableOnMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnavailableOnMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnavailableOnMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
