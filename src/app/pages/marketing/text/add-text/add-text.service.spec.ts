import { TestBed } from '@angular/core/testing';

import { AddTextService } from './add-text.service';

describe('AddTextService', () => {
  let service: AddTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
