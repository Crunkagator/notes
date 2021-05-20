import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './notes';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {
  constructor(private _http: HttpClient) {}

  public sendNotes(notes: Array<Note>) {
    return this._http.post('/api/savenotes', notes);
  }

  public sendTagPool(tags: Array<string>) {
    return this._http.post('/api/savetagpool', tags);
  }

  public getNotes() {
    return this._http.get('/api/getnotes');
  }

  public getTagPool() {
    return this._http.get('/api/gettags');
  }
}
