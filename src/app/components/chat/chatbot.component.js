import { Component } from '@angular/core';

import { client } from './../../dialog-flow-client/dialog-flow.client';
import { IMessage } from './../../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MovieService } from './../../movie.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {

  private heroesUrl = 'api/heroes'; 

    constructor(private movieService: MovieService){
  }

  conversation: IMessage[] = [];

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });

    client.textRequest(message.value).then((response) => {
      console.log(response);

      let action = response.result.action
      console.log(action)
      let information = response.data.result.action
      console.log(information)
      let  = this.movieService.fetchMovie(response).subscribe(
       data => {
        console.log(data);
  
      message.value = '';
         return true;
       },
       error => {
         console.error("Error fetch for movie!");
         return Observable.throw(error);
       }
    );
    });
  }
}
