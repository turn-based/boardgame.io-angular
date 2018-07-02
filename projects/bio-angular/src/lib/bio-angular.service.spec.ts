import { TestBed, inject } from '@angular/core/testing';

import { BioAngularService } from './bio-angular.service';

describe('BioAngularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BioAngularService]
    });
  });

  it('should be created', inject([BioAngularService], (service: BioAngularService) => {
    expect(service).toBeTruthy();
  }));
});
