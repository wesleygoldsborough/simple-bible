// This service is used to maintain state of the application
// All updates to state happen here

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private storageService: StorageService
  ) { }

  public state = new BehaviorSubject({});

  // newData object completely replaces existing data object
  async replace(newData: any) {
    // broadcast new data value
    this.state.next(newData);
    // save to local storage
    return this.storageService.set('state', newData);
  }

  async clear() {
    // broadcast empty object
    this.state.next({});
    // clear local storage for the idetified key
    return this.storageService.remove('state');
  }

}
