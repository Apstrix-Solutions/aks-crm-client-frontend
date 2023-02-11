import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFbCampaignComponent } from './set-fb-campaign.component';

describe('SetFbCampaignComponent', () => {
  let component: SetFbCampaignComponent;
  let fixture: ComponentFixture<SetFbCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetFbCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFbCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
