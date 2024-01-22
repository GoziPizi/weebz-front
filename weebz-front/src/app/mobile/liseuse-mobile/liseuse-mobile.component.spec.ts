import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiseuseMobileComponent } from './liseuse-mobile.component';

describe('LiseuseMobileComponent', () => {
  let component: LiseuseMobileComponent;
  let fixture: ComponentFixture<LiseuseMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiseuseMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiseuseMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
