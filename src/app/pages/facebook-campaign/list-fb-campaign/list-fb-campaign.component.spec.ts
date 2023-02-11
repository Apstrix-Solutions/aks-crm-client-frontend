import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFbCampaignComponent } from './list-fb-campaign.component';

describe('ListFbCampaignComponent', () => {
  let component: ListFbCampaignComponent;
  let fixture: ComponentFixture<ListFbCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFbCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFbCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
