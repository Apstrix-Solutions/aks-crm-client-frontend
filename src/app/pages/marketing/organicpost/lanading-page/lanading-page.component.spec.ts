import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanadingPageComponent } from './lanading-page.component';

describe('LanadingPageComponent', () => {
  let component: LanadingPageComponent;
  let fixture: ComponentFixture<LanadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanadingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
