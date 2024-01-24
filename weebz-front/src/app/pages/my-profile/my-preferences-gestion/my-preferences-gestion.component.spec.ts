import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreferencesGestionComponent } from './my-preferences-gestion.component';

describe('MyPreferencesGestionComponent', () => {
  let component: MyPreferencesGestionComponent;
  let fixture: ComponentFixture<MyPreferencesGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPreferencesGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPreferencesGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
