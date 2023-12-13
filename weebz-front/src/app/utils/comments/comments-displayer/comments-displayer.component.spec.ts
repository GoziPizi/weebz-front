import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDisplayerComponent } from './comments-displayer.component';

describe('CommentsDisplayerComponent', () => {
  let component: CommentsDisplayerComponent;
  let fixture: ComponentFixture<CommentsDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
