import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../notes/notes';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {
  constructor(private _http: HttpClient) {}

  public sendNotes(notes: Array<Note>) {
    return this._http.post('http://localhost:3000/api/savenotes', notes);
  }

  public sendTagPool(tags: Array<string>) {
    return this._http.post('http://localhost:3000/api/savetagpool', tags);
  }

  public getNotes() {
    return this._http.get('http://localhost:3000/api/getnotes');
  }

  public getTagPool() {
    return this._http.get('http://localhost:3000/api/gettags');
  }
}
