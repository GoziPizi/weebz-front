import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsDisplayComponentComponent } from './socials-display-component.component';

describe('SocialsDisplayComponentComponent', () => {
  let component: SocialsDisplayComponentComponent;
  let fixture: ComponentFixture<SocialsDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialsDisplayComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialsDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
