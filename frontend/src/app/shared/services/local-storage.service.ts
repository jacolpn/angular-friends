import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    set(key: string, value: any) {
        if (this.storage) {
            return this.storage.setItem(key, JSON.stringify(value));
        }
    }

    get(key: string) {
        if (this.storage) {
            return JSON.parse(this.storage.getItem(key));
        }
    }

    remove(key: string) {
        if (this.storage) {
            return this.storage.removeItem(key);
        }
    }

    clear() {
        if (this.storage) {
            return this.storage.clear();
        }
    }
}
