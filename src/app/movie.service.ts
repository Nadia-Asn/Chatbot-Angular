import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:8000/get-movie-details'; 

	/*addHero (hero: String): Observable<String> {
	  return this.http.post<String>(this.heroesUrl, hero, null)
	    .pipe(
	      
	    );
	}*/

	   fetchMovie(movie) {
        	let body = JSON.stringify(movie);
        	let res = this.http.post(this.apiUrl, body, httpOptions);
        	console.log(res);
        	return res;
    }

}