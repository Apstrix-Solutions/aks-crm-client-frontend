import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitContactComponent } from './submit-contact.component';

describe('SubmitContactComponent', () => {
  let component: SubmitContactComponent;
  let fixture: ComponentFixture<SubmitContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
