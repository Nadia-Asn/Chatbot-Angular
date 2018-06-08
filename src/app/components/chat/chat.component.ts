import { Component } from '@angular/core';

import { client } from './../../dialog-flow-client/dialog-flow.client';
import { IMessage } from './../../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MovieService } from './../../movie.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {

  private heroesUrl = 'api/heroes'; 

    constructor(private movieService: MovieService){
  }

  conversation: IMessage[] = [];

  addMessageFromUser(message) {
  console.log("ttotooto");
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });

    client.textRequest(message.value).then((response) => {
      console.log(response);

      let x = this.movieService.fetchMovie(response).subscribe(
       data => {
        console.log("success");
        if(response.result.fulfillment.speech != "") {
            this.conversation.push({
            avatar: 'android',
            from: 'Bot',
            content: response.result.fulfillment.speech || "I can\'t seem to figure that out!"
          });

        }if (response.result.fulfillment.speech == ""){
            this.conversation.push({
            avatar: 'android',
            from: 'Bot',
            content: data.speech || "I can\'t seem to figure that out!"
        });
          }

    
          
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
