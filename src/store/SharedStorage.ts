'use strict';

const KEYS: any = Object.freeze({
  NAVIGATION_ENABLE: 'navigationEnable',
});

export default class SharedStorage {
  static keys = KEYS;

  static store = {
    [KEYS.NAVIGATION_ENABLE]: false,
  };

  static save(key: any, data: any) {
    this.store[key] = data;
  }

  static get navigationEnable() {
    return this.store[this.keys.NAVIGATION_ENABLE];
  }

  static setNavigationEnable(data: any) {
    this.save(this.keys.NAVIGATION_ENABLE, data);
  }

  static get userData() {
    return this.store[this.keys.USER_DATA];
  }
}
