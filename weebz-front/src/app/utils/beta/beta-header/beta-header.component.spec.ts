import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaHeaderComponent } from './beta-header.component';

describe('BetaHeaderComponent', () => {
  let component: BetaHeaderComponent;
  let fixture: ComponentFixture<BetaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetaHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
