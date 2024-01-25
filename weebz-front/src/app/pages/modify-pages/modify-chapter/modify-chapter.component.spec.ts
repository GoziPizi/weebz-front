import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyChapterComponent } from './modify-chapter.component';

describe('ModifyChapterComponent', () => {
  let component: ModifyChapterComponent;
  let fixture: ComponentFixture<ModifyChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyChapterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
