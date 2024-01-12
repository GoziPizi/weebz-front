import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedDropdownComponent } from './connected-dropdown.component';

describe('ConnectedDropdownComponent', () => {
  let component: ConnectedDropdownComponent;
  let fixture: ComponentFixture<ConnectedDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
