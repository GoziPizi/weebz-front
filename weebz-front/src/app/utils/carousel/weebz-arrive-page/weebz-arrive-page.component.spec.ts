import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeebzArrivePageComponent } from './weebz-arrive-page.component';

describe('WeebzArrivePageComponent', () => {
  let component: WeebzArrivePageComponent;
  let fixture: ComponentFixture<WeebzArrivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeebzArrivePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeebzArrivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
