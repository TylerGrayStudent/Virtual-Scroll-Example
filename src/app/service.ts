import { Injectable } from '@angular/core';
import { DATA } from './data';
import { Person } from './model';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private _data: Person[] = DATA;
  getCount(): number {
    return this._data.length;
  }

  getData(take: number, skip: number): Person[] {
    return this._data.slice(skip, skip + take);
  }
}
