import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteurIconComponent } from './auteur-icon.component';

describe('AuteurIconComponent', () => {
  let component: AuteurIconComponent;
  let fixture: ComponentFixture<AuteurIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuteurIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuteurIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
