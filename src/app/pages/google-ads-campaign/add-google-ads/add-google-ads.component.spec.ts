import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoogleAdsComponent } from './add-google-ads.component';

describe('AddGoogleAdsComponent', () => {
  let component: AddGoogleAdsComponent;
  let fixture: ComponentFixture<AddGoogleAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoogleAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoogleAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
