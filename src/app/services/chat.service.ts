import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }
    private apiUrl = 'http://localhost:8000/chatbotApi'; 

	   sendInformation(filtre) {
        	let body = JSON.stringify(filtre);
        	let toto = this.http.post(this.apiUrl, body, httpOptions);
					return toto;
					
		}
}