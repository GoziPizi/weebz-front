import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalLiseuseComponent } from './horizontal-liseuse.component';

describe('HorizontalLiseuseComponent', () => {
  let component: HorizontalLiseuseComponent;
  let fixture: ComponentFixture<HorizontalLiseuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalLiseuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalLiseuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
