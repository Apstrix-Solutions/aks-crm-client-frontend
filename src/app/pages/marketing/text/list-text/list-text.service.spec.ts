import { TestBed } from '@angular/core/testing';

import { ListTextService } from './list-text.service';

describe('ListTextService', () => {
  let service: ListTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
