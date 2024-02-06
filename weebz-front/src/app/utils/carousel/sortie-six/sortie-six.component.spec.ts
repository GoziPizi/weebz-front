import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieSixComponent } from './sortie-six.component';

describe('SortieSixComponent', () => {
  let component: SortieSixComponent;
  let fixture: ComponentFixture<SortieSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortieSixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortieSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
