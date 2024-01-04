import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPresentationComponent } from './author-presentation.component';

describe('AuthorPresentationComponent', () => {
  let component: AuthorPresentationComponent;
  let fixture: ComponentFixture<AuthorPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
