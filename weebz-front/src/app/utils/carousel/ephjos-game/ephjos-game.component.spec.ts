import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EphjosGameComponent } from './ephjos-game.component';

describe('EphjosGameComponent', () => {
  let component: EphjosGameComponent;
  let fixture: ComponentFixture<EphjosGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EphjosGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EphjosGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
