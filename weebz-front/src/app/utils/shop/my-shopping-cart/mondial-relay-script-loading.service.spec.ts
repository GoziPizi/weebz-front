import { TestBed } from '@angular/core/testing';

import { MondialRelayScriptLoadingService } from './mondial-relay-script-loading.service';

describe('MondialRelayScriptLoadingService', () => {
  let service: MondialRelayScriptLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MondialRelayScriptLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
