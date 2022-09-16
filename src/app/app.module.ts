import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [BrowserModule, FormsModule, ScrollingModule, MatListModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
