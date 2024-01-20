import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersGestionComponent } from './my-orders-gestion.component';

describe('MyOrdersGestionComponent', () => {
  let component: MyOrdersGestionComponent;
  let fixture: ComponentFixture<MyOrdersGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyOrdersGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
