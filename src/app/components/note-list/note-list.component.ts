import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/core/notes';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.less']
})
export class NoteListComponent {
  @Input() public notes: Note[] = [];
  @Input() public editNote: () => void;
  @Input() public deleteNote: () => void;
}
