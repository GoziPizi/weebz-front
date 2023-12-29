import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistToastComponent } from './watchlist-toast.component';

describe('WatchlistToastComponent', () => {
  let component: WatchlistToastComponent;
  let fixture: ComponentFixture<WatchlistToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
