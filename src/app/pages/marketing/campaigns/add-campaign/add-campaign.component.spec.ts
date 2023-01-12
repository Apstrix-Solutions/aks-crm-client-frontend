import { TestBed } from '@angular/core/testing';

import { AddCampainsService } from './add-campains.service';

describe('AddCampainsService', () => {
  let service: AddCampainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCampainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
