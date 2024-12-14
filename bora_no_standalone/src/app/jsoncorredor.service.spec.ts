import { TestBed } from '@angular/core/testing';
import { JsoncorredorService } from './services/jsoncorredor.service';

describe('JsoncorredorService', () => {
  let service: JsoncorredorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsoncorredorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
