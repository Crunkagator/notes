import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [AppComponent, NotesComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
