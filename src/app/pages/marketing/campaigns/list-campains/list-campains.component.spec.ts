import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCampainsComponent } from './list-campains.component';

describe('ListCampainsComponent', () => {
  let component: ListCampainsComponent;
  let fixture: ComponentFixture<ListCampainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCampainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCampainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
