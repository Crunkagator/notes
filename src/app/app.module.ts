import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { ExpressService } from './core/express.service';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [AppComponent, NotesComponent, HeaderComponent, NoteListComponent, NoteEditorComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ExpressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
