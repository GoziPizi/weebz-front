import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorShopsComponent } from './author-shops.component';

describe('AuthorShopsComponent', () => {
  let component: AuthorShopsComponent;
  let fixture: ComponentFixture<AuthorShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorShopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
