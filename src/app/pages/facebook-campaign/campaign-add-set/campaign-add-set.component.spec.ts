import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAddSetComponent } from './campaign-add-set.component';

describe('CampaignAddSetComponent', () => {
  let component: CampaignAddSetComponent;
  let fixture: ComponentFixture<CampaignAddSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignAddSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAddSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
