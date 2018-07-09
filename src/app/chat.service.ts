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
        	let boody = JSON.stringify(filtre);
        	let res = this.http.post(this.apiUrl, boody, httpOptions);
        	console.log(boody);
        	return res;
    }


    toto(obj: Object){
    	console.log("khklhlkhkl")
    }



       sendInfo(filtre): Observable {
       	console.log("liuiuoiuiouoiu");
       	let objeect = JSON.stringify(filtre);
			  return this.http.post(this.apiUrl, objeect, httpOptions)
			    .pipe(
			      catchError(this.handleError('erorororororo', objeect))
			    );
	}

}