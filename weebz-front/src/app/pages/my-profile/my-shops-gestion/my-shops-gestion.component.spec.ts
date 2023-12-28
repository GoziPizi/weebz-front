import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopsGestionComponent } from './my-shops-gestion.component';

describe('MyShopsGestionComponent', () => {
  let component: MyShopsGestionComponent;
  let fixture: ComponentFixture<MyShopsGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopsGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyShopsGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
