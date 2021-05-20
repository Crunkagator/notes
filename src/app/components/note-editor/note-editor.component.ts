import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.less']
})
export class NoteEditorComponent {
  @Input() public symbolsLeft = 1000;
  @Input() public tags: string[] = [];
  @Input() public tagsPool: string[] = [];
  @Input() public editMode = false;
  @Input() public tagInput: FormControl;
  @Input() public noteInput: FormControl;
  @Input() public addNote: () => void;
  @Input() public saveNote: () => void;
  @Input() public addTag: () => void;
  @Input() public chooseTag: () => void;
  @Input() public deleteTag: () => void;
  @Input() public deleteTagFromPool: () => void;
}
