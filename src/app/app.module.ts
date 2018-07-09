import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';
import { MovieService } from './movie.service';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ChatComponent } from './components/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
      ],
  providers: [ChatService,MovieService],
  bootstrap: [AppComponent],
  entryComponents: [ ChatComponent ]
})
export class AppModule { }
