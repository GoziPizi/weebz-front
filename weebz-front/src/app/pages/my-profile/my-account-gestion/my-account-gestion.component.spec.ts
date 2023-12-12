import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountGestionComponent } from './my-account-gestion.component';

describe('MyAccountGestionComponent', () => {
  let component: MyAccountGestionComponent;
  let fixture: ComponentFixture<MyAccountGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
