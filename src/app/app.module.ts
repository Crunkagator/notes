import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { ExpressService } from './express/express.service';

@NgModule({
  declarations: [AppComponent, NotesComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule, HttpClientModule],
  providers: [ExpressService],
  bootstrap: [AppComponent]
})
export class AppModule {}
