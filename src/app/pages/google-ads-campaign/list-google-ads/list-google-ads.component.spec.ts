import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoogleAdsComponent } from './list-google-ads.component';

describe('ListGoogleAdsComponent', () => {
  let component: ListGoogleAdsComponent;
  let fixture: ComponentFixture<ListGoogleAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGoogleAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGoogleAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
