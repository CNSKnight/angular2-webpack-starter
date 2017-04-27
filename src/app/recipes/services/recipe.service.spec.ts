import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  tick
} from '@angular';
import { MockBackend } from '@angular/http/testing';
import { provide } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { SearchService } from './search.service';
export function main() {
  describe('Search Service', () => {
    beforeEachProviders(() => {
      return [BaseRequestOptions, MockBackend, SearchService,
        provide(Http, {
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }),
      ];
    });
  });
}
