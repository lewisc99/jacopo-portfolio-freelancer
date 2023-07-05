import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUpdateComponent } from './blog-update.component';

describe('BlogUpdateComponent', () => {
  let component: BlogUpdateComponent;
  let fixture: ComponentFixture<BlogUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogUpdateComponent]
    });
    fixture = TestBed.createComponent(BlogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
