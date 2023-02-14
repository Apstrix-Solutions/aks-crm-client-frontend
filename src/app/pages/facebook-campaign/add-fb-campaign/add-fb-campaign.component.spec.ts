import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFbCampaignComponent } from './add-fb-campaign.component';

describe('AddFbCampaignComponent', () => {
  let component: AddFbCampaignComponent;
  let fixture: ComponentFixture<AddFbCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFbCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFbCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
