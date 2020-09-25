import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  // set a key/value pair
  async set(key: string, value) {
    return await this.storage.set(key, value);
  }

  // retrieve a value
  async get(key: string) {
    return await this.storage.get(key);
  }

  // delete a key's value
  async remove(key: string) {
    return await this.storage.remove(key);
  }

  // delete all local storage data
  clear() {
    this.storage.clear().then(() => {
      console.log('local storage cleared');
    });
  }

}
