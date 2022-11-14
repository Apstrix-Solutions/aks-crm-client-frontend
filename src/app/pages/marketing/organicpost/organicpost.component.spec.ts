import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicpostComponent } from './organicpost.component';

describe('OrganicpostComponent', () => {
  let component: OrganicpostComponent;
  let fixture: ComponentFixture<OrganicpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganicpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
