import { TestBed } from '@angular/core/testing';

import { ListCampainsService } from './list-campains.service';

describe('ListCampainsService', () => {
  let service: ListCampainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCampainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
