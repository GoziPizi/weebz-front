import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebtoonViewComponent } from './webtoon-view.component';

describe('WebtoonViewComponent', () => {
  let component: WebtoonViewComponent;
  let fixture: ComponentFixture<WebtoonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebtoonViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebtoonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
