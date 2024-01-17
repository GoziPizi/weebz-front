import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InkCollabPageComponent } from './ink-collab-page.component';

describe('InkCollabPageComponent', () => {
  let component: InkCollabPageComponent;
  let fixture: ComponentFixture<InkCollabPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InkCollabPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InkCollabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
