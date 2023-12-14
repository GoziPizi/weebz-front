import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextChaptersForViewComponent } from './next-chapters-for-view.component';

describe('NextChaptersForViewComponent', () => {
  let component: NextChaptersForViewComponent;
  let fixture: ComponentFixture<NextChaptersForViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextChaptersForViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextChaptersForViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
