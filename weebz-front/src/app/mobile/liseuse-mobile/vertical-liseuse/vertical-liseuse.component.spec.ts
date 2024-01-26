import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalLiseuseComponent } from './vertical-liseuse.component';

describe('VerticalLiseuseComponent', () => {
  let component: VerticalLiseuseComponent;
  let fixture: ComponentFixture<VerticalLiseuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalLiseuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalLiseuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
