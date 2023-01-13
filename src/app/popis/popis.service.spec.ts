/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PopisService } from './popis.service';

describe('Service: Popis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopisService],
    });
  });

  it('should ...', inject([PopisService], (service: PopisService) => {
    expect(service).toBeTruthy();
  }));
});
