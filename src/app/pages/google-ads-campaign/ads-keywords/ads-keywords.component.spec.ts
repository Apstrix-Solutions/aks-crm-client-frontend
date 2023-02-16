import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsKeywordsComponent } from './ads-keywords.component';

describe('AdsKeywordsComponent', () => {
  let component: AdsKeywordsComponent;
  let fixture: ComponentFixture<AdsKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsKeywordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
