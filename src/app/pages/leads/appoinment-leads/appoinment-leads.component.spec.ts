import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentLeadsComponent } from './appoinment-leads.component';

describe('AppoinmentLeadsComponent', () => {
  let component: AppoinmentLeadsComponent;
  let fixture: ComponentFixture<AppoinmentLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
