import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Note } from './notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {
  private noteInput: FormControl;
  private tagInput: FormControl;
  private symbolsLeft = 1000;
  private tags: Array<string> = [];
  private tagsPool: Array<string> = ['#test1', '#test2', '#test3', '#test4'];
  private notes: Array<Note> = [];
  public err: HTMLElement;

  constructor() {}

  ngOnInit() {
    this.noteInput = new FormControl('', [
      Validators.required,
      Validators.maxLength(1000)
    ]);
    this.tagInput = new FormControl('', [
      Validators.required,
      Validators.maxLength(25)
    ]);
    const HL = document.getElementById('highlights');
    this.err = document.getElementById('errorOutput');
    this.noteInput.valueChanges.subscribe(text => {
      this.symbolsLeft = 1000 - text.length;
      const markedText = text
        .replace(/\n$/g, '\n\n')
        .replace(/\#[A-Z0-9]+?\b/gi, `<span class='marked'>$&</span>`);
      HL.innerHTML = markedText;
    });
  }

  addNote() {
    if (this.noteInput.status === 'INVALID') {
      this.err.innerText = 'Note cannot be empty and longer than 1000 symbols';
      return;
    }
    const additionalTags = this.noteInput.value.match(/\#[a-z0-9]+/gi);
    const tags = this.tags
      .concat(additionalTags)
      .filter((tag, i, arr) => arr.indexOf(tag) === i);
    const note = new Note(this.noteInput.value, tags);
    this.notes.push(note);
    this.tags = [];
    this.noteInput.reset('');
    this.tagInput.reset('');
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter(n => n !== note);
  }

  addTag() {
    if (this.tagInput.status === 'INVALID') {
      this.err.innerText =
        'Invalid tag! Must be non-empty and less than 25 symbols';
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

  chooseTag() {
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
