import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExpressService } from '../core/express.service';
import { Note } from '../core/notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit, OnDestroy {
  public noteInput: FormControl;
  public tagInput: FormControl;
  public filterInput: FormControl;
  public symbolsLeft = 1000;
  public tags: Array<string> = [];
  public tagsPool: Array<string> = [];
  public notes: Array<Note> = [];
  public sortedNotes: Array<Note> = [];
  public err: HTMLElement;
  public editMode: boolean;
  public noteIndex: number;
  public unSub$$ = new Subject<any>();

  constructor(private _exp: ExpressService) { }

  ngOnInit() {
    this.editMode = false;
    this.noteInput = new FormControl('', [
      Validators.required,
      Validators.maxLength(1000)
    ]);
    this.tagInput = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.filterInput = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    const HL = document.getElementById('highlights');
    this.err = document.getElementById('errorOutput');
    this.noteInput.valueChanges
      .pipe(takeUntil(this.unSub$$))
      .subscribe(text => {
        this.symbolsLeft = 1000 - text.length;
        const markedText = text
          .replace(/\n$/g, '\n\n')
          .replace(/\#[a-z0-9\'\-]+\b/gi, `<span class='marked'>$&</span>`);
        HL.innerHTML = markedText;
        this.err.innerText = '';
      });
    this.filterInput.valueChanges
      .pipe(takeUntil(this.unSub$$))
      .subscribe(data => {
        if (this.filterInput.status === 'VALID') {
          const match = RegExp('(#|)' + data + '[a-z0-9\'-]*', 'gi');
          this.sortedNotes = this.notes.filter(note => {
            let check = false;
            for (let i = 0; i < note.tags.length; i++) {
              if (note.tags[i].match(match)) {
                check = true;
                break;
              }
            }
            if (check === true) {
              return note;
            }
          });
        }
        this.err.innerText = '';
      });
    this.tagInput.valueChanges
      .pipe(takeUntil(this.unSub$$))
      .subscribe(() => (this.err.innerText = ''));
    this._exp
      .getNotes()
      .pipe(takeUntil(this.unSub$$))
      .subscribe((res: Note[]) => (this.notes = res));
    this._exp
      .getTagPool()
      .pipe(takeUntil(this.unSub$$))
      .subscribe((tagz: string[]) => (this.tagsPool = tagz));
  }

  ngOnDestroy() {
    this.unSub$$.next();
    this.unSub$$.complete();
  }

  createNote = () => {
    if (this.noteInput.invalid) {
      this.err.innerText = 'Note cannot be empty and longer than 1000 symbols';
      return;
    }
    const additionalTags = this.noteInput.value.match(/\#[a-z0-9\'\-]+\b/gi);
    const tags = this.tags
      .concat(additionalTags)
      .filter(tag => tag !== null)
      .filter(tag => tag.length < 22)
      .filter((tag, i, arr) => arr.indexOf(tag) === i);
    const note = new Note(this.noteInput.value, tags);
    this.tagsPool = this.tagsPool
      .concat(tags)
      .filter((tag, i, arr) => arr.indexOf(tag) === i);
    this.tags = [];
    this.noteInput.reset('');
    this.tagInput.reset('');
    return note;
  }

  setStotage = () => {
    this._exp
      .sendNotes(this.notes)
      .pipe(takeUntil(this.unSub$$))
      .subscribe();
    this._exp
      .sendTagPool(this.tagsPool)
      .pipe(takeUntil(this.unSub$$))
      .subscribe();
  }

  addNote = () => {
    const note = this.createNote();
    this.notes.push(note);
    this.err.innerText = '';
    this.setStotage();
  }

  editNote = (note: Note) => {
    this.editMode = true;
    this.noteInput.setValue(note.text);
    this.tags = note.tags;
    this.noteIndex = this.notes.indexOf(note);
  }

  saveNote = () => {
    const editedNote = this.createNote();
    this.notes.splice(this.noteIndex, 1, editedNote);
    this.editMode = false;
    this.filterInput.reset('');
    this.setStotage();
  }

  deleteNote = (note: Note) => {
    this.notes = this.notes.filter(n => n !== note);
    this.sortedNotes = this.sortedNotes.filter(n => n !== note);
    this.setStotage();
  }

  deleteTag = (tag: string) => {
    this.tags = this.tags.filter(t => t !== tag);
    this.setStotage();
  }

  deleteTagFromPool = () => {
    this.tagsPool = this.tagsPool.filter(
      t =>
        t !==
        document.getElementsByTagName('select').namedItem('tagSelector').value
    );
    this._exp
      .sendTagPool(this.tagsPool)
      .pipe(takeUntil(this.unSub$$))
      .subscribe();
  }

  addTag = () => {
    if (this.tagInput.invalid) {
      this.err.innerText =
        'Invalid tag! Must be non-empty and less than 20 symbols';
      return;
    }
    const newTag =
      this.tagInput.value[0] === '#'
        ? this.tagInput.value
        : '#' + this.tagInput.value;
    const checkNew = this.tagsPool.every(tag => tag !== newTag);
    if (checkNew !== false) {
      this.tagsPool.push(newTag);
      this.tags.push(newTag);
    } else {
      this.err.innerText = 'This tag already exists';
    }
    this.tagInput.reset('');
  }

  chooseTag = () => {
    const tagSelect = document
      .getElementsByTagName('select')
      .namedItem('tagSelector').value;
    const checkNew = this.tags.every(tag => tag !== tagSelect);
    if (checkNew !== false) {
      this.tags.push(tagSelect);
    } else {
      this.err.innerText = 'This tag is already part of your note';
    }
  }
}
