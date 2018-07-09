import { Component } from '@angular/core';

import { client } from './../../dialog-flow-client/dialog-flow.client';
import { IMessage } from './../../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ChatService } from './../../services/chat.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {

  private heroesUrl = 'api/heroes'; 
  private lastResponseChatbot = "Super, appuyez sur li lien ci-dessous et vous aurez ce que vous chercher.";

    constructor(private chatService: ChatService){
  }

  conversation: IMessage[] = [];
  private info = [];

  addMessageFromUser(message) {
    // Vérifier le cas où l'utilisateur ne tape rien dans l'input mais qu'il click sur une suggestion

    console.log("+++++++++++++++++++++++++", message)

      this.conversation.push({
        avatar: 'perm_identity',
        from: 'Me',
        content: message,
        button: []
      });

    client.textRequest(message).then((response) => {
      console.log(response);

      let action = response.result.action

      let parameters = response.result.parameters;

      console.log("Parameters    => " ,parameters)

      var key = Object.keys(parameters)[0];
      var value = parameters[key]

      if(Object.keys(parameters)[0] != null) {
        //ajouter le filtre uniquement s'il n'existe pas déjà
        if (this.info.indexOf(value) == -1){
          this.info.push(parameters[key])
        }
        console.log(this.info)
      }

      // Appeler le service uniquement si nous avons obtenu la dernière réponse du chatbot après l'appel à dialogFlow
      // afficher l'url par la suite
      if (response.result.fulfillment.speech === this.lastResponseChatbot){
        this.chatService.sendInformation(this.info).subscribe(
          response => {
            console.log(response.url)
            this.conversation.push({
              avatar: 'android',
              from:'Bot',
              content: 'Voici ce que jai trouvé pour vous : ' + response.url,
              button: null
            })
          },
          error => {
              console.log("error")
          }
        )
      }

      // Si pas le msg de cloture de chatbot, juste l'afficher
      else{
        // Vérifier si le reponse du chatbot contients des suggestions à intégrer dans la réponse au user
        var suggestions= response.result.fulfillment.messages[0].suggestions

        if(suggestions != null && response.result.fulfillment.messages[0].type == "suggestion_chips"){
          console.log(suggestions)
          console.log(response.result.fulfillment.messages[0].type)

          var listSuggestion = []
          for(var i = 0 ; i<suggestions.length; i++){
            console.log("======" , suggestions[i].title)
            listSuggestion.push(suggestions[i].title)
          }
          console.log("BUTTONS EXISTS")
          this.conversation.push({
            avatar: 'android',
            from:'Bot',
            content: " Veuillez choisir ce qui vous convient ! ",
            button: listSuggestion
          })
        }else {
          this.conversation.push({
            avatar: 'android',
            from:'Bot',
            content: response.result.fulfillment.speech,
            button: null
          })
        }
      }
    });
  }
}
